import { TokenCardProps } from "../cards/token-card/TokenCard";
import { TokenGroupProps } from "../cards/token-group-card/TokenGroupCard";
import { BigIntCardProps } from "../cards/value-cards/BalanceCard";
import { Token } from "../hooks/Hooks";
import { TokenCardConfigProps, ValueCardConfigProps } from "../types/Types";
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

export function buildBalanceCard(value: bigint, configProps?: ValueCardConfigProps) {
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

export function buildTokenCard(token: Token, address?: string, tokenCardProps?: TokenCardConfigProps) {
  if (!token) return {} as TokenCardProps;

  return {
    isPrettyLoading: tokenCardProps?.isPrettyLoading,
    cardClasses: tokenCardProps?.cardClasses,
    valuesProps: {
      balanceProps: buildBalanceCard(token.balance, tokenCardProps?.valuesProps?.balanceConfigProps),
      nameProps: tokenCardProps?.valuesProps?.nameConfigProps?.isRendering
        ? {
            value: token.name,
            classes: tokenCardProps?.valuesProps?.nameConfigProps?.classes,
            isPrettyLoading: tokenCardProps?.valuesProps?.nameConfigProps?.isPrettyLoading,
          }
        : undefined,
      descriptionProps: tokenCardProps?.valuesProps?.descriptionConfigProps?.isRendering
        ? {
            value: token.description,
            classes: tokenCardProps?.valuesProps?.descriptionConfigProps?.classes,
            isPrettyLoading: tokenCardProps?.valuesProps?.descriptionConfigProps?.isPrettyLoading,
          }
        : undefined,
      imageProps: tokenCardProps?.valuesProps?.imageConfigProps?.isRendering
        ? {
            value: token.image,
            properties: tokenCardProps?.valuesProps?.imageConfigProps?.imageProperties,
            classes: tokenCardProps?.valuesProps?.imageConfigProps?.classes,
            isPrettyLoading: tokenCardProps?.valuesProps?.imageConfigProps?.isPrettyLoading,
          }
        : undefined,
      addressProps: tokenCardProps?.valuesProps?.addressConfigProps?.isRendering
        ? {
            value: address,
            classes: tokenCardProps?.valuesProps?.addressConfigProps?.classes,
            isPrettyLoading: tokenCardProps?.valuesProps?.addressConfigProps?.isPrettyLoading,
          }
        : undefined,
      isTradeableProps: tokenCardProps?.valuesProps?.isTradeableConfigProps?.isRendering
        ? {
            value: `Is Tradeable: ${token.properties.isTradeable}`,
            classes: tokenCardProps?.valuesProps?.isTradeableConfigProps?.classes,
            isPrettyLoading: tokenCardProps?.valuesProps?.isTradeableConfigProps?.isPrettyLoading,
          }
        : undefined,
      maxMintAmountProps: tokenCardProps?.valuesProps?.maxMintAmountConfigProps?.isRendering
        ? {
            value: `Max Mint Amount Per Tx: ${token.properties.maxMintAmountPerTx}`,
            classes: tokenCardProps?.valuesProps?.maxMintAmountConfigProps?.classes,
            isPrettyLoading: tokenCardProps?.valuesProps?.maxMintAmountConfigProps?.isPrettyLoading,
          }
        : undefined,
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
