import { ScaffoldToken } from "./ScaffoldToken";

export type ScaffoldCollection = {
  tokens?: ScaffoldToken[];
  address?: string;
  symbol?: string;
  name?: string;
  isLoading?: boolean;
};
