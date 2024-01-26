import { Token } from "../../hooks/Hooks";
import { ImageProperties } from "../property-cards/ImageCard";
import { BaseTokenCard, BaseTokenCardElementsClasses, BaseTokenCardElementsSetOfBooleans } from "./BaseTokenCard";

export interface TokenCardProps {
  token: Token;
  address?: string;
  imageProperties?: ImageProperties;
  elementsClasses?: TokenCardElementsClasses;
  isBeautifyingTokenCardLoadingProps?: IsBeautifyingTokenCardLoadingProps;
  isRenderingTokenCardProps?: IsRenderingTokenCardProps;
}

export interface TokenCardElementsClasses {
  card: string;
  baseTokenCardElementsClasses?: BaseTokenCardElementsClasses;
}

export interface IsRenderingTokenCardProps {
  card: boolean;
  isRenderingElementsProps: BaseTokenCardElementsSetOfBooleans;
}

export interface IsBeautifyingTokenCardLoadingProps {
  card: boolean;
  isBeautifyLoadingElementsProps: BaseTokenCardElementsSetOfBooleans;
}

export const TokenCard = ({
  token,
  address,
  imageProperties,
  elementsClasses,
  isRenderingTokenCardProps = {
    card: true,
    isRenderingElementsProps: { balance: true, image: true, name: true, description: true, address: true },
  },
  isBeautifyingTokenCardLoadingProps = {
    card: false,
    isBeautifyLoadingElementsProps: { balance: false, image: false, name: false, description: false, address: false },
  },
}: TokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard
        token={token}
        address={address}
        imageProperties={imageProperties}
        elementsClasses={elementsClasses?.baseTokenCardElementsClasses}
        isRenderingElementsProps={isRenderingTokenCardProps?.isRenderingElementsProps}
        isBeautifyLoadingElementsProps={isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps}
      />
    </>
  );

  return (
    <>
      {isRenderingTokenCardProps.card ? (
        <div className={elementsClasses?.card}>
          {isBeautifyingTokenCardLoadingProps?.card ? (
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
      ) : (
        <></>
      )}
    </>
  );
};
