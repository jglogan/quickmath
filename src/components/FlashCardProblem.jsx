import React from 'react'
import {useLocation} from 'react-router-dom';

import Box from 'Components/Box.jsx';
import {FlashCard} from 'Components/FlashCard.jsx';

export const FlashCardProblem = props => {
    const location = useLocation();

    const {generateProblem} = props;
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
        if (problem.answer === parseInt(answer)) {
            setAnswer('');
            setFeedback('Correct!');
            props.onAnswer && props.onAnswer(true);
            setProblem(generateProblem());
        }
        else {
            setAnswer('');
            if (props.onAnswer && props.onAnswer(false)) {
                setFeedback('Try Another');
                setProblem(generateProblem());
            }
            else {
                setFeedback('Try Again');
            }
        }
    };

    React.useEffect(() => {
        setProblem(generateProblem());
    }, [location]);

    return (
        <Box gap='10px'>
            <FlashCard onSubmit={checkAnswer}>
                {problem.layout && problem.layout(answer, validateInput) || null}
            </FlashCard>

            <h3>{feedback}</h3>
        </Box>
    );
};

export default FlashCardProblem;
