export interface AppConfigModel {
  currency: AppCurrencyModel;
  paystackConfirmUrl: string;
  baseapi: string;
  path: string;
}


export interface AppCurrencyModel {
      symbol: string;
      code: string;
}

