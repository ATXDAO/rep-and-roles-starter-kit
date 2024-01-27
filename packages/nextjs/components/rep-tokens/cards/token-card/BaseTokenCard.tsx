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
  isPrettyLoading?: boolean;
}

export interface NameProp {
  value: string;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export interface DescriptionProp {
  value: string;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export interface ImageProp {
  value: string;
  properties?: ImageProperties;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
}

export interface AddressProp {
  value: string | undefined;
  classes?: ElementClasses;
  isPrettyLoading?: boolean;
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
          prettifyLoading={balanceProp.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {imageProp ? (
        <ImageCard
          value={imageProp.value}
          imageProperties={imageProp.properties}
          elementClasses={imageProp.classes}
          prettifyLoading={imageProp.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {nameProp ? (
        <StringCard
          value={nameProp.value}
          elementClasses={nameProp.classes}
          prettifyLoading={nameProp.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {descriptionProp ? (
        <StringCard
          value={descriptionProp.value}
          elementClasses={descriptionProp.classes}
          prettifyLoading={descriptionProp.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {addressProp ? <Address address={addressProp.value} propertyClasses={addressProp?.classes} /> : <></>}
    </>
  );
};
