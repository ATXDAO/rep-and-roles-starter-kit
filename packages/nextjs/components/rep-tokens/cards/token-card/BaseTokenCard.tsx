// import { Token } from "../../hooks/Hooks";
// import { ElementClasses } from "../../types/Types";
import { BalanceCard } from "../property-cards/BalanceCard";
import { BigIntProps } from "../property-cards/BalanceCard";
import { ImageCard } from "../property-cards/ImageCard";
import { ImageCardProps } from "../property-cards/ImageCard";
// import { ImageProperties } from "../property-cards/ImageCard";
import { StringCard } from "../property-cards/StringCard";
import { StringCardProps } from "../property-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface BaseTokenCardProps {
  elementsProps: BaseTokenCardElementsProps;
}

export interface BaseTokenCardElementsProps {
  balanceProp?: BigIntProps;
  nameProp?: StringCardProps;
  descriptionProp?: StringCardProps;
  imageProp?: ImageCardProps;
  addressProp?: StringCardProps;
}

export const BaseTokenCard = ({ elementsProps }: BaseTokenCardProps) => {
  return (
    <>
      {elementsProps?.balanceProp ? (
        <BalanceCard
          value={elementsProps?.balanceProp?.value}
          classes={elementsProps?.balanceProp?.classes}
          isPrettyLoading={elementsProps?.balanceProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.imageProp ? (
        <ImageCard
          value={elementsProps?.imageProp?.value}
          properties={elementsProps?.imageProp?.properties}
          classes={elementsProps?.imageProp?.classes}
          isPrettyLoading={elementsProps?.imageProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.nameProp ? (
        <StringCard
          value={elementsProps?.nameProp?.value}
          classes={elementsProps?.nameProp?.classes}
          isPrettyLoading={elementsProps?.nameProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.descriptionProp ? (
        <StringCard
          value={elementsProps?.descriptionProp?.value}
          classes={elementsProps?.descriptionProp?.classes}
          isPrettyLoading={elementsProps?.descriptionProp?.isPrettyLoading}
        />
      ) : (
        <></>
      )}
      {elementsProps?.addressProp ? <Address props={elementsProps?.addressProp} /> : <></>}
    </>
  );
};
