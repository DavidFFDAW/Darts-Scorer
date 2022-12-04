const initialValues = Array.from({ length: 20 }).map((_, ind) => ({ value: ind + 1 }));

const generateMultiplier = (multiplier, letter) => {
    return initialValues.map(item => {
        return {
            label: `${letter}${item.value}`,
            value: item.value * Number(multiplier),
        };
    });
};

const possibleValues = [...initialValues, { value: 25 }, ...generateMultiplier(2, 'D'), { label: 'D25', value: 50 }, ...generateMultiplier(3, 'T')];

const getMaximumNumberPossible = (turns = 3) => {
    return Math.max(...possibleValues.map(item => item.value)) * turns;
};

const getLabelOrValue = item => {
    return item.label || item.value;
};

const getCombinationPossible = points => {
    if (Number(points) <= 25) return [points];
    if (Number(points) > getMaximumNumberPossible()) return [];

    for (const firstLoop of possibleValues) {
        for (const secondLoop of possibleValues) {
            if (firstLoop.value + secondLoop.value === Number(points)) {
                return [getLabelOrValue(firstLoop), getLabelOrValue(secondLoop)];
            }
            for (const thirdLoop of possibleValues) {
                if (firstLoop.value + secondLoop.value + thirdLoop.value === Number(points)) {
                    return [getLabelOrValue(firstLoop), getLabelOrValue(secondLoop), getLabelOrValue(thirdLoop)];
                }
            }
        }
    }
};

const CombinationsService = {
    possibleValues,
    getMaximumNumberPossible,
    getCombinationPossible,
};

export default CombinationsService;
