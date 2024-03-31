import { Color } from "./Stylized";

type StringProps = {
  value: string;
  color?: Color;
  type?: "description" | "title";
};

export const StylizedStringCard = ({ type = "description", color = "slate", value }: StringProps) => {
  let textClassName;
  if (type === "description") {
    textClassName = "text-1xl mx-auto text-center break-words text-black";
  } else {
    textClassName = "text-1xl text-center object-center mx-auto font-bold break-all text-black";
  }

  return (
    <div className={`rounded-lg bg-${color}-300`}>
      <p className={textClassName}>{value}</p>
    </div>
  );
};
