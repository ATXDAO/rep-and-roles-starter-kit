import { BalanceCard } from "./BalanceCard";
import { TBalanceCardPropertiesClasses } from "./BalanceCard";
import { ImageCard } from "./ImageCard";
import { ImageProperties } from "./ImageCard";
import { StringCard } from "./StringCard";

type TTokenProps = {
  balance: bigint;
  imageProperties: ImageProperties;
  name: string;
  description: string;
  propertiesClasses?: TBaseTokenCardPropertiesClasses;
  prettifyLoadingProps?: TBaseTokenCardPrettifyLoadingProps;
};

export type TBaseTokenCardPropertiesClasses = {
  balanceClasses: TBalanceCardPropertiesClasses;
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

export type TBaseTokenCardRenderSettings = {
  renderBalance: boolean;
  renderImage: boolean;
  renderName: boolean;
  renderDescription: boolean;
};

export const BaseTokenCard = ({
  balance,
  imageProperties,
  name,
  description,
  propertiesClasses,
  prettifyLoadingProps,
}: TTokenProps) => {
  const renderBalance = true;
  const renderImage = true;
  const renderName = true;
  const renderDescription = true;

  return (
    <>
      {renderBalance ? (
        <BalanceCard
          value={balance}
          propertyClasses={propertiesClasses?.balanceClasses}
          prettifyLoading={prettifyLoadingProps?.balance}
        ></BalanceCard>
      ) : (
        <></>
      )}
      {renderImage ? (
        <ImageCard
          value={imageProperties.value}
          imageProperties={imageProperties}
          propertyClasses={propertiesClasses?.image}
          prettifyLoading={prettifyLoadingProps?.image}
        ></ImageCard>
      ) : (
        <></>
      )}
      {renderName ? (
        <StringCard
          value={name}
          propertyClasses={propertiesClasses?.name}
          prettifyLoading={prettifyLoadingProps?.name}
        ></StringCard>
      ) : (
        <></>
      )}
      {renderDescription ? (
        <StringCard
          value={description}
          propertyClasses={propertiesClasses?.description}
          prettifyLoading={prettifyLoadingProps?.description}
        ></StringCard>
      ) : (
        <></>
      )}
    </>
  );
};
