import { Token } from "../../hooks/Hooks";
import { ImageProperties } from "../property-cards/ImageCard";
import {
  AddressProp,
  BalanceProp,
  BaseTokenCard,
  BaseTokenCardElementsClasses,
  BaseTokenCardElementsSetOfBooleans,
  DescriptionProp,
  ImageProp,
  NameProp,
} from "./BaseTokenCard";

export interface TokenCardProps {
  token: Token;
  address?: string;
  imageProperties?: ImageProperties;
  elementsClasses?: TokenCardElementsClasses;
  isBeautifyingTokenCardLoadingProps?: IsBeautifyingTokenCardLoadingProps;
  // isRenderingTokenCardProps?: IsRenderingTokenCardProps;
  balanceProp?: BalanceProp;
  nameProp?: NameProp;
  descriptionProp?: DescriptionProp;
  imageProp?: ImageProp;
  addressProp?: AddressProp;
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
  // isRenderingTokenCardProps = {
  //   card: true,
  //   isRenderingElementsProps: { balance: true, image: true, name: true, description: true, address: true },
  // },
  isBeautifyingTokenCardLoadingProps = {
    card: false,
    isBeautifyLoadingElementsProps: { balance: false, image: false, name: false, description: false, address: false },
  },
  balanceProp,
  nameProp,
  descriptionProp,
  imageProp,
  addressProp,
}: TokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard
        token={token}
        address={address}
        imageProperties={imageProperties}
        elementsClasses={elementsClasses?.baseTokenCardElementsClasses}
        isBeautifyLoadingElementsProps={isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps}
        balanceProp={balanceProp}
        nameProp={nameProp}
        descriptionProp={descriptionProp}
        imageProp={imageProp}
        addressProp={addressProp}
      />
    </>
  );

  return (
    <>
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
    </>
  );
};
