import { ElementClasses } from "../../types/Types";

type TBalanceCardProps = {
  value: bigint;
  elementClasses?: ElementClasses;
  prettifyLoading?: boolean;
};

export const BalanceCard = ({ value, prettifyLoading, elementClasses }: TBalanceCardProps) => {
  let output;

  prettifyLoading
    ? value !== undefined
      ? (output = Number(value))
      : (output = "Loading Balance...")
    : value !== undefined
    ? (output = Number(value))
    : (output = 0);

  return (
    <div className={elementClasses?.container}>
      <p className={elementClasses?.value}>{output}</p>
    </div>
  );
};
