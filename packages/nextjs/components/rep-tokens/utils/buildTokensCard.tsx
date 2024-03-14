import { TokenCardProps } from "../cards/token-card/TokenCard";
import { TokenGroupProps } from "../cards/token-group-card/TokenGroupCard";
import { BigIntCardProps } from "../cards/value-cards/BalanceCard";
import { ImageCardProps } from "../cards/value-cards/ImageCard";
import { StringCardProps } from "../cards/value-cards/StringCard";
import { Token } from "../hooks/Hooks";
import { ImageValueCardConfigProp, TokenCardConfigProps, ValueCardConfigProps } from "../types/Types";
import { TokenGroupCardConfigProps } from "../types/Types";

export function buildTokenGroupCard(config: TokenGroupCardConfigProps, tokenCards: TokenCardProps[], address?: string) {
  const tokenGroupCard: TokenGroupProps = {
    tokenCardsProps: tokenCards,
    cardClasses: config.cardClasses,
    addressProps: config?.address?.isRendering
      ? {
          value: address,
          classes: config?.address?.classes,
          isPrettyLoading: config?.isPrettyLoading,
        }
      : undefined,
    isPrettyLoading: config?.isPrettyLoading,
  };

  return tokenGroupCard;
}

export function buildBalanceCard(value?: bigint, configProps?: ValueCardConfigProps) {
  return (
    configProps?.isRendering
      ? {
          value,
          classes: configProps?.classes,
          isPrettyLoading: configProps?.isPrettyLoading,
        }
      : undefined
  ) as BigIntCardProps;
}

export function buildStringCard(value?: string, configProps?: ValueCardConfigProps) {
  return (
    configProps?.isRendering
      ? {
          value,
          classes: configProps?.classes,
          isPrettyLoading: configProps?.isPrettyLoading,
        }
      : undefined
  ) as StringCardProps;
}

export function buildImageCard(value?: string, configProps?: ImageValueCardConfigProp) {
  return (
    configProps?.isRendering
      ? {
          value,
          properties: configProps?.imageProperties,
          classes: configProps?.classes,
          isPrettyLoading: configProps?.isPrettyLoading,
        }
      : undefined
  ) as ImageCardProps;
}

export function buildTokenCard(token: Token, address?: string, tokenCardProps?: TokenCardConfigProps) {
  const obj: any = {};

  if (!token) return obj;

  if (tokenCardProps?.isPrettyLoading) obj.isPrettyLoading = tokenCardProps?.isPrettyLoading;

  if (tokenCardProps?.cardClasses) obj.cardClasses = tokenCardProps?.cardClasses;

  if (tokenCardProps?.valuesProps) {
    obj.valuesProps = {};

    if (tokenCardProps?.valuesProps?.balanceConfigProps)
      obj.valuesProps.balanceProps = buildBalanceCard(token.balance, tokenCardProps?.valuesProps?.balanceConfigProps);

    if (tokenCardProps?.valuesProps?.nameConfigProps)
      obj.valuesProps.nameProps = buildStringCard(token.name, tokenCardProps?.valuesProps?.nameConfigProps);

    if (tokenCardProps?.valuesProps?.descriptionConfigProps)
      obj.valuesProps.descriptionProps = buildStringCard(
        token.description,
        tokenCardProps?.valuesProps?.descriptionConfigProps,
      );

    if (tokenCardProps?.valuesProps?.imageConfigProps)
      obj.valuesProps.imageProps = buildImageCard(token.image, tokenCardProps?.valuesProps?.imageConfigProps);

    if (tokenCardProps?.valuesProps?.addressConfigProps)
      obj.valuesProps.addressProps = buildStringCard(address, tokenCardProps?.valuesProps?.addressConfigProps);

    if (tokenCardProps?.valuesProps?.isTradeableConfigProps)
      obj.valuesProps.isTradeableProps = buildStringCard(
        `Is Tradeable: ${token.properties.isTradeable}`,
        tokenCardProps?.valuesProps?.isTradeableConfigProps,
      );
    if (tokenCardProps?.valuesProps?.maxMintAmountConfigProps)
      obj.valuesProps.maxMintAmountProps = buildStringCard(
        `Max Mint Amount Per Tx: ${token.properties.maxMintAmountPerTx}`,
        tokenCardProps?.valuesProps?.maxMintAmountConfigProps,
      );
  }

  return obj;

  return {
    isPrettyLoading: tokenCardProps?.isPrettyLoading,
    cardClasses: tokenCardProps?.cardClasses,
    valuesProps: {
      balanceProps: buildBalanceCard(token.balance, tokenCardProps?.valuesProps?.balanceConfigProps),
      nameProps: buildStringCard(token.name, tokenCardProps?.valuesProps?.nameConfigProps),
      descriptionProps: buildStringCard(token.description, tokenCardProps?.valuesProps?.descriptionConfigProps),
      imageProps: buildImageCard(token.image, tokenCardProps?.valuesProps?.imageConfigProps),
      addressProps: buildStringCard(address, tokenCardProps?.valuesProps?.addressConfigProps),
      isTradeableProps: buildStringCard(
        `Is Tradeable: ${token.properties.isTradeable}`,
        tokenCardProps?.valuesProps?.isTradeableConfigProps,
      ),
      maxMintAmountProps: buildStringCard(
        `Max Mint Amount Per Tx: ${token.properties.maxMintAmountPerTx}`,
        tokenCardProps?.valuesProps?.maxMintAmountConfigProps,
      ),
    },
  };
}

export function buildTokenCards(tokens: Token[], address?: string, tokenCardProps?: TokenCardConfigProps) {
  const arr = [];

  for (let i = 0; i < tokens.length; i++) {
    arr.push(buildTokenCard(tokens[i], address, tokenCardProps));
  }

  return arr;
}
