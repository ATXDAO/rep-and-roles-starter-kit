export type Size = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export interface TokenCardInternalProps {
  size?: Size;
  children?: React.ReactNode;
}

const sizeMap = {
  xs: "",
  sm: "px-1 py-1 w-20",
  base: "p-5 m-4 w-64",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
};

export const StylizedTokenCard = ({ size = "base", children }: TokenCardInternalProps) => {
  "rounded-lg bg-slate-600 px-1 py-1 relative w-20";

  return <div className={`bg-base-100 rounded-lg ${sizeMap[size]} relative p-1`}>{children}</div>;
};
