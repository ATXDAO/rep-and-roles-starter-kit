import {
  BaseTokenCard,
  TBaseTokenCardPrettifyLoadingProps,
  TBaseTokenCardPropertiesClasses,
  TBaseTokenCardRenderSettings,
} from "./BaseTokenCard";
import { ImageProperties } from "./ImageCard";

type TTokenCardProps = {
  token: Token;
  propertiesClasses?: TTokenCardPropertiesClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
  renderProps?: TBaseTokenCardRenderSettings;
};

export type Token = {
  balance: bigint;
  imageProperties: ImageProperties;
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

export const DefaultTokenCard = ({ token, prettifyLoadingProps, propertiesClasses, renderProps }: TTokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard
        imageProperties={token.imageProperties}
        balance={token.balance}
        name={token.name}
        description={token.description}
        propertiesClasses={propertiesClasses?.baseTokenCardPropertyClasses}
        prettifyLoadingProps={prettifyLoadingProps?.baseTokenCardPrettifyLoadingProps}
        renderProps={renderProps}
      />
    </>
  );

  return (
    <div className={propertiesClasses?.card}>
      {prettifyLoadingProps?.card ? (
        token?.imageProperties.value !== undefined &&
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
