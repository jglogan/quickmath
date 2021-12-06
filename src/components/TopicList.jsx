import React from 'react'
import {Link, useLocation} from 'react-router-dom';

import styled from 'styled-components'

import Box from './Box.jsx';

const ListContainer = styled.ul`
    padding: 0px;
    list-style-type: none;
`;

const ListItem = styled.li`
    margin: 0px;
    padding: 4px 20px 4px 4px;
    border-bottom: 1px solid gray;

    &.active {
        background-color: white;
        a {
            color: black;
        }
    }

    a {
        text-decoration-line: none;
        color: white;
    }
`;

const TopicList = props => {
    const location = useLocation();

    const renderTopic = (topic, index) => {
        const active = topic.path === location.pathname;
        return (
            <ListItem key={topic.path || 'index'} className={active ? 'active' : undefined}>
                <h4>
                    <Link to={topic.path}>{topic.title}</Link>
                </h4>
            </ListItem>
        );
    };

    return (
        <ListContainer>
            {props.topics.map(renderTopic)}
        </ListContainer>
    );
};

export default TopicList;

