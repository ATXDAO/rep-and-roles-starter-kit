import { Address } from "~~/components/scaffold-eth";

type AddressCardProps = {
  address: string;
};

export const StylizedAddressCard = ({ address }: AddressCardProps) => {
  return (
    <div className={`rounded-lg flex items-center justify-center bg-base-300`}>
      <Address address={address} />
    </div>
  );
};
