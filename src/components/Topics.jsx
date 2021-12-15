import React from 'react'

import Box from 'Components/Box.jsx';

import FlashCardProblem from 'Components/FlashCardProblem.jsx';
import {FlashCardSquareText, FlashCardText, FlashCardUnknown} from './FlashCard.jsx';

const threeSquareLayout = (values, unknownIndex) => {
    return (userAnswer, validateInput) => (
        <Box direction='row'>
            {values.map((value, index) => {
                if (index === unknownIndex) {
                    return <Box key={index}><FlashCardUnknown value={userAnswer} onChange={validateInput} placeholder='?' autoFocus /></Box>;
                }
                else {
                    return <Box key={index}><FlashCardSquareText>{'' + value}</FlashCardSquareText></Box>;
                }
            })}
        </Box>    
    );
};

const leftSideLayout = (leftSide, scale) => {
    return (userAnswer, validateInput) => (
        <Box direction='row'>
            <Box><FlashCardText scale={0.75}>{'' + leftSide}</FlashCardText></Box>
            <Box><FlashCardSquareText scale={0.75}>=</FlashCardSquareText></Box>
            <Box><FlashCardUnknown value={userAnswer} onChange={validateInput} scale={0.8} placeholder='?' autoFocus /></Box>
        </Box>    
    );
};

const addition1 = () => {
    const term1 = Math.floor(Math.random() * 10);
    const term2 = Math.floor(Math.random() * 10);
    const answer = term1 + term2;
    const values = [term1, '+', term2, '=', answer];
    const unknownIndex = 4;

    return {
        layout: threeSquareLayout(values, unknownIndex),
        answer: values[unknownIndex],
    };
};

const addition2 = () => {
    const term1 = Math.floor(Math.random() * 10);
    const term2 = Math.floor(Math.random() * 10);
    const answer = term1 + term2;
    const values = [term1, '+', term2, '=', answer];
    const unknownIndex = [0, 2, 4][Math.floor(Math.random() * 3)];

    return {
        layout: threeSquareLayout(values, unknownIndex),
        answer: values[unknownIndex],
    };
};

const multiplication1 = () => {
    const term1 = Math.floor(Math.random() * 10);
    const term2 = Math.floor(Math.random() * 10);
    const answer = term1 * term2;
    const values = [term1, '\u00d7', term2, '=', answer];
    const unknownIndex = 4;

    return {
        layout: threeSquareLayout(values, unknownIndex),
        answer: values[unknownIndex],
    };
};

const multiplication2 = () => {
    const term1 = Math.floor(Math.random() * 9) + 1;
    const term2 = Math.floor(Math.random() * 9) + 1;
    const answer = term1 * term2;
    const values = [term1, '\u00d7', term2, '=', answer];
    const unknownIndex = [0, 2, 4][Math.floor(Math.random() * 3)];

    return {
        layout: threeSquareLayout(values, unknownIndex),
        answer: values[unknownIndex],
    };
};

const greatestCommonDivisor = () => {
    const primes = [2, 3, 5, 7];
    const gcd = Math.floor(Math.random() * 9) + 1;
    const index = Math.floor(Math.random() * primes.length);
    const factor1 = primes[index] * gcd;
    primes.splice(index, 1);
    const factor2 = primes[Math.floor(Math.random() * primes.length)] * gcd;

    return {
        layout: leftSideLayout(`GCD(${factor1}, ${factor2})`, 0.75),
        answer: gcd,
    };
};

const leastCommonMultiple = () => {
    const computeGcd = (factor1, factor2) => {
        const computeGcdRecursive = (a, b) => {
            if (b === 0) {
                return a;
            }

            return computeGcdRecursive(b, a % b);
        };

        const [a, b] = Math.abs(factor1) > Math.abs(factor2) ? [factor1, factor2] : [factor2, factor1];
        return computeGcdRecursive(a, b);
    };

    const factor1 = Math.floor(Math.random() * 8) + 2;
    let factor2;
    do {
        factor2 = Math.floor(Math.random() * 8) + 2;
    } while (factor2 === factor1);

    const gcd = computeGcd(factor1, factor2);
    const lcm = factor1 * factor2 / gcd;

    return {
        layout: leftSideLayout(`LCM(${factor1}, ${factor2})`, 0.75),
        answer: lcm,
    };
};

export const topics = [
    {
        title: 'Level 1 Addition',
        key: 'addition-1',
        generateComponent: onAnswer => <FlashCardProblem generateProblem={addition1} onAnswer={onAnswer}/>,
    },
    {
        title: 'Level 2 Addition',
        key: 'addition-2',
        generateComponent: onAnswer => <FlashCardProblem generateProblem={addition2} onAnswer={onAnswer}/>,
    },
    {
        title: 'Level 1 Multiplication',
        key: 'multiplication-1',
        generateComponent: onAnswer => <FlashCardProblem generateProblem={multiplication1} onAnswer={onAnswer}/>,
    },
    {
        title: 'Level 2 Multiplication',
        key: 'multiplication-2',
        generateComponent: onAnswer => <FlashCardProblem generateProblem={multiplication2} onAnswer={onAnswer}/>,
    },
    {
        title: 'Greatest Common Divisor',
        key: 'gcd',
        generateComponent: onAnswer => <FlashCardProblem generateProblem={greatestCommonDivisor} onAnswer={onAnswer}/>,
    },
    {
        title: 'Least Common Multiple',
        key: 'lcm',
        generateComponent: onAnswer => <FlashCardProblem generateProblem={leastCommonMultiple} onAnswer={onAnswer}/>,
    },
];

topics.forEach((topic, index) => {
    if (!index) {
        topic.path = '/';
    }
    else {
        topic.path = `/${topic.key}`;
    }
});

export default topics;
