import { Token } from "../../hooks/Hooks";
import { ElementClasses } from "../../types/Types";
import { BalanceCard } from "../property-cards/BalanceCard";
import { ImageCard } from "../property-cards/ImageCard";
import { ImageProperties } from "../property-cards/ImageCard";
import { StringCard } from "../property-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface BaseTokenCardProps {
  token: Token;
  elementsProps: BaseTokenCardElementsProps;
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

export const BaseTokenCard = ({ elementsProps }: BaseTokenCardProps) => {
  return (
    <>
      {elementsProps?.balanceProp ? (
        <BalanceCard
          value={elementsProps?.balanceProp?.value}
          elementClasses={elementsProps?.balanceProp?.classes}
          prettifyLoading={elementsProps?.balanceProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.imageProp ? (
        <ImageCard
          value={elementsProps?.imageProp?.value}
          imageProperties={elementsProps?.imageProp?.properties}
          elementClasses={elementsProps?.imageProp?.classes}
          prettifyLoading={elementsProps?.imageProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.nameProp ? (
        <StringCard
          value={elementsProps?.nameProp?.value}
          elementClasses={elementsProps?.nameProp?.classes}
          prettifyLoading={elementsProps?.nameProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.descriptionProp ? (
        <StringCard
          value={elementsProps?.descriptionProp?.value}
          elementClasses={elementsProps?.descriptionProp?.classes}
          prettifyLoading={elementsProps?.descriptionProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.addressProp ? (
        <Address address={elementsProps?.addressProp?.value} propertyClasses={elementsProps?.addressProp?.classes} />
      ) : (
        <></>
      )}
    </>
  );
};
