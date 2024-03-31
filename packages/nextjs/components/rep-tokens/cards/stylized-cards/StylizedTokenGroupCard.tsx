import { Color } from "./Stylized";

export interface TokenCardInternalProps {
  color?: Color;
}

export const StylizedTokenGroupCard = ({ color = "slate", children }: any) => {
  return <div className={`text-white rounded-lg bg-${color}-900 flex flex-col items-center p-5`}>{children}</div>;
};
