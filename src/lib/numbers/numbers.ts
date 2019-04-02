const numberFormat = new Intl.NumberFormat('ru');

export const toNumberFormat = (n: number): string =>
    numberFormat.format(n);
