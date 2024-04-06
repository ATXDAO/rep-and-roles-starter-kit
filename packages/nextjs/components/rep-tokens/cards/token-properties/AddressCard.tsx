import { StylizedAddressCard } from "../internal/StylizedAddressCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  address?: string;
  isGroup?: boolean;
};

export const AddressCard = ({ token, address = "", isGroup = false }: Props) => {
  return <StylizedAddressCard address={token ? token?.address : address} isGroup={isGroup} />;
};
