import { TokenGroup } from "../../hooks/Hooks";
import { StylizedAddressCard } from "./StylizedAddressCard";
import { StylizedTokenCard3 } from "./StylizedTokenCard3";

export interface TokenCardInternalProps {
  tokens: TokenGroup;
  components?: ReputationComponent[];
  isBalanceOverlayed?: boolean;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  children?: React.ReactNode;
  showTopLevelAddress?: boolean;
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

export const StylizedTokenGroupCard = ({
  tokens,
  components = ["Balance", "Image", "Name", "Description", "Address", "TokenType", "MaxMintAmountPerTx"],
  isBalanceOverlayed,
  children,
  size = "base",
  showTopLevelAddress,
}: TokenCardInternalProps) => {
  const output: any[] = [];

  for (let i = 0; i < tokens?.tokens?.length; i++) {
    const card = (
      <StylizedTokenCard3
        key={i}
        size={size}
        token={tokens.tokens[i]}
        components={components}
        isBalanceOverlayed={isBalanceOverlayed}
      />
    );
    output.push(card);
  }

  return (
    <div className={`bg-base-100 flex flex-col rounded-lg ${sizeMap[size]}`}>
      {showTopLevelAddress ? <StylizedAddressCard address={tokens.address} isGroup={true} /> : <></>}
      {children}
      <div className={`flex flex-wrap justify-center ${sizeMap[size]} rounded-lg bg-base-200`}>{output}</div>
    </div>
  );
};
