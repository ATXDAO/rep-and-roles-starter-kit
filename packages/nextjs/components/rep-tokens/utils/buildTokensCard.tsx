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
  if (!value) return {} as BigIntCardProps;

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
  if (!value) return {} as StringCardProps;

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
  if (!value) return {} as ImageCardProps;

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
  if (!token) return {} as TokenCardProps;

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
  } as TokenCardProps;
}

export function buildTokenCards(tokens: Token[], address?: string, tokenCardProps?: TokenCardConfigProps) {
  const arr = [];

  for (let i = 0; i < tokens.length; i++) {
    arr.push(buildTokenCard(tokens[i], address, tokenCardProps));
  }

  return arr;
}
