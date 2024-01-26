import { Token } from "../../hooks/Hooks";
import { ElementClasses } from "../../types/Types";
import { BalanceCard } from "../property-cards/BalanceCard";
import { ImageCard } from "../property-cards/ImageCard";
import { ImageProperties } from "../property-cards/ImageCard";
import { StringCard } from "../property-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface BaseTokenCardProps {
  token: Token;
  balanceProp?: BalanceProp;
  nameProp?: NameProp;
  descriptionProp?: DescriptionProp;
  imageProp?: ImageProp;
  addressProp?: AddressProp;
}

export interface BaseTokenCardElementsProps {
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

export const BaseTokenCard = ({
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
      {addressProp ? <Address address={addressProp.value} propertyClasses={addressProp?.classes} /> : <></>}
    </>
  );
};
