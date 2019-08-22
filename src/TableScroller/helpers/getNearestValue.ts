export const getNearestValue = (values: number[], valueToMatch: number) =>
    values
        .map(val => ({
            val,
            diff: Math.abs(val - valueToMatch)
        }))
        .sort((a, b) => a.diff - b.diff)
        .map(({ val }) => val)[0];