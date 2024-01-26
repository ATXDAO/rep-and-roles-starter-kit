import { TContainerAndValuePair } from "./TokenCard";

type TStringCardProps = {
  value: string;
  propertyClasses?: TContainerAndValuePair;
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
