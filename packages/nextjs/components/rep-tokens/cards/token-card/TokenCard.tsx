import { Token } from "../../hooks/Hooks";
import { ImageProperties } from "../property-cards/ImageCard";
import { BaseTokenCard, BaseTokenCardPropertiesBooleanSet, BaseTokenCardPropertiesClasses } from "./BaseTokenCard";

export interface TTokenCardProps {
  token: Token;
  address?: string;
  imageProperties?: ImageProperties;
  propertiesClasses?: TTokenCardPropertiesClasses;
  prettifyLoadingProps?: TTokenCardPrettifyLoadingProps;
  renderProps?: BaseTokenCardPropertiesBooleanSet;
}

export type TTokenCardPropertiesClasses = {
  card: string;
  baseTokenCardPropertyClasses?: BaseTokenCardPropertiesClasses;
};

export type TTokenCardPrettifyLoadingProps = {
  card: boolean;
  baseTokenCardPrettifyLoadingProps: BaseTokenCardPropertiesBooleanSet;
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
