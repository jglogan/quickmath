import React from 'react'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';

import Box from 'Components/Box.jsx';
import TopicLifecycle from 'Components/TopicLifecycle.jsx';
import TopicList from 'Components/TopicList.jsx';
import topics from 'Components/Topics.jsx';

//
//  TODO:
//    - Style buttons.
//    - Include topic description in initial text.
//    - Record score and report on completion.
//    - Record scores in local storage.
//    - Display best daily scores.
//    - Improve styling of initial and completion cards.
//    - Record missed problems.
//    - Get layout working on tablet and mobile.
//
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
                <Box flex='1' justify='start' height='100%'>
                    <Routes>
                        {topics.map(topic => <Route key={topic.path} path={topic.path} element={<TopicLifecycle generateComponent={topic.generateComponent} />} />)}
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
