const files = import.meta.glob('./**/*.{json,png}', { eager: true });

const factionGroups: Record<string, any> = {};

for (const path in files) {
  // Skip .png files in this loop — we'll handle icons based on the .json path
  if (path.endsWith('.png')) continue;

  const splitResult = path.split('/');

  const mod = files[path] as { default: any };
  const meta = mod.default;

  if (!meta || !meta.key) {
    console.warn(`⚠️ Skipping invalid faction meta: ${path}`);
    continue;
  }

  const factionKey = meta.key;
  const factionName = meta.name;
  const factionColor = meta.color;

  // Group key (e.g., "./somegroup/faction/meta.json" → "somegroup")
  const [, groupKey] = splitResult;

  if (!factionGroups[groupKey]) {
    factionGroups[groupKey] = { factions: {} };
  }

  if (splitResult.length === 3) {
    factionGroups[groupKey].name = factionName;
    continue;
  }

  const iconPath = path.replace('meta.json', 'mon_24.png');
  const iconModule = files[iconPath] as { default: string } | undefined;

  if (!iconModule) {
    console.warn(`⚠️ Missing icon for faction "${factionKey}" at: ${iconPath}`);
  }

  if (!factionGroups[groupKey].factions[factionKey]) {
    factionGroups[groupKey].factions[factionKey] = {
      key: factionKey,
      name: factionName,
      icon: iconModule?.default ?? '', 
      group: groupKey,
      rank: 1,
    };
  }
}

export interface Faction {
  readonly key: string;
  readonly name: string;
  readonly icon: string;
  readonly color: string;
  readonly group: string;
  readonly rank: number;
}

export default factionGroups as {
  [groupKey: string]: {
    name?: string;
    factions: {
      [factionKey: string]: Faction;
    };
  };
};
