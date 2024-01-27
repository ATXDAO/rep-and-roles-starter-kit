import { ElementClasses } from "../../types/Types";

export interface StringCardProps {
  value?: string;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export const StringCard = ({ value, classes, isPrettyLoading }: StringCardProps) => {
  const output = isPrettyLoading ? (value !== undefined ? value : "Loading...") : value;

  return (
    <div className={classes?.container}>
      <p className={classes?.value}>{output}</p>
    </div>
  );
};
