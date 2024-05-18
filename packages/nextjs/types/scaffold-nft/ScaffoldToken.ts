export type ScaffoldToken = {
  address?: string;
  collectionName?: string;
  collectionSymbol?: string;
  id?: bigint;
  uri?: string;
  balanceOf?: bigint;
  metadata?: {
    name?: string;
    description?: string;
    image?: {
      value: string;
      alt: string;
    };
    attributes?: any[];
  };
};
