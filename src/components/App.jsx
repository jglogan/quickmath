import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Box from './Box.jsx';
import BasicProblem from 'Components/BasicProblem.jsx';
import TopicList from 'Components/TopicList.jsx';
import * as problems from 'Problems/problems.js';

const topics = [
    {
        title: 'Level 1 Addition',
        path: '/',
        component: <BasicProblem problemGenerator={problems.addition1} />,
    },
    {
        title: 'Level 2 Addition',
        path: '/addition-2',
        component: <BasicProblem problemGenerator={problems.addition2} />,
    },
    {
        title: 'Level 1 Multiplication',
        path: '/multiplication-1',
        component: <BasicProblem problemGenerator={problems.multiplication1} />,
    },
    {
        title: 'Level 2 Multiplication',
        path: '/multiplication-2',
        component: <BasicProblem problemGenerator={problems.multiplication2} />,
    },
];

const App = props => {
    return (
        <Router>
            <Box direction='row' basis='1' height='100%'>
                <Box as='nav' height='100%' align='right'>
                    <h3>Topics</h3>
                    <Box basis='1' justify='start' overflow='scroll'>
                        <TopicList topics={topics} />
                    </Box>
                </Box>
                <Box basis='1'>
                    <Routes>
                        {topics.map(topic => <Route key={topic.path} path={topic.path} element={topic.component} />)}
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
