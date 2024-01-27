import { BalanceCard, BigIntCardProps } from "../property-cards/BalanceCard";
import { ImageCard, ImageCardProps } from "../property-cards/ImageCard";
import { StringCard, StringCardProps } from "../property-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface BaseTokenCardProps {
  elementsProps: BaseTokenCardElementsProps;
}

export interface BaseTokenCardElementsProps {
  balanceProp?: BigIntCardProps;
  nameProp?: StringCardProps;
  descriptionProp?: StringCardProps;
  imageProp?: ImageCardProps;
  addressProp?: StringCardProps;
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
