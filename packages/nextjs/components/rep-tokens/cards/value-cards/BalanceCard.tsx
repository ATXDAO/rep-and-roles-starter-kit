import { CardClasses, IsPrettyLoading } from "../../types/Types";

export interface BigIntCardProps {
  value: bigint;
  classes?: CardClasses;
  isPrettyLoading?: IsPrettyLoading;
  // isPrettyLoading?: boolean;
}

export interface BigIntCardPropsInternal {
  props: BigIntCardProps;
}

export const BalanceCard = ({ props }: BigIntCardPropsInternal) => {
  let finalizedOutput;

  props?.isPrettyLoading ? (
    props?.value !== undefined ? (
      (finalizedOutput = <p className={props?.classes?.value}>{Number(props?.value)}</p>)
    ) : (
      (finalizedOutput = <p className={props?.isPrettyLoading?.classes}> {props?.isPrettyLoading?.message}</p>)
    )
  ) : props?.value !== undefined ? (
    (finalizedOutput = <p className={props?.classes?.value}>{Number(props?.value)}</p>)
  ) : (
    <p className={props?.classes?.value}>0</p>
  );

  return <div className={props?.classes?.card}>{finalizedOutput}</div>;
};
