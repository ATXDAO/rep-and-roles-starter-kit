import { BalanceCard } from "./BalanceCard";
import { ImageCard } from "./ImageCard";
import { StringCard } from "./StringCard";

type TTokenProps = {
  balance: bigint;
  image: string;
  name: string;
  description: string;
  propertiesClasses?: TBaseTokenCardPropertiesClasses;
  prettifyLoadingProps?: TBaseTokenCardPrettifyLoadingProps;
};

export type TBaseTokenCardPropertiesClasses = {
  balance: string;
  name: string;
  description: string;
  image: string;
};

export type TBaseTokenCardPrettifyLoadingProps = {
  balance: boolean;
  image: boolean;
  name: boolean;
  description: boolean;
};

export const BaseTokenCard = ({
  balance,
  image,
  name,
  description,
  propertiesClasses,
  prettifyLoadingProps,
}: TTokenProps) => {
  return (
    <>
      <BalanceCard
        value={balance}
        propertyClasses={propertiesClasses?.balance}
        prettifyLoading={prettifyLoadingProps?.balance}
      ></BalanceCard>
      <ImageCard
        value={image}
        propertyClasses={propertiesClasses?.image}
        prettifyLoading={prettifyLoadingProps?.image}
      ></ImageCard>
      <StringCard
        value={name}
        propertyClasses={propertiesClasses?.name}
        prettifyLoading={prettifyLoadingProps?.name}
      ></StringCard>
      <StringCard
        value={description}
        propertyClasses={propertiesClasses?.description}
        prettifyLoading={prettifyLoadingProps?.description}
      ></StringCard>
    </>
  );
};
