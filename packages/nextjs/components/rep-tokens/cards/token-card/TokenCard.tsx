import { BalanceCard, BigIntCardProps } from "../property-cards/BalanceCard";
import { ImageCard, ImageCardProps } from "../property-cards/ImageCard";
import { StringCard, StringCardProps } from "../property-cards/StringCard";
import { Address } from "~~/components/scaffold-eth";

export interface ComponentsProps {
  balanceProps?: BigIntCardProps;
  nameProps?: StringCardProps;
  descriptionProps?: StringCardProps;
  imageProps?: ImageCardProps;
  addressProps?: StringCardProps;
}

export interface TokenCardProps {
  cardClasses?: string;
  isPrettyLoading?: boolean;
  componentsProps: ComponentsProps;
}

export interface TokenCardInternalProps {
  props: TokenCardProps;
}

export const TokenCard = ({ props }: TokenCardInternalProps) => {
  const output = (
    <>
      {props?.componentsProps?.balanceProps ? <BalanceCard props={props?.componentsProps?.balanceProps} /> : <></>}
      {props?.componentsProps?.imageProps ? <ImageCard props={props?.componentsProps?.imageProps} /> : <></>}
      {props?.componentsProps?.nameProps ? <StringCard props={props?.componentsProps?.nameProps} /> : <></>}
      {props?.componentsProps?.descriptionProps ? (
        <StringCard props={props?.componentsProps?.descriptionProps} />
      ) : (
        <></>
      )}
      {props?.componentsProps?.addressProps ? <Address props={props?.componentsProps?.addressProps} /> : <></>}
      {/* <BaseTokenCard props={props?.baseComponentsProps} /> */}
    </>
  );

  return (
    <>
      <div className={props?.cardClasses}>
        {props?.isPrettyLoading ? (
          props?.componentsProps?.imageProps?.value !== undefined &&
          props?.componentsProps?.balanceProps?.value !== undefined &&
          props?.componentsProps?.nameProps?.value !== undefined &&
          props?.componentsProps?.descriptionProps?.value !== undefined &&
          props?.componentsProps?.addressProps?.value !== undefined ? (
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
