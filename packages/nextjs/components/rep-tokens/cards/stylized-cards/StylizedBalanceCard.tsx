import { Color } from "./Stylized";

type BalanceProps = {
  value: number;
  color?: Color;
};

export const StylizedBalanceCard = ({ value, color = "slate" }: BalanceProps) => {
  return (
    <div className={`rounded-lg bg-${color}-300`}>
      <p className="text-4xl mx-auto text-center text-black">{value.toString()}</p>
    </div>
  );
};
