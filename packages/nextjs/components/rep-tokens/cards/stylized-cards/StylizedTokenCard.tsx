import { Color } from "./Stylized";

export interface TokenCardInternalProps {
  color?: Color;
}

export const StylizedTokenCard = ({ color = "slate", children }: any) => {
  return <div className={`bg-${color}-600 rounded-lg relative p-5 m-4 w-64`}>{children}</div>;
};
