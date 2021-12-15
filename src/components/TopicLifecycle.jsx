import React from 'react'
import {useLocation} from 'react-router-dom';

import Box from 'Components/Box.jsx';

const createFixedProblemCountLifecycle = (problemCount, updatedCorrectAnswers, updatedRemainingProblems) => {
    const correctAnswers = updatedCorrectAnswers || 0;
    const remainingProblems = typeof updatedRemainingProblems === 'undefined' ? problemCount : updatedRemainingProblems;

    return {
        activeText: () => `${remainingProblems} problems left.`,
        completeText: () => `All done. You got ${correctAnswers} out of ${problemCount} problems correct.`,
        handleAnswer: isCorrect => {
            const updatedCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
            return createFixedProblemCountLifecycle(problemCount, updatedCorrectAnswers, remainingProblems - 1)
        },
        isComplete: () => remainingProblems === 0,
    };
};

export const TopicLifecycle = props => {
    const renderLifecycleState = () => {
        if (!lifecycleState) {
            return (
                <Box height='100%'>
                    <p>Solve {problemCount} problems.</p>
                    <button onClick={() => setLifecycleState(createFixedProblemCountLifecycle(problemCount))}>Start</button>
                </Box>
            );
        }
        else if (lifecycleState.isComplete()) {
            return (
                <Box height='100%'>
                    <p>{lifecycleState.completeText()}</p>
                    <button onClick={() => setLifecycleState(createFixedProblemCountLifecycle(problemCount))}>Try Again</button>
               </Box>
            );
        }
        else {
            return (
                <Box height='100%'>
                    {props.generateComponent(handleAnswer)}
                    <p>{lifecycleState.activeText()}</p>
                </Box>
            );
        }
    }

    const handleAnswer = isCorrect => {
        setLifecycleState(lifecycleState.handleAnswer(isCorrect));
        return true;
    };

    const location = useLocation();
    React.useEffect(() => {
        setLifecycleState();
    }, [location]);

    const problemCount = 10;
    const [lifecycleState, setLifecycleState] = React.useState();

    return renderLifecycleState();
};

export default TopicLifecycle;