import { ElementClasses } from "../../types/Types";

export interface StringCardPropsInternal {
  props: StringCardProps;
}

export interface StringCardProps {
  value?: string;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export const StringCard = ({ props }: StringCardPropsInternal) => {
  const output = props?.isPrettyLoading ? (props?.value !== undefined ? props?.value : "Loading...") : props?.value;

  return (
    <div className={props?.classes?.container}>
      <p className={props?.classes?.value}>{output}</p>
    </div>
  );
};
