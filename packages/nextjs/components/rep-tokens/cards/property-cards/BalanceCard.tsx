import { PropertyClasses } from "../types/Types";

type TBalanceCardProps = {
  value: bigint;
  propertyClasses?: PropertyClasses;
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
