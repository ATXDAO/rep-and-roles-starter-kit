import { CardClasses } from "../../types/Types";

export interface StringCardProps {
  value?: string;
  classes?: CardClasses;
  isPrettyLoading?: boolean;
}

export interface StringCardPropsInternal {
  props: StringCardProps;
}

export const StringCard = ({ props }: StringCardPropsInternal) => {
  const output = props?.isPrettyLoading ? (props?.value !== undefined ? props?.value : "Loading...") : props?.value;

  return (
    <div className={props?.classes?.card}>
      <p className={props?.classes?.value}>{output}</p>
    </div>
  );
};
