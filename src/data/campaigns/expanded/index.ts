import whMainMap from './wh_main_map.png';
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
    width: 3000,
    height: 2146,
  },
  img: whMainMap,
  game: 'WH3',
  regions,
};

export default expanded;
