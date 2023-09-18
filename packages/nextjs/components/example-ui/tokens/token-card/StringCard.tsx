import { TContainerAndValuePair } from "./BaseTokenCard";

type TStringCardProps = {
  value: string;
  propertyClasses?: TContainerAndValuePair;
  prettifyLoading?: boolean;
};

export const StringCard = ({ value, prettifyLoading, propertyClasses }: TStringCardProps) => {
  let output;
  prettifyLoading ? (value !== undefined ? (output = value) : (output = "Loading...")) : (output = value);
  console.log("adding for sake");

  return (
    <div className={propertyClasses?.container}>
      <p className={propertyClasses?.value}>{output}</p>
    </div>
  );
};
