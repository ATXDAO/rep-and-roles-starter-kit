import { ImageProps } from "../cards/value-cards/ImageCard";

export interface CardClasses {
  card?: string;
  value?: string;
}

export interface ValueCardConfigProps {
  isRendering?: boolean;
  classes?: CardClasses;
  isPrettyLoading?: boolean;
}

export interface ImageValueCardConfigProp extends ValueCardConfigProps {
  imageProperties: ImageProps;
}

export interface TokenCardValuesConfigProps {
  balanceProps?: ValueCardConfigProps;
  imageProps?: ImageValueCardConfigProp;
  nameProps?: ValueCardConfigProps;
  descriptionProps?: ValueCardConfigProps;
  addressProps?: ValueCardConfigProps;
}

export interface TokenCardConfigProps {
  isRendering: true;
  cardClasses: string;
  valuesProps: TokenCardValuesConfigProps;
  isPrettyLoading: true;
}

export interface TokenGroupCardConfigProps {
  isRendering: boolean;
  cardClasses: CardClasses;
  address?: ValueCardConfigProps;
  isPrettyLoading: boolean;
  tokenCardProps: TokenCardConfigProps;
}
