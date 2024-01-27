import { BaseTokenCard } from "./BaseTokenCard";
import { BaseTokenCardElementsProps } from "./BaseTokenCard";

export interface TokenCardInternalProps {
  props: TokenCardProps;
}

export interface TokenCardProps {
  cardClasses?: string;
  isPrettyLoading?: boolean;
  elementsProps: BaseTokenCardElementsProps;
}

export const TokenCard = ({ props }: TokenCardInternalProps) => {
  const output = (
    <>
      <BaseTokenCard elementsProps={props?.elementsProps} />
    </>
  );

  return (
    <>
      <div className={props?.cardClasses}>
        {props?.isPrettyLoading ? (
          props?.elementsProps?.imageProp?.value !== undefined &&
          props?.elementsProps?.balanceProp?.value !== undefined &&
          props?.elementsProps?.nameProp?.value !== undefined &&
          props?.elementsProps?.descriptionProp?.value !== undefined &&
          props?.elementsProps?.addressProp?.value !== undefined ? (
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
