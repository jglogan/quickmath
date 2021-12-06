import React from 'react'
import {useLocation} from 'react-router-dom';
import Box from './Box.jsx';
import {FlashCard, FlashCardText, FlashCardUnknown} from './FlashCard.jsx';

export const BasicProblem = props => {
    const location = useLocation();

    const problemGenerator = props.problemGenerator || (() => ({ values: [2, '+', 2, '=', 4], unknownIndex: 4}));
    const [answer, setAnswer] = React.useState('');
    const [problem, setProblem] = React.useState({values: []});
    const [feedback, setFeedback] = React.useState('\u00a0');

    const validateInput = e => {
        const input = e.target.value;
        if (input === '' || /\d{1,2}/.test(input)) {
            setAnswer(input);
        }
    };

    const checkAnswer = e => {
        e.preventDefault();
        if (problem.values[problem.unknownIndex] === parseInt(answer)) {
            setAnswer('');
            setFeedback('Correct!');
            setProblem(problemGenerator());
        }
        else {
            setAnswer('');
            setFeedback('Try Again');
        }
    };

    React.useEffect(() => {
        console.log('location changed', location);
        setProblem(problemGenerator());
    }, [location]);

    return (
        <Box gap='10px'>
            <FlashCard onSubmit={checkAnswer}>
                {problem.values.map((value, index) => {
                    if (index === problem.unknownIndex) {
                        return <FlashCardUnknown  key={index} placeholder='?' autoFocus value={answer} onChange={validateInput} />;
                    }
                    else {
                        return <FlashCardText key={index} >{'' + value}</FlashCardText>
                    }
                })}
            </FlashCard>
            <h3>{feedback}</h3>
        </Box>
    );
};

export default BasicProblem;
