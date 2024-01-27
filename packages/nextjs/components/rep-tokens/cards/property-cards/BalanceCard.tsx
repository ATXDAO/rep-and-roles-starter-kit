import { ElementClasses } from "../../types/Types";

export interface BalanceCardProps {
  props: BigIntProps;
}

export interface BigIntProps {
  value: bigint;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export const BalanceCard = ({ value, classes, isPrettyLoading }: BigIntProps) => {
  let output;

  isPrettyLoading
    ? value !== undefined
      ? (output = Number(value))
      : (output = "Loading Balance...")
    : value !== undefined
    ? (output = Number(value))
    : (output = 0);

  return (
    <div className={classes?.container}>
      <p className={classes?.value}>{output}</p>
    </div>
  );
};
