export const addition1 = () => {
    const term1 = Math.floor(Math.random() * 10);
    const term2 = Math.floor(Math.random() * 10);
    const answer = term1 + term2;

    return {
        values: [term1, '+', term2, '=', answer],
        unknownIndex: 4,
    };
};

export const addition2 = () => {
    const term1 = Math.floor(Math.random() * 10);
    const term2 = Math.floor(Math.random() * 10);
    const answer = term1 + term2;

    return {
        values: [term1, '+', term2, '=', answer],
        unknownIndex: [0, 2, 4][Math.floor(Math.random() * 3)],
    };
};

export const multiplication1 = () => {
    const term1 = Math.floor(Math.random() * 10);
    const term2 = Math.floor(Math.random() * 10);
    const answer = term1 * term2;

    return {
        values: [term1, '\u00d7', term2, '=', answer],
        unknownIndex: 4,
    };
};

export const multiplication2 = () => {
    const term1 = Math.floor(Math.random() * 9) + 1;
    const term2 = Math.floor(Math.random() * 9) + 1;
    const answer = term1 * term2;

    return {
        values: [term1, '\u00d7', term2, '=', answer],
        unknownIndex: [0, 2, 4][Math.floor(Math.random() * 3)],
    };
};
