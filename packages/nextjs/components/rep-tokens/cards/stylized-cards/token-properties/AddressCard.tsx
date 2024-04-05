import { StylizedAddressCard } from "../StylizedAddressCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  address?: string;
};

export const AddressCard = ({ token, address = "" }: Props) => {
  return <StylizedAddressCard address={token ? token?.address : address} />;
};
