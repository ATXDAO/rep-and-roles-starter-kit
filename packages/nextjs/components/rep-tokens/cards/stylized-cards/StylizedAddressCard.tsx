import { Address } from "~~/components/scaffold-eth";

type AddressCardProps = {
  address: string;
  isGroup?: boolean;
};

export const StylizedAddressCard = ({ address, isGroup = false }: AddressCardProps) => {
  return (
    <div className={`rounded-lg flex items-center justify-center bg-base-300 ${isGroup ? "mt-4" : ""}`}>
      <Address address={address} />
    </div>
  );
};
