import {
  BaseNavBarTokenCard,
  TBaseTokenCardPrettifyLoadingProps,
  TBaseTokenCardPropertiesClasses,
} from "./BaseNavBarTokenCard";
import { ImageProperties } from "./ImageCard";

type TTokenCardProps = {
  token: Token;
  propertiesClasses?: TTokenCardPropertiesClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
};

export type Token = {
  balance: bigint;
  imageProperties: ImageProperties;
};

export type TTokenCardPropertiesClasses = {
  card: string;
  baseTokenCardPropertyClasses?: TBaseTokenCardPropertiesClasses;
};

export type TTokenCardPrettifyLoadingProps = {
  card: boolean;
  baseTokenCardPrettifyLoadingProps: TBaseTokenCardPrettifyLoadingProps;
};

export const DefaultNavBarTokenCard = ({ token, prettifyLoadingProps, propertiesClasses }: TTokenCardProps) => {
  const output = (
    <>
      <BaseNavBarTokenCard
        imageProperties={token.imageProperties}
        balance={token.balance}
        propertiesClasses={propertiesClasses?.baseTokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps?.baseTokenCardPrettifyLoadingProps}
      />
    </>
  );

  return (
    <div className={propertiesClasses?.card}>
      {prettifyLoadingProps?.card ? (
        token?.imageProperties.value !== undefined && token?.balance !== undefined ? (
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
