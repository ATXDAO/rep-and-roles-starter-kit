import { ElementClasses } from "../../types/Types";

export interface StringCardProps {
  props: StringProps;
}

export interface StringProps {
  value?: string;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export const StringCard = ({ props }: StringCardProps) => {
  const output = props?.isPrettyLoading ? (props?.value !== undefined ? props?.value : "Loading...") : props?.value;

  return (
    <div className={props?.classes?.container}>
      <p className={props?.classes?.value}>{output}</p>
    </div>
  );
};
