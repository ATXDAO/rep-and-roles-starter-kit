// import { TokenGroup } from "../hooks/Hooks";
import { Token } from "../hooks/Hooks";
import { ReputationTokenCard } from "./ReputationTokenCard";

export interface TokenCardInternalProps {
  tokens: Token[];
  components?: ReputationComponent[];
  isBalanceOverlayed?: boolean;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  preChildren?: React.ReactNode;
  postChildren?: React.ReactNode;
}

const sizeMap = {
  xs: "p-1",
  sm: "p-5",
  base: "p-5",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
};

export type ReputationComponent =
  | "Balance"
  | "Image"
  | "Name"
  | "Description"
  | "Address"
  | "TokenType"
  | "MaxMintAmountPerTx";

export const ReputationTokenGroupCard = ({
  tokens,
  components = ["Balance", "Image", "Name", "Description", "Address", "TokenType", "MaxMintAmountPerTx"],
  isBalanceOverlayed,
  preChildren,
  postChildren,
  size = "base",
}: TokenCardInternalProps) => {
  const output: any[] = [];

  for (let i = 0; i < tokens?.length; i++) {
    const card = (
      <ReputationTokenCard
        key={i}
        size={size}
        token={tokens[i]}
        components={components}
        isBalanceOverlayed={isBalanceOverlayed}
      />
    );
    output.push(card);
  }

  return (
    <div className={`bg-base-100 flex flex-col rounded-lg ${sizeMap[size]} space-y-4`}>
      {preChildren}
      <div className={`flex flex-wrap justify-center ${sizeMap[size]} rounded-lg bg-base-200`}>{output}</div>
      {postChildren}
    </div>
  );
};
