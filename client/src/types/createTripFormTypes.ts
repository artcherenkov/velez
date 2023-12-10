export enum ETransportType {
  ON_FOOT = "on-foot",
  CAR = "car",
  PUBLIC_TRANSPORT = "public-transport",
}

export const TransportTypeTitleMap = {
  [ETransportType.ON_FOOT]: "Пешком",
  [ETransportType.CAR]: "На машине",
  [ETransportType.PUBLIC_TRANSPORT]: "На общ. транспорте",
};

export type TCreateTripFormValues = {
  title: string;
  description: string;
  difficulty: number;
  price: number;
  transportType: ETransportType;
};
