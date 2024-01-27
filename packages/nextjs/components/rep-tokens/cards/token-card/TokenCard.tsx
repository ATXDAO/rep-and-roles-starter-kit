import { BaseTokenCard } from "./BaseTokenCard";
import { BaseTokenCardElementsProps } from "./BaseTokenCard";

export interface TokenCardProps {
  // id: number;
  elementsClasses?: TokenCardClasses;
  isBeautifyingTokenCardLoadingProps?: boolean;
  elementsProps: BaseTokenCardElementsProps;
}

export interface TokenCardClasses {
  card: string;
}

export const TokenCard = ({
  elementsClasses,
  isBeautifyingTokenCardLoadingProps = false,
  elementsProps,
}: TokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard elementsProps={elementsProps} />
    </>
  );

  return (
    <>
      <div className={elementsClasses?.card}>
        {isBeautifyingTokenCardLoadingProps ? (
          elementsProps.imageProp?.value !== undefined &&
          elementsProps.balanceProp?.value !== undefined &&
          elementsProps.nameProp?.value !== undefined &&
          elementsProps.descriptionProp?.value !== undefined &&
          elementsProps?.addressProp?.value !== undefined ? (
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
