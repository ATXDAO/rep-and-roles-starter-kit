import { TTokenInternalToggleProps, TokenCardInternal } from "./TokenCardInternal";

export type Token = {
  balance: bigint;
  imageUri: string;
  name: string;
  description: string;
};

type TTokenProps = {
  token?: Token;
  toggleProps?: TTokenToggleProps;
};

export type TTokenToggleProps = {
  toggleLoading?: boolean;
  tokenInternalToggleProps?: TTokenInternalToggleProps;
};

export const TokenCard = ({ token, toggleProps }: TTokenProps) => {
  return (
    <>
      {toggleProps?.toggleLoading !== undefined ? (
        toggleProps.toggleLoading !== undefined ? (
          toggleProps.toggleLoading ? (
            token?.imageUri !== undefined &&
            token?.balance !== undefined &&
            name !== undefined &&
            token?.description !== undefined ? (
              <>
                <TokenCardInternal
                  imageUri={token?.imageUri}
                  balance={token?.balance}
                  name={token?.name}
                  description={token?.description}
                  toggleProps={toggleProps.tokenInternalToggleProps}
                />
              </>
            ) : (
              <>Loading Token...</>
            )
          ) : (
            <>
              <TokenCardInternal
                imageUri={token?.imageUri}
                balance={token?.balance}
                name={token?.name}
                description={token?.description}
                toggleProps={toggleProps.tokenInternalToggleProps}
              />
            </>
          )
        ) : (
          <>
            <TokenCardInternal
              imageUri={token?.imageUri}
              balance={token?.balance}
              name={token?.name}
              description={token?.description}
              toggleProps={toggleProps.tokenInternalToggleProps}
            />
          </>
        )
      ) : (
        <>
          <TokenCardInternal
            imageUri={token?.imageUri}
            balance={token?.balance}
            name={token?.name}
            description={token?.description}
          />
        </>
      )}
    </>
  );
};
