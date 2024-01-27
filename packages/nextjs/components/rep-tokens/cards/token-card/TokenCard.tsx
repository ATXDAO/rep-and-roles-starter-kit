import { Token } from "../../hooks/Hooks";
// import { ImageProperties } from "../property-cards/ImageCard";
import {
  AddressProp,
  BalanceProp,
  BaseTokenCard, // BaseTokenCardElementsClasses,
  // BaseTokenCardElementsSetOfBooleans,
  DescriptionProp,
  ImageProp,
  NameProp, // BaseTokenCardElementsProps
} from "./BaseTokenCard";

export interface TokenCardProps {
  token: Token;
  elementsClasses?: TokenCardElementsClasses;
  isBeautifyingTokenCardLoadingProps?: boolean;
  balanceProp?: BalanceProp;
  nameProp?: NameProp;
  descriptionProp?: DescriptionProp;
  imageProp?: ImageProp;
  addressProp?: AddressProp;
}

export interface TokenCardElementsClasses {
  card: string;
  // baseTokenCardElementsClasses?: BaseTokenCardElementsClasses;
}

export interface IsRenderingTokenCardProps {
  card: boolean;
  // isRenderingElementsProps: BaseTokenCardElementsSetOfBooleans;
}

export interface IsBeautifyingTokenCardLoadingProps {
  card: boolean;
  // isBeautifyLoadingElementsProps: BaseTokenCardElementsSetOfBooleans;
}

export const TokenCard = ({
  token,
  elementsClasses,
  isBeautifyingTokenCardLoadingProps = false,
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
        {isBeautifyingTokenCardLoadingProps ? (
          token?.image !== undefined &&
          token?.balance !== undefined &&
          token?.name !== undefined &&
          token?.description !== undefined &&
          addressProp?.value !== undefined ? (
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
