import { BalanceCard, BigIntCardProps } from "../value-cards/BalanceCard";
import { ImageCard, ImageCardProps } from "../value-cards/ImageCard";
import { StringCard, StringCardProps } from "../value-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface ValuesProps {
  balanceProps?: BigIntCardProps;
  nameProps?: StringCardProps;
  descriptionProps?: StringCardProps;
  imageProps?: ImageCardProps;
  addressProps?: StringCardProps;
}

export interface TokenCardProps {
  cardClasses?: string;
  isPrettyLoading?: boolean;
  valuesProps: ValuesProps;
}

export interface TokenCardInternalProps {
  props: TokenCardProps;
}

export const TokenCard = ({ props }: TokenCardInternalProps) => {
  const output = (
    <>
      {props?.valuesProps?.balanceProps ? <BalanceCard props={props?.valuesProps?.balanceProps} /> : <></>}
      {props?.valuesProps?.imageProps ? <ImageCard props={props?.valuesProps?.imageProps} /> : <></>}
      {props?.valuesProps?.nameProps ? <StringCard props={props?.valuesProps?.nameProps} /> : <></>}
      {props?.valuesProps?.descriptionProps ? <StringCard props={props?.valuesProps?.descriptionProps} /> : <></>}
      {props?.valuesProps?.addressProps ? <Address props={props?.valuesProps?.addressProps} /> : <></>}
    </>
  );

  return (
    <>
      <div className={props?.cardClasses}>
        {props?.isPrettyLoading ? (
          props?.valuesProps?.imageProps?.value !== undefined &&
          props?.valuesProps?.balanceProps?.value !== undefined &&
          props?.valuesProps?.nameProps?.value !== undefined &&
          props?.valuesProps?.descriptionProps?.value !== undefined &&
          props?.valuesProps?.addressProps?.value !== undefined ? (
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
