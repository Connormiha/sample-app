export interface IServiceItem {
    id: string;
    title: string;
    description?: string;
    link: string;
    promocode?: string;
}

export type ICurrency = 'rub' | 'usd' | 'eur';

export interface IBalanceInfo {
    balance: number;
    next_payout: number;
    currency: ICurrency;
}
