import { TContainerAndValuePair } from "./BaseTokenCard";

type TBalanceCardProps = {
  value: bigint;
  propertyClasses?: TContainerAndValuePair;
  prettifyLoading?: boolean;
};

export const BalanceCard = ({ value, prettifyLoading, propertyClasses }: TBalanceCardProps) => {
  let output;

  prettifyLoading
    ? value !== undefined
      ? (output = Number(value))
      : (output = "Loading Balance...")
    : value !== undefined
    ? (output = Number(value))
    : (output = 0);

  return (
    <div className={propertyClasses?.container}>
      <p className={propertyClasses?.value}>{output}</p>
    </div>
  );
};
