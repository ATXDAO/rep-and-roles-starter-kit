import { Token } from "../Hooks";
import { ImageProperties } from "./ImageCard";
import { BaseTokenCard, TBaseTokenCardBooleanSet, TBaseTokenCardPropertiesClasses } from "./TokenCard";

export interface TTokenCardProps {
  token: Token;
  address?: string;
  imageProperties?: ImageProperties;
  propertiesClasses?: TTokenCardPropertiesClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
  renderProps?: TBaseTokenCardBooleanSet;
}

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
  address,
  imageProperties,
  prettifyLoadingProps,
  propertiesClasses,
  renderProps,
}: TTokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard
        token={token}
        address={address}
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
        token?.description !== undefined &&
        address !== undefined ? (
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
