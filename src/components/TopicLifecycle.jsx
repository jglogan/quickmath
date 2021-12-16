import React from 'react'
import {useLocation} from 'react-router-dom';

import Box from 'Components/Box.jsx';

const createFixedProblemCountLifecycle = (remainingCount, correctCount, incorrectCount) => {
    return {
        activeText: () => `${remainingCount} problems left.`,
        completeText: () => `All done. You got ${correctCount} out of ${correctCount + incorrectCount} problems correct.`,
        handleAnswer: isCorrect => {
            const updatedCorrectCount = correctCount + (isCorrect ? 1 : 0);
            const updatedIncorrectCount = incorrectCount + (isCorrect ? 0 : 1);
            return createFixedProblemCountLifecycle(remainingCount - 1, updatedCorrectCount, updatedIncorrectCount);
        },
        isComplete: () => remainingCount === 0,
    };
};

const createTimedLifecycle = (remainingMillis, correctCount, incorrectCount, onProgress) => {
    const startMillis = Date.now();
    const boundedRemainingMillis = Math.max(0, remainingMillis);
    const fractionalMillis = remainingMillis % 1000;
    const durationMillis = fractionalMillis || 1000;

    let clearTimer = () => {};
    if (boundedRemainingMillis > 0) {
        const timeoutId = setTimeout(() => {
            onProgress(createTimedLifecycle(remainingMillis - durationMillis, correctCount, incorrectCount, onProgress));
        }, durationMillis);
        clearTimer = () => clearTimeout(timeoutId);
    }

    return {
        cleanup: clearTimer,
        activeText: () => `${parseInt(remainingMillis / 1000)} seconds left.`,
        completeText: () => `All done. You got ${correctCount} out of ${correctCount + incorrectCount} problems correct.`,
        handleAnswer: isCorrect => {
            clearTimer();
            const elapsedMillis = Date.now() - startMillis;
            const updatedCorrectCount = correctCount + (isCorrect ? 1 : 0);
            const updatedIncorrectCount = incorrectCount + (isCorrect ? 0 : 1);
            return createTimedLifecycle(remainingMillis - elapsedMillis, updatedCorrectCount, updatedIncorrectCount, onProgress);
        },
        isComplete: () => remainingMillis <= 0,
    };
};

export const TopicLifecycle = props => {
    const problemCount = 10;
    const durationSeconds = 10;
    const createLifecycle = () => {
        //return createFixedProblemCountLifecycle(problemCount, 0, 0);
        return createTimedLifecycle(durationSeconds * 1000, 0, 0, setLifecycleState);
    };

    const renderLifecycleState = () => {
        if (!lifecycleState) {
            return (
                <Box height='100%'>
                    <p>Solve as many problems correctly as you can in {durationSeconds} seconds.</p>
                    <button onClick={() => setLifecycleState(createLifecycle())}>Start</button>
                </Box>
            );
        }
        else if (lifecycleState.isComplete()) {
            return (
                <Box height='100%'>
                    <p>{lifecycleState.completeText()}</p>
                    <button onClick={() => setLifecycleState(createLifecycle())}>Try Again</button>
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

    const cleanup = () => {
        lifecycleState && lifecycleState.cleanup && lifecycleState.cleanup();
    };

    React.useEffect(() => {
        cleanup();
    }, []);

    const location = useLocation();
    React.useEffect(() => {
        cleanup();
        setLifecycleState();
    }, [location]);

    const [lifecycleState, setLifecycleState] = React.useState();

    return renderLifecycleState();
};

export default TopicLifecycle;