import { TTokenToggleProps, Token, TokenCard } from "./TokenCard";

type TTokenGroupCardProps = {
  tokenGroup: TokenGroup;
  toggleProps: TTokenGroupCardToggleProps;
};

export type TokenGroup = {
  token0: Token;
  token1: Token;
};

export type TTokenGroupCardToggleProps = {
  toggleTokenGroupCardChecking: boolean;
  tokenToggleProps: TTokenToggleProps;
};

export const TokenGroupCard = ({ tokenGroup, toggleProps }: TTokenGroupCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div>
        {toggleProps.toggleTokenGroupCardChecking ? (
          tokenGroup?.token0?.balance !== undefined &&
          tokenGroup?.token0?.name !== undefined &&
          tokenGroup?.token0?.description !== undefined &&
          tokenGroup?.token0?.imageUri !== undefined &&
          tokenGroup?.token1?.balance !== undefined &&
          tokenGroup?.token1?.name !== undefined &&
          tokenGroup?.token1?.description !== undefined &&
          tokenGroup?.token1?.imageUri !== undefined ? (
            <>
              <TokenCard token={tokenGroup.token0} toggleProps={toggleProps?.tokenToggleProps} />
              <TokenCard token={tokenGroup.token1} toggleProps={toggleProps?.tokenToggleProps} />
            </>
          ) : (
            <>Loading Reputation Tokens...</>
          )
        ) : (
          <>
            <TokenCard token={tokenGroup?.token0} toggleProps={toggleProps?.tokenToggleProps} />
            <TokenCard token={tokenGroup?.token1} toggleProps={toggleProps?.tokenToggleProps} />
          </>
        )}
      </div>
    </div>
  );
};
