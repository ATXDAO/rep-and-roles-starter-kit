import { CardClasses } from "../../types/Types";

export interface BigIntCardProps {
  value: bigint;
  classes?: CardClasses;
  isPrettyLoading?: boolean;
}

export interface BigIntCardPropsInternal {
  props: BigIntCardProps;
}

export const BalanceCard = ({ props }: BigIntCardPropsInternal) => {
  let output;

  props?.isPrettyLoading
    ? props?.value !== undefined
      ? (output = Number(props?.value))
      : (output = "Loading Balance...")
    : props?.value !== undefined
    ? (output = Number(props?.value))
    : (output = 0);

  return (
    <div className={props?.classes?.card}>
      <p className={props?.classes?.value}>{output}</p>
    </div>
  );
};
