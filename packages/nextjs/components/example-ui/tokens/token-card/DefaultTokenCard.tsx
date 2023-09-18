import {
  BaseTokenCard,
  TBaseTokenCardPrettifyLoadingProps,
  TBaseTokenCardPropertiesClasses,
  TBaseTokenCardRenderSettings,
} from "./BaseTokenCard";
import { ImageProperties } from "./ImageCard";

type TTokenCardProps = {
  token: Token;
  imageProperties?: ImageProperties;
  propertiesClasses?: TTokenCardPropertiesClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
  renderProps?: TBaseTokenCardRenderSettings;
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

export const DefaultTokenCard = ({
  token,
  imageProperties,
  prettifyLoadingProps,
  propertiesClasses,
  renderProps,
}: TTokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard
        imageProperties={imageProperties}
        balance={token.balance}
        image={token.image}
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
