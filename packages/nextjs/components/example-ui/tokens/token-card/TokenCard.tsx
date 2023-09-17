import { BaseTokenCard, TBaseTokenCardPropertyClasses, TTokenCardInternalPrettifyLoadingProps } from "./BaseTokenCard";

type TTokenCardProps = {
  token: Token;
  propertyClasses?: TTokenCardPropertyClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
};

export type Token = {
  balance: bigint;
  imageUri: string;
  name: string;
  description: string;
};

export type TTokenCardPropertyClasses = {
  card: string;
  baseTokenCardPropertyClasses?: TBaseTokenCardPropertyClasses;
};

export type TTokenCardPrettifyLoadingProps = {
  card: boolean;
  tokenCardInternalPrettifyLoadingProps: TTokenCardInternalPrettifyLoadingProps;
};

export const TokenCard = ({ token, prettifyLoadingProps, propertyClasses }: TTokenCardProps) => {
  return (
    <div className={propertyClasses?.card}>
      {prettifyLoadingProps?.card ? (
        token?.imageUri !== undefined &&
        token?.balance !== undefined &&
        token?.name !== undefined &&
        token?.description !== undefined ? (
          <div>
            <BaseTokenCard
              imageUri={token.imageUri}
              balance={token.balance}
              name={token.name}
              description={token.description}
              prettifyLoadingProps={prettifyLoadingProps.tokenCardInternalPrettifyLoadingProps}
              propertyClasses={propertyClasses?.baseTokenCardPropertyClasses}
            />
          </div>
        ) : (
          <>Loading Token...</>
        )
      ) : (
        <div>
          <BaseTokenCard
            imageUri={token.imageUri}
            balance={token.balance}
            name={token.name}
            description={token.description}
            propertyClasses={propertyClasses?.baseTokenCardPropertyClasses}
          />
        </div>
      )}
    </div>
  );
};
