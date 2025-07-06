const files = import.meta.glob('./**/*.{json,png}', { eager: true });

const factionGroups: Record<string, any> = {};

for (const path in files) {
  if (path.endsWith('.png')) continue;

  const splitResult = path.split('/');

  const meta = files[path] as any;

  if (splitResult.length === 3) {
    const [, groupKey] = splitResult;

    if (!factionGroups[groupKey]) {
      factionGroups[groupKey] = { factions: {} };
    }

    factionGroups[groupKey].name = meta['name'];
  } else {
    const [, groupKey] = splitResult;

    if (!factionGroups[groupKey]) {
      factionGroups[groupKey] = { factions: {} };
    }

    const factionKey = meta['key'];
    const factionName = meta['name'];
    const factionColor = meta['color'];

    const iconPath = path.replace('meta.json', 'mon_24.png');
    const iconModule = files[iconPath] as { default: string };

    if (!factionGroups[groupKey].factions[factionKey]) {
      factionGroups[groupKey].factions[factionKey] = {
        key: factionKey,
        name: factionName,
        icon: iconModule?.default ?? '',
        color: factionColor,
        group: groupKey,
        rank: 1,
      };
    }
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
