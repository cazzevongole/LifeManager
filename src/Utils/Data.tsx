
export const trueFirstSorting = (a: boolean, b: boolean) => a === b ? 0 : a ? -1 : 1;

export const falseFirstSorting = (a: boolean, b: boolean) => a === b ? 0 : a ? 1 : -1;