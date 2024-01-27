import { ElementClasses } from "../../types/Types";

export interface BigIntCardPropsInternal {
  props: BigIntCardProps;
}

export interface BigIntCardProps {
  value: bigint;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
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
    <div className={props?.classes?.container}>
      <p className={props?.classes?.value}>{output}</p>
    </div>
  );
};
