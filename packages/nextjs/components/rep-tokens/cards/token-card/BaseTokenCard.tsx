import { Token } from "../../hooks/Hooks";
import { BalanceCard } from "../property-cards/BalanceCard";
import { ImageCard } from "../property-cards/ImageCard";
import { ImageProperties } from "../property-cards/ImageCard";
import { StringCard } from "../property-cards/StringCard";
import { ElementClasses } from "../types/Types";
import { Address } from "~~/components/scaffold-eth";

export interface BaseTokenCardProps {
  token: Token;
  address?: string;
  imageProperties?: ImageProperties;
  elementsClasses?: BaseTokenCardElementsClasses;
  isBeautifyLoadingElementsProps?: BaseTokenCardElementsSetOfBooleans;
  // isRenderingElementsProps?: BaseTokenCardElementsSetOfBooleans;
  balanceProp?: BalanceProp;
  nameProp?: NameProp;
  descriptionProp?: DescriptionProp;
  imageProp?: ImageProp;
  addressProp?: AddressProp;
}

export interface BalanceProp {
  value: bigint;
  classes?: ElementClasses;
  isBeautifyLoading?: boolean;
}

export interface NameProp {
  value: string;
  classes?: ElementClasses;
  isBeautifyLoading?: boolean;
}

export interface DescriptionProp {
  value: string;
  classes?: ElementClasses;
  isBeautifyLoading?: boolean;
}

export interface ImageProp {
  value: string;
  properties?: ImageProperties;
  classes?: ElementClasses;
  isBeautifyLoading?: boolean;
}

export interface AddressProp {
  value: string | undefined;
  classes?: ElementClasses;
  isBeautifyLoading?: boolean;
}

export interface BaseTokenCardElementsClasses {
  balance: ElementClasses;
  name: ElementClasses;
  description: ElementClasses;
  image: ElementClasses;
  address: ElementClasses;
}

export interface BaseTokenCardElementsSetOfBooleans {
  balance: boolean;
  name: boolean;
  description: boolean;
  image: boolean;
  address: boolean;
}

export const BaseTokenCard = ({
  // token,
  address,
  // imageProperties,
  elementsClasses,
  // isBeautifyLoadingElementsProps = { balance: false, image: false, name: false, description: false, address: false },
  balanceProp,
  nameProp,
  descriptionProp,
  imageProp,
  addressProp,
}: BaseTokenCardProps) => {
  return (
    <>
      {balanceProp ? (
        <BalanceCard
          value={balanceProp.value}
          elementClasses={balanceProp.classes}
          prettifyLoading={balanceProp.isBeautifyLoading}
        />
      ) : (
        <></>
      )}
      {imageProp ? (
        <ImageCard
          value={imageProp.value}
          imageProperties={imageProp.properties}
          elementClasses={imageProp.classes}
          prettifyLoading={imageProp.isBeautifyLoading}
        />
      ) : (
        <></>
      )}
      {nameProp ? (
        <StringCard
          value={nameProp.value}
          elementClasses={nameProp.classes}
          prettifyLoading={nameProp.isBeautifyLoading}
        />
      ) : (
        <></>
      )}
      {descriptionProp ? (
        <StringCard
          value={descriptionProp.value}
          elementClasses={descriptionProp.classes}
          prettifyLoading={descriptionProp.isBeautifyLoading}
        />
      ) : (
        <></>
      )}
      {addressProp ? <Address address={address} propertyClasses={elementsClasses?.address} /> : <></>}

      {/* {isRenderingElementsProps.balance ? (
        <BalanceCard
          value={token.balance}
          elementClasses={elementsClasses?.balance}
          prettifyLoading={isBeautifyLoadingElementsProps?.balance}
        />
      ) : (
        <></>
      )} */}

      {/* {isRenderingElementsProps.image ? (
        <ImageCard
          value={token.image}
          imageProperties={imageProperties}
          elementClasses={elementsClasses?.image}
          prettifyLoading={isBeautifyLoadingElementsProps?.image}
        />
      ) : (
        <></>
      )}
      {isRenderingElementsProps.name ? (
        <StringCard
          value={token.name}
          elementClasses={elementsClasses?.name}
          prettifyLoading={isBeautifyLoadingElementsProps?.name}
        />
      ) : (
        <></>
      )}
      {isRenderingElementsProps.description ? (
        <StringCard
          value={token.description}
          elementClasses={elementsClasses?.description}
          prettifyLoading={isBeautifyLoadingElementsProps?.description}
        />
      ) : (
        <></>
      )}
      {isRenderingElementsProps.address ? (
        <Address address={address} propertyClasses={elementsClasses?.address} />
      ) : (
        <></>
      )} */}
    </>
  );
};
