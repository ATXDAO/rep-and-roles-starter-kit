import { BalanceCard } from "./BalanceCard";
import { TBalanceCardPropertiesClasses } from "./BalanceCard";
import { ImageCard } from "./ImageCard";
import { ImageProperties } from "./ImageCard";

type TTokenProps = {
  balance: bigint;
  imageProperties: ImageProperties;
  propertiesClasses?: TBaseTokenCardPropertiesClasses;
  prettifyLoadingProps?: TBaseTokenCardPrettifyLoadingProps;
};

export type TBaseTokenCardPropertiesClasses = {
  balanceClasses: TBalanceCardPropertiesClasses;
  image: string;
};

export type TBaseTokenCardPrettifyLoadingProps = {
  balance: boolean;
  image: boolean;
};

export const BaseNavBarTokenCard = ({
  balance,
  imageProperties,
  propertiesClasses,
  prettifyLoadingProps,
}: TTokenProps) => {
  return (
    <>
      <BalanceCard
        value={balance}
        propertyClasses={propertiesClasses?.balanceClasses}
        prettifyLoading={prettifyLoadingProps?.balance}
      ></BalanceCard>
      <ImageCard
        value={imageProperties.value}
        imageProperties={imageProperties}
        propertyClasses={propertiesClasses?.image}
        prettifyLoading={prettifyLoadingProps?.image}
      ></ImageCard>
    </>
  );
};
