import expanded from './expanded';

export interface Region {
  readonly key: string;
  readonly name: string;
  readonly fill: string;
  readonly d: string;
  readonly settlement: {
    readonly x: number;
    readonly y: number;
  };
  readonly province: any;
}

export interface Campaign {
  readonly key: string;
  readonly name: string;
  readonly map: {
    readonly image: string;
    readonly imageText: string;
    readonly width: number;
    readonly height: number;
  };
  readonly img: any;
  readonly game: any;
  readonly regions: Record<any, Region>;
}

export const campaigns = Object.freeze({
  expanded,
} satisfies Record<'expanded', Campaign>); // ✅ adjusted for shape

export type CampaignKey = keyof typeof campaigns;
export type CampaignLookup = Readonly<{ [key in CampaignKey]: Campaign }>;
