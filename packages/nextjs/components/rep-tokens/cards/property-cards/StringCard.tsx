import { ElementClasses } from "../../types/Types";

type TStringCardProps = {
  value: string;
  elementClasses?: ElementClasses;
  prettifyLoading?: boolean;
};

export const StringCard = ({ value, prettifyLoading, elementClasses }: TStringCardProps) => {
  const output = prettifyLoading ? (value !== undefined ? value : "Loading...") : value;

  return (
    <div className={elementClasses?.container}>
      <p className={elementClasses?.value}>{output}</p>
    </div>
  );
};
