import { IsPrettyLoading } from "../../types/Types";
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
  isTradeableProps?: StringCardProps;
  maxMintAmountProps?: StringCardProps;
}

export interface TokenCardProps {
  cardClasses?: string;
  isPrettyLoading?: IsPrettyLoading;
  valuesProps?: ValuesProps;
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
      {props?.valuesProps?.isTradeableProps ? <StringCard props={props?.valuesProps?.isTradeableProps} /> : <></>}
      {props?.valuesProps?.maxMintAmountProps ? <StringCard props={props?.valuesProps?.maxMintAmountProps} /> : <></>}
    </>
  );

  let isDoneLoading = true;

  if (props) {
    if (props.isPrettyLoading) {
      if (props.valuesProps) {
        if (Object.keys(props.valuesProps).length === 0) {
          isDoneLoading &&= false;
        }
        let t: keyof typeof props.valuesProps;
        for (t in props.valuesProps) {
          if (props.valuesProps[t]) {
            if (props.valuesProps[t]?.value === undefined) {
              isDoneLoading &&= false;
            }
          } else {
            isDoneLoading &&= false;
          }
        }
      } else {
        isDoneLoading &&= false;
      }
    }
  }

  return (
    <>
      <div className={props?.cardClasses}>
        {isDoneLoading ? (
          <div>{output}</div>
        ) : (
          <p className={props?.isPrettyLoading?.classes}>{props?.isPrettyLoading?.message}</p>
        )}
      </div>
    </>
  );
};
