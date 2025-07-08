import whMainMap from './cr_combi_expanded_map.webp';
import whMainMapText from './wh_main_map_text.png';
import rawRegions from './regions.json';
import type { Region } from '../index'; // adjust path if needed

// ✅ Manually declare the shape of the regions JSON
const regions = rawRegions as unknown as Record<string, Region>;

const expanded = {
  key: 'expanded',
  name: 'Expanded Campaign',
  map: {
    image: whMainMap,
    imageText: whMainMapText,
    width: 6264,
    height: 4480,
  },
  img: whMainMap,
  game: 'WH3',
  regions,
};

export default expanded;
