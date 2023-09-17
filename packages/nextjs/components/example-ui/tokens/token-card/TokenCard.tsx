import { BaseTokenCard, TBaseTokenCardPrettifyLoadingProps, TBaseTokenCardPropertiesClasses } from "./BaseTokenCard";

type TTokenCardProps = {
  token: Token;
  propertiesClasses?: TTokenCardPropertiesClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
};

export type Token = {
  balance: bigint;
  image: string;
  name: string;
  description: string;
};

export type TTokenCardPropertiesClasses = {
  card: string;
  baseTokenCardPropertyClasses?: TBaseTokenCardPropertiesClasses;
};

export type TTokenCardPrettifyLoadingProps = {
  card: boolean;
  baseTokenCardPrettifyLoadingProps: TBaseTokenCardPrettifyLoadingProps;
};

export const TokenCard = ({ token, prettifyLoadingProps, propertiesClasses }: TTokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard
        image={token.image}
        balance={token.balance}
        name={token.name}
        description={token.description}
        propertiesClasses={propertiesClasses?.baseTokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps?.baseTokenCardPrettifyLoadingProps}
      />
    </>
  );

  return (
    <div className={propertiesClasses?.card}>
      {prettifyLoadingProps?.card ? (
        token?.image !== undefined &&
        token?.balance !== undefined &&
        token?.name !== undefined &&
        token?.description !== undefined ? (
          <div>{output}</div>
        ) : (
          <>Loading Token...</>
        )
      ) : (
        <div>{output}</div>
      )}
    </div>
  );
};