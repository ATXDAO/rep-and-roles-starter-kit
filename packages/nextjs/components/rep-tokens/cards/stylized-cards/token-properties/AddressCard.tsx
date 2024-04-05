import { StylizedAddressCard } from "../StylizedAddressCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
};

export const AddressCard = ({ token }: Props) => {
  return <StylizedAddressCard address={token?.address} />;
};
