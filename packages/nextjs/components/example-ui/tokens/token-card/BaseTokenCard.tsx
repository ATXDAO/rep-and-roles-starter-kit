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
  renderProps?: TBaseTokenCardRenderSettings;
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
  balance: boolean;
  image: boolean;
  name: boolean;
  description: boolean;
};

export const BaseTokenCard = ({
  balance,
  imageProperties,
  name,
  description,
  propertiesClasses,
  prettifyLoadingProps,
  renderProps = { balance: true, image: true, name: true, description: true },
}: TTokenProps) => {
  return (
    <>
      {renderProps.balance ? (
        <BalanceCard
          value={balance}
          propertyClasses={propertiesClasses?.balanceClasses}
          prettifyLoading={prettifyLoadingProps?.balance}
        ></BalanceCard>
      ) : (
        <></>
      )}
      {renderProps.image ? (
        <ImageCard
          value={imageProperties.value}
          imageProperties={imageProperties}
          propertyClasses={propertiesClasses?.image}
          prettifyLoading={prettifyLoadingProps?.image}
        ></ImageCard>
      ) : (
        <></>
      )}
      {renderProps.name ? (
        <StringCard
          value={name}
          propertyClasses={propertiesClasses?.name}
          prettifyLoading={prettifyLoadingProps?.name}
        ></StringCard>
      ) : (
        <></>
      )}
      {renderProps.description ? (
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
