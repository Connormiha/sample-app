const numberFormat = new Intl.NumberFormat('ru');

export const toNumberFormat = (n: number): string =>
    numberFormat.format(n);

export const toCommaFormat = (n: number): string =>
    n.toFixed(2).replace('.', ',');

export const toPercentFormat = (n: number): string =>
    `${toCommaFormat(n)}%`;

export const getProgressPercent = (done: number, total: number): number =>
    (done / total * 100) || 0;

const Kb = 1024;
const Mb = Kb * Kb;
const Gb = Kb * Kb * Kb;

export const toSizeFormat = (n: number): string => {
    if (n >= Gb) {
        return `${toNumberFormat(n / Gb)} Гб`;
    }

    if (n >= Mb) {
        return `${toNumberFormat(n / Mb)} Мб`;
    }

    if (n >= Kb) {
        return `${toNumberFormat(n / Kb)} Кб`;
    }

    return `${n} байт`;
};
