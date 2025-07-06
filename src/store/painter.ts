import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import assets from '../assets';
import { campaigns } from '../data/campaigns';
import type { Campaign, Region } from '../data/campaigns';
import type { Faction } from '../data/factions';
import factions from '../data/factions';
import presets from '../data/presets';

const DEFAULT_CAMPAIGN: Campaign = campaigns.expanded;
const DEFAULT_PRESETS = presets[DEFAULT_CAMPAIGN.key];
const DEFAULT_PRESET_EXPANDED = presets['expanded'];

const DEFAULT_MAP_STATE = Object.values(DEFAULT_CAMPAIGN.regions).reduce(
  (accumulator, region: Region) => {
    accumulator[region.key] = DEFAULT_PRESET_EXPANDED.ownership[region.key] ?? null;
    return accumulator;
  },
  {} as Record<string, string | null>
);

const DEFAULT_ALL_FACTION_COMBINED = Object.values(factions).reduce(
  (accumulator, group: any) => {
    Object.values(group.factions).forEach((faction: any) => {
      accumulator[faction.key] = faction;
    });
    return accumulator;
  },
  {} as Record<string, Faction>
);

// 🛠 Patch in any faction keys from ownership that are missing in the factions map
const knownFactions = new Set(Object.keys(DEFAULT_ALL_FACTION_COMBINED));
const allOwnershipFactionKeys = Object.values(DEFAULT_MAP_STATE).filter(Boolean) as string[];

for (const key of allOwnershipFactionKeys) {
  if (!knownFactions.has(key)) {
    DEFAULT_ALL_FACTION_COMBINED[key] = {
      key,
      name: key,
      icon: assets['icons/imported'],
      color: '#000',
      group: 'Imported',
      rank: 0,
    };
  }
}

const DEFAULT_FACTION_GROUPS = Object.values(factions).reduce(
  (accumulator, factionGroup: any) => {
    const factionGroupKeys = Object.keys(factionGroup.factions);
    accumulator[factionGroup.name] = factionGroupKeys;
    return accumulator;
  },
  {} as Record<string, string[]>
);

export const PainterMode = {
  Interactive: 'interactive',
  Painter: 'painter',
} as const;
export type PainterModeKey = typeof PainterMode[keyof typeof PainterMode];

const INITIAL_STATE = {
  campaign: DEFAULT_CAMPAIGN,
  factions: DEFAULT_ALL_FACTION_COMBINED,
  importedFactions: [] as string[],
  groups: DEFAULT_FACTION_GROUPS,
  ownership: DEFAULT_MAP_STATE,
  mode: PainterMode.Interactive as PainterModeKey,
  selectedRegion: null as string | null,
  selectedFaction: null as string | null,
  presets: DEFAULT_PRESETS,
  config: {
    flyToEnabled: false,
  },
};

const painterSlice = createSlice({
  name: 'painter',
  initialState: INITIAL_STATE,
  reducers: {
    mapChanged: (state, action: PayloadAction<string>) => {
      const mapKey = action.payload as keyof typeof campaigns;
      const campaign = campaigns[mapKey];
      const preset = presets[mapKey];
      const ownership = preset?.ownership ?? {};

      state.campaign = campaign;
      state.selectedRegion = null;
      state.selectedFaction = null;
      state.presets = preset;

      state.ownership = Object.values(campaign.regions as Record<string, Region>).reduce(
        (acc, region: Region) => {
          acc[region.key] = (ownership[region.key] ?? null) as string | null;
          return acc;
        },
        {} as Record<string, string | null>
      );
    },

    modeChanged: (state, action: PayloadAction<PainterModeKey>) => {
      state.mode = action.payload;
    },

    factionChanged: (state, action: PayloadAction<string | null>) => {
      state.selectedFaction = action.payload;
    },

    regionChanged: (state, action: PayloadAction<string | null>) => {
      state.selectedRegion = action.payload;
    },

    regionOwnerChanged: (state, action: PayloadAction<[string, string | null]>) => {
      const [regionKey, factionKey] = action.payload;
      state.ownership[regionKey] = factionKey;
    },

    updateConfiguration: (state, action: PayloadAction<Record<string, any>>) => {
      state.config = {
        ...state.config,
        ...action.payload,
      };
    },

    importMap: (state, action: PayloadAction<Record<string, string | null>>) => {
      Object.entries(action.payload).forEach(([regionKey, factionKey]) => {
        const isValidRegion = regionKey in state.ownership;
        const isNewFaction = factionKey && !(factionKey in state.factions);

        if (isValidRegion) {
          state.ownership[regionKey] = factionKey;

          if (isNewFaction) {
            const importedFaction: Faction = {
              key: factionKey,
              name: factionKey,
              icon: assets['icons/imported'],
              color: 'black',
              group: 'Imported',
              rank: 0,
            };
            state.importedFactions.push(factionKey);
            state.factions[factionKey] = importedFaction;
          }
        }
      });
    },
  },
});

export const {
  mapChanged,
  modeChanged,
  factionChanged,
  regionChanged,
  regionOwnerChanged,
  updateConfiguration,
  importMap,
} = painterSlice.actions;

export default painterSlice.reducer;
