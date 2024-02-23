import { ImageProps } from "../cards/value-cards/ImageCard";

export interface CardClasses {
  card?: string;
  value?: string;
}

export interface IsPrettyLoading {
  classes?: string;
  message?: string;
}

export interface ValueCardConfigProps {
  isRendering?: boolean;
  classes?: CardClasses;
  isPrettyLoading?: IsPrettyLoading;
  // isPrettyLoading?: boolean;
}

export interface ImageValueCardConfigProp extends ValueCardConfigProps {
  imageProperties?: ImageProps;
}

export interface TokenCardValuesConfigProps {
  balanceConfigProps?: ValueCardConfigProps;
  imageConfigProps?: ImageValueCardConfigProp;
  nameConfigProps?: ValueCardConfigProps;
  descriptionConfigProps?: ValueCardConfigProps;
  addressConfigProps?: ValueCardConfigProps;
  isTradeableConfigProps?: ValueCardConfigProps;
  maxMintAmountConfigProps?: ValueCardConfigProps;
}

export interface TokenCardConfigProps {
  isRendering?: true;
  cardClasses?: string;
  valuesProps?: TokenCardValuesConfigProps;
  isPrettyLoading?: IsPrettyLoading;
}

export interface TokenGroupCardConfigProps {
  isRendering: boolean;
  cardClasses?: CardClasses;
  address?: ValueCardConfigProps;
  isPrettyLoading?: IsPrettyLoading;
  tokenCardConfigProps: TokenCardConfigProps;
}
