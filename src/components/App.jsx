import React from 'react'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';

import Box from './Box.jsx';
import TopicList from 'Components/TopicList.jsx';
import topics from 'Components/Topics.jsx';

const App = props => {
    return (
        <Router>
            <Box direction='row' flex='1' height='100%'>
                <Box as='nav' height='100%' align='right'>
                    <h3>Topics</h3>
                    <Box flex='1' justify='start' overflow='scroll'>
                        <TopicList topics={topics} />
                    </Box>
                </Box>
                <Box flex='1'>
                    <Routes>
                        {topics.map(topic => <Route key={topic.path} path={topic.path} element={topic.component} />)}
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
