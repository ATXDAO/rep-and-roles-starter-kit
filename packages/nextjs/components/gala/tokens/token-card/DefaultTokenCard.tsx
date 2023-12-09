import { Token } from "../TokenInteractions";
import {
  BaseTokenCard,
  TBaseTokenCardBooleanSet, // TBaseTokenCardRenderSettings, // TBaseTokenCardPrettifyLoadingProps,
  TBaseTokenCardPropertiesClasses,
} from "./BaseTokenCard";
import { ImageProperties } from "./ImageCard";

type TTokenCardProps = {
  token: Token;
  imageProperties?: ImageProperties;
  propertiesClasses?: TTokenCardPropertiesClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
  renderProps?: TBaseTokenCardBooleanSet;
};

export type TTokenCardPropertiesClasses = {
  card: string;
  baseTokenCardPropertyClasses?: TBaseTokenCardPropertiesClasses;
};

export type TTokenCardPrettifyLoadingProps = {
  card: boolean;
  baseTokenCardPrettifyLoadingProps: TBaseTokenCardBooleanSet;
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
        token={token}
        imageProperties={imageProperties}
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
