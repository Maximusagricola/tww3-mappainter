import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import LayersIcon from '@mui/icons-material/Layers';

import { useAppDispatch, useAppSelector } from '../../../store';
import FactionAutocomplete from './FactionAutocomplete';
import { importMap } from '../../../store/painter';
import { overlayChanged } from '../../map/reducer';
import { usePainter } from './painter';

const ControlPane = () => {
  const painter = usePainter();
  const selectMode = painter.selectMode;
  const selectRegion = painter.selectRegion;
  const selectOwner = painter.selectOwner;
  const selectFaction = painter.selectFaction;

  const regions = painter.campaign.regions;
  const factions = painter.factions;

  const selectedRegion = painter.selectedRegion !== null ? regions[painter.selectedRegion] : null;
  const selectedFaction = selectedRegion?.key
    ? factions[painter.ownership[selectedRegion.key] ?? '']
    : null;
  const selectedPainterFaction = painter.selectedFaction
    ? factions[painter.selectedFaction]
    : null;

  return (
    <Box sx={{ height: '100%' }}>
      <Tabs
        variant="fullWidth"
        indicatorColor="primary"
        value={painter.mode}
        onChange={(e, mode) => selectMode(mode)}
      >
        <Tab label="Interactive mode" value="interactive" />
        <Tab label="Paint mode" value="painter" />
      </Tabs>

      <Box sx={{ height: 220 }}>
        {painter.mode === 'interactive' && (
          <Box sx={{ p: 2, '& .MuiTextField-root, & .MuiFormControl-root': { my: 1 } }}>
            <Autocomplete
              size="small"
              options={painter.options.regions}
              value={selectedRegion}
              onChange={(e, option) => selectRegion(option?.key ?? null)}
              groupBy={(option) => option.province.name}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selected region"
                  variant="outlined"
                  placeholder="Select a region to edit"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <FactionAutocomplete
              options={painter.options.factions}
              value={selectedFaction}
              disabled={!selectedRegion}
              showFactionIcon={!!selectedRegion}
              placeholder={selectedRegion ? 'Abandoned' : 'Select a region first'}
              onChange={(e, option) =>
                selectedRegion && selectOwner(selectedRegion.key, option?.key ?? null)
              }
            />
          </Box>
        )}
        {painter.mode === 'painter' && (
          <Box sx={{ p: 2, '& .MuiTextField-root, & .MuiFormControl-root': { my: 1 } }}>
            <FactionAutocomplete
              options={painter.options.factions}
              value={selectedPainterFaction}
              label="Selected faction"
              placeholder="Abandoned"
              helperText="No faction selected abandons region."
              onChange={(e, option) => selectFaction(option?.key ?? null)}
            />
          </Box>
        )}
      </Box>

      <Divider />
      <PainterSectionImportExport />
      <Divider />
      <PainterSectionPresets />
      <Divider />
      <PainterSectionOverlays />
    </Box>
  );
};

const PainterSectionImportExport = () => {
  const ownership = useAppSelector((state) => state.painter.ownership);
  const dispatch = useAppDispatch();

  const importJson = (json: any) => {
    dispatch(importMap(json));
  };

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton dense onClick={() => {
          const fileInput = document.createElement('input');
          fileInput.setAttribute('type', 'file');
          fileInput.setAttribute('accept', '.json');

          fileInput.onchange = (e) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const mapJson = JSON.parse((event.target as FileReader).result as string);
              importJson(mapJson);
            };
            reader.onerror = (err) => console.log(err);
            reader.readAsText((e.target as HTMLInputElement).files?.[0] as Blob);
          };

          fileInput.click();
        }}>
          <ListItemText primary="Import" secondary="Click here to import a map file" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton dense onClick={() => {
          const json = JSON.stringify(ownership, null, 2);
          const blob = new Blob([json], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'map.json';
          a.click();
        }}>
          <ListItemText primary="Export" secondary="Click here to export a map file" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

const PainterSectionPresets = () => {
  const presets = useAppSelector((state) => state.painter.presets);
  const dispatch = useAppDispatch();

  const selectPreset = (preset: any) => {
    dispatch(importMap(preset.ownership));
  };

  return (
    <List subheader={<ListSubheader disableSticky>Map presets</ListSubheader>}>
      {Object.entries(presets).map(([key, preset]: [string, any]) => (
        <ListItem key={key} disablePadding>
          <ListItemButton dense onClick={() => selectPreset(preset)}>
            <ListItemText primary={preset.label} secondary={preset.description} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const PainterSectionOverlays = () => {
  const overlays = useAppSelector((state) => state.map.overlays);
  const dispatch = useAppDispatch();

  const setOverlayVisible = (overlayKey: string, visible: boolean) => {
    dispatch(overlayChanged([overlayKey, visible]));
  };

  return (
    <List subheader={<ListSubheader disableSticky>Map layers</ListSubheader>}>
      {Object.values(overlays).map((overlay) => (
        <ListItem key={overlay.key} disablePadding
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary={overlay.label} />
          <Switch
            edge="end"
            color="primary"
            onChange={(e, checked) => setOverlayVisible(overlay.key, checked)}
            checked={overlay.visible}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ControlPane;
