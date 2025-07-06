const files = import.meta.glob('./**/*.json', { eager: true });

const presets: Record<string, any> = {};

for (const path in files) {
  if (path.endsWith('map.json')) continue;

  const [, campaign] = path.split('/');

  const mod = files[path] as { default: any };
  const meta = mod.default;

  const mapJsonPath = path.replace('meta.json', 'map.json');
  const mapJsonMod = files[mapJsonPath] as { default: any };

  presets[campaign] = {
    ...meta,
    ownership: mapJsonMod?.default ?? {},
  };
}

export default presets as { [key: string]: any };
