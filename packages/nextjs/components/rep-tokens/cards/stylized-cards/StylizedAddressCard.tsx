import { Color } from "./Stylized";
import { Address } from "~~/components/scaffold-eth";

type AddressCardProps = {
  address: string;
  color?: Color;
  textColor?: Color;
  isGroup?: boolean;
};

export const StylizedAddressCard = ({
  address,
  color = "slate",
  textColor = "black",
  isGroup = false,
}: AddressCardProps) => {
  return (
    <div className={`rounded-lg flex items-center justify-center bg-${color}-300 ${isGroup ? "mt-4" : ""}`}>
      <Address address={address} textColor={textColor} />
    </div>
  );
};
