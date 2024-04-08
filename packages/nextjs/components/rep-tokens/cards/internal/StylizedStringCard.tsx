type StringProps = {
  value: string;

  type?: "default" | "bold";
};

export const StylizedStringCard = ({ value, type = "default" }: StringProps) => {
  let textClassName;
  if (type === "default") {
    textClassName = "text-base-content text-sm text-center break-words";
  } else if (type === "bold") {
    textClassName = "text-base-content text-md text-center break-all object-center font-bold";
  }

  return (
    <div className="bg-base-300 rounded-lg">
      <p className={textClassName}>{value}</p>
    </div>
  );
};
