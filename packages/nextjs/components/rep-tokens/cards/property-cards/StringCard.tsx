import { PropertyClasses } from "../types/Types";

type TStringCardProps = {
  value: string;
  propertyClasses?: PropertyClasses;
  prettifyLoading?: boolean;
};

export const StringCard = ({ value, prettifyLoading, propertyClasses }: TStringCardProps) => {
  let output;
  prettifyLoading ? (value !== undefined ? (output = value) : (output = "Loading...")) : (output = value);

  return (
    <div className={propertyClasses?.container}>
      <p className={propertyClasses?.value}>{output}</p>
    </div>
  );
};
