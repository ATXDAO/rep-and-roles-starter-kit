import { Color } from "./Stylized";

type StringProps = {
  value: string;
  color?: Color;

  type?: "default" | "bold";
};

export const StylizedStringCard = ({ value, color = "slate", type = "default" }: StringProps) => {
  let textClassName;
  if (type === "default") {
    textClassName = "text-black text-1xl mx-auto text-center break-words";
  } else if (type === "bold") {
    textClassName = "text-black text-1xl mx-auto text-center break-all object-center font-bold";
  }

  return (
    <div className={`rounded-lg bg-${color}-300`}>
      <p className={textClassName}>{value}</p>
    </div>
  );
};
