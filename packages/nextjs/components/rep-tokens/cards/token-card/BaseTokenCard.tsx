// import { Token } from "../../hooks/Hooks";
// import { ElementClasses } from "../../types/Types";
import { BalanceCard } from "../property-cards/BalanceCard";
import { BigIntCardProps } from "../property-cards/BalanceCard";
import { ImageCard } from "../property-cards/ImageCard";
import { ImageProps } from "../property-cards/ImageCard";
// import { ImageProperties } from "../property-cards/ImageCard";
import { StringCard, StringProps } from "../property-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface BaseTokenCardProps {
  elementsProps: BaseTokenCardElementsProps;
}

export interface BaseTokenCardElementsProps {
  balanceProp?: BigIntCardProps;
  nameProp?: StringProps;
  descriptionProp?: StringProps;
  imageProp?: ImageProps;
  addressProp?: StringProps;
}

export const BaseTokenCard = ({ elementsProps }: BaseTokenCardProps) => {
  return (
    <>
      {elementsProps?.balanceProp ? <BalanceCard props={elementsProps?.balanceProp} /> : <></>}
      {elementsProps?.imageProp ? <ImageCard props={elementsProps?.imageProp} /> : <></>}
      {elementsProps?.nameProp ? <StringCard props={elementsProps?.nameProp} /> : <></>}
      {elementsProps?.descriptionProp ? <StringCard props={elementsProps?.descriptionProp} /> : <></>}
      {elementsProps?.addressProp ? <Address props={elementsProps?.addressProp} /> : <></>}
    </>
  );
};
