export const getNearestValue = (values: number[], valueToMatch: number) =>
    [ ...values ].sort((a, b) =>
        Math.abs(a - valueToMatch) - Math.abs(b - valueToMatch)
    )[0];
