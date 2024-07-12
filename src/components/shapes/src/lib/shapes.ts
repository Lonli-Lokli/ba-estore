export type RetailerDm = {
  rate: string;
  maxAviosPerPound: number;
  logo: string;
  name: string;
  destinationUrl: string;
  isSpeedyAwarding: boolean;
  bonuses: BonusDm[];
  description: string;
};

export type BonusDm = {
  condition: string;
  value: string;
};
