import { TextField, InputAdornment, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import assets from '../../../assets';
import type { Faction } from '../../../data/factions';

const abandonedIcon = assets['icons/abandoned'];

type FactionAutocompleteProps = {
  options: Faction[];
  value: Faction | null;
  disabled?: boolean;
  showFactionIcon?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  onChange: (_event: React.ChangeEvent<{}>, value: Faction | null) => void;
};

const FactionAutocomplete = ({
  options = [],
  value = null,
  disabled = false,
  showFactionIcon = true,
  label,
  placeholder,
  helperText,
  onChange,
}: FactionAutocompleteProps) => {
  return (
    <Autocomplete
      size="small"
      options={options}
      value={value}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      onChange={onChange}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.name}
      disabled={disabled}
      renderOption={(props, option) => (
        <FactionAutocompleteItem option={option} {...props} />
      )}
      renderInput={(params) => (
        <FactionAutocompleteInput
          params={params}
          value={value}
          label={label}
          helperText={helperText}
          showFactionIcon={showFactionIcon}
          placeholder={placeholder}
        />
      )}
    />
  );
};

type FactionAutocompleteItemProps = {
  option: Faction;
};

const FactionAutocompleteItem = ({ option }: FactionAutocompleteItemProps) => {
  return (
    <>
      <img style={{ width: 24, height: 24, marginRight: 12 }} src={option.icon} alt="" />
      <Typography noWrap>{option.name}</Typography>
    </>
  );
};

type FactionAutocompleteInputProps = {
  params: any;
  value: Faction | null;
  label?: string;
  helperText?: string;
  placeholder?: string;
  showFactionIcon?: boolean;
};

const FactionAutocompleteInput = ({
  params,
  value,
  label,
  helperText,
  placeholder,
  showFactionIcon,
}: FactionAutocompleteInputProps) => {
  const icon = showFactionIcon ? value?.icon ?? abandonedIcon : null;

  const inputAdornment = icon && (
    <InputAdornment position="start">
      <img style={{ width: 24, height: 24 }} src={icon} alt="" />
    </InputAdornment>
  );

  return (
    <TextField
      {...params}
      label={label}
      helperText={helperText}
      variant="outlined"
      placeholder={placeholder}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        ...params.InputProps,
        startAdornment: inputAdornment,
      }}
    />
  );
};

export default FactionAutocomplete;
