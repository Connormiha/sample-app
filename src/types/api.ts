export interface IServiceItem {
    id: string;
    title: string;
    description?: string;
    link: string;
    promocode?: string;
}

export interface IBalanceInfo {
    balance: number;
    next_payout: number;
    currency: 'rub' | 'usd' | 'eur';
}
