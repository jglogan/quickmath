import React from 'react'

import styled from 'styled-components'

import Box from './Box.jsx';

export const FlashCard = styled.form`
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4vmin;
    background: white;
    text: black;
    width: 60vmin;
    height: 36vmin;
    border-radius: 16px;
    color: black;
}`;

export const FlashCardUnknown = styled.input`
    width: ${props => `${props.scale * 10.0 || 10}vmin`};
    margin: 50% 0;
    text-align: center;
    align-items: center;
    border 1px solid lightgray;
    font-size: ${props => `${props.scale * 10.0 || 10}vmin`};
    font-family: Helvetica, Arial, sans-serif;
}`;

export const FlashCardSquareText = styled(Box)`
    width: ${props => `${props.scale * 10.0 || 10}vmin`};
    margin: 50% 0;
    justify-content: center;
    align-items: center;
    font-size: ${props => `${props.scale * 10.0 || 10}vmin`};
    font-family: Helvetica, Arial, sans-serif;
}}`;

export const FlashCardText = styled(Box)`
    justify-content: center;
    align-items: center;
    font-size: ${props => `${props.scale * 10.0 || 10}vmin`};
    font-family: Helvetica, Arial, sans-serif;
}}`;

