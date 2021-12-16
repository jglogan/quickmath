import React from 'react'
import {useLocation} from 'react-router-dom';

import Box from 'Components/Box.jsx';

const createProblemCountLifecycle = (remainingCount, correctCount, incorrectCount, isInactive) => {
    return {
        initialText: () => `Solve ${remainingCount + correctCount + incorrectCount} problems.`,
        activeText: () => `${remainingCount} problems left.`,
        completeText: () => `All done. You got ${correctCount} out of ${correctCount + incorrectCount} problems correct.`,
        handleAnswer: isCorrect => {
            const updatedCorrectCount = correctCount + (isCorrect ? 1 : 0);
            const updatedIncorrectCount = incorrectCount + (isCorrect ? 0 : 1);
            return createFixedProblemCountLifecycle(remainingCount - 1, updatedCorrectCount, updatedIncorrectCount);
        },
        isActive: () => !isInactive,
        isComplete: () => remainingCount === 0,
    };
};

const createTimedLifecycle = (remainingMillis, correctCount, incorrectCount, onProgress, isInactive) => {
    const startMillis = Date.now();
    const boundedRemainingMillis = Math.max(0, remainingMillis);
    const fractionalMillis = boundedRemainingMillis % 1000;
    const durationMillis = fractionalMillis || 1000;

    let clearTimer = () => {};
    if (!isInactive && boundedRemainingMillis > 0) {
        const timeoutId = setTimeout(() => {
            onProgress(createTimedLifecycle(boundedRemainingMillis - durationMillis, correctCount, incorrectCount, onProgress));
        }, durationMillis);
        clearTimer = () => clearTimeout(timeoutId);
    }

    const remainingSeconds = parseInt(boundedRemainingMillis / 1000);
    return {
        cleanup: clearTimer,
        initialText: () => `Solve as many problems as you can in ${remainingSeconds} seconds.`,
        activeText: () => `${remainingSeconds} second${remainingSeconds === 1 ? '' : 's'} left.`,
        completeText: () => `All done. You got ${correctCount} out of ${correctCount + incorrectCount} problems correct.`,
        handleAnswer: isCorrect => {
            clearTimer();
            const elapsedMillis = Date.now() - startMillis;
            const updatedCorrectCount = correctCount + (isCorrect ? 1 : 0);
            const updatedIncorrectCount = incorrectCount + (isCorrect ? 0 : 1);
            return createTimedLifecycle(boundedRemainingMillis - elapsedMillis, updatedCorrectCount, updatedIncorrectCount, onProgress);
        },
        isActive: () => !isInactive,
        isComplete: () => boundedRemainingMillis === 0,
    };
};

export const TopicLifecycle = props => {
    const problemCount = 10;
    const durationSeconds = 60;
    const createLifecycle = isInactive => {
        //return createProblemCountLifecycle(problemCount, 0, 0, isInactive);
        return createTimedLifecycle(durationSeconds * 1000, 0, 0, setLifecycleState, isInactive);
    };

    const renderLifecycleState = () => {
        if (!lifecycleState) {
            return null;
        }
        else if (!lifecycleState.isActive()) {
            return (
                <Box height='100%'>
                    <p>{lifecycleState.initialText()}</p>
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
        return cleanup;
    }, []);

    const location = useLocation();
    React.useEffect(() => {
        cleanup();
        setLifecycleState(createLifecycle(true));
    }, [location]);

    const [lifecycleState, setLifecycleState] = React.useState(createLifecycle(true));
    return renderLifecycleState();
};

export default TopicLifecycle;