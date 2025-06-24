/*  src/data/campaigns/expanded/index.ts  */

import rawRegions from './regions.json';
import type { Campaign, Region } from '../index';

// ── map images ───────────────────────────────────────────────
import wh_main_map       from './wh_main_map.png';
import wh_main_map_text  from './wh_main_map_text.png';

/**
 * Make every region conform to the Region interface:
 *   if d is string[]  → join with spaces
 *   else keep as-is
 */
const regions: Record<string, Region> = Object.fromEntries(
  Object.entries(rawRegions as Record<string, any>).map(([key, value]) => {
    const flatD = Array.isArray(value.d) ? value.d.join(' ') : value.d;
    return [key, { ...value, d: flatD } as Region];
  })
);

const expanded: Campaign = {
  key: 'expanded',
  name: 'Immortal Empires EXPANDED',
  map: {
    image: wh_main_map,
    imageText: wh_main_map_text,
    width: 4000,
    height: 4000,
  },
  img:  { width: 4000, height: 4000 },
  game: { width: 4000, height: 4000 },
  regions,                         // ✅ now 100 % Region-typed
};

export default expanded;
