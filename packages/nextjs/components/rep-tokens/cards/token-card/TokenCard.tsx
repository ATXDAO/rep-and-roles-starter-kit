import { Token } from "../../hooks/Hooks";
import { BaseTokenCard, BaseTokenCardElementsProps } from "./BaseTokenCard";

export interface TokenCardProps {
  token: Token;
  elementsClasses?: TokenCardClasses;
  isBeautifyingTokenCardLoadingProps?: boolean;
  elementsProps: BaseTokenCardElementsProps;
}

export interface TokenCardClasses {
  card: string;
}

export const TokenCard = ({
  token,
  elementsClasses,
  isBeautifyingTokenCardLoadingProps = false,
  elementsProps,
}: TokenCardProps) => {
  const output = (
    <>
      <BaseTokenCard token={token} elementsProps={elementsProps} />
    </>
  );

  return (
    <>
      <div className={elementsClasses?.card}>
        {isBeautifyingTokenCardLoadingProps ? (
          token?.image !== undefined &&
          token?.balance !== undefined &&
          token?.name !== undefined &&
          token?.description !== undefined &&
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
