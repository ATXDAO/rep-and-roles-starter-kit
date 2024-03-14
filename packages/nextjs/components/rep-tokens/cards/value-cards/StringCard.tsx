import { CardClasses, IsPrettyLoading } from "../../types/Types";

export interface StringCardProps {
  value?: string;
  classes?: CardClasses;
  isPrettyLoading?: IsPrettyLoading;
}

export interface StringCardPropsInternal {
  props: StringCardProps;
}

export const StringCard = ({ props }: StringCardPropsInternal) => {
  // const output = props?.isPrettyLoading ? (props?.value !== undefined ? props?.value : "Loading...") : props?.value;

  let finalizedOutput;

  props?.isPrettyLoading ? (
    props?.value !== undefined ? (
      (finalizedOutput = <p className={props?.classes?.value}>{props?.value}</p>)
    ) : (
      (finalizedOutput = <p className={props?.isPrettyLoading?.classes}> {props?.isPrettyLoading?.message}</p>)
    )
  ) : props?.value !== undefined ? (
    (finalizedOutput = <p className={props?.classes?.value}>{props?.value}</p>)
  ) : (
    <p className={props?.classes?.value}>0</p>
  );

  return <div className={props?.classes?.card}>{finalizedOutput}</div>;
};
