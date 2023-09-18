type TBalanceCardProps = {
  value: bigint;
  propertyClasses?: TBalanceCardPropertiesClasses;
  prettifyLoading?: boolean;
};

export type TBalanceCardPropertiesClasses = {
  container: string;
  balance: string;
};

export const BalanceCard = ({ value, prettifyLoading, propertyClasses }: TBalanceCardProps) => {
  return (
    <div className={propertyClasses?.container}>
      {prettifyLoading ? (
        value !== undefined ? (
          <p className={propertyClasses?.balance}>{Number(value)}</p>
        ) : (
          <p className={propertyClasses?.balance}>Loading Balance...</p>
        )
      ) : value !== undefined ? (
        <p className={propertyClasses?.balance}> {Number(value)} </p>
      ) : (
        <p className={propertyClasses?.balance}>0</p>
      )}
    </div>
  );
};
