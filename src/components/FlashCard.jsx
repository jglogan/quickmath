import React from 'react'

import styled from 'styled-components'

import Box from './Box.jsx';

export const FlashCard = styled.form`
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: white;
    text: black;
    width: 60vmin;
    height: 36vmin;
    border-radius: 8px;
    font-size: 8vmin;
    color: black;
}`;

export const FlashCardUnknown = styled.input`
    width: 10vmin;
    height: 10vmin;
    display: flex;
    text-align: center;
    align-items: center;
    border 1px solid lightgray;
    font-size: 8vmin;
    font-family: Helvetica, Arial, sans-serif;
}`;

export const FlashCardText = styled(Box)`
    width: 10vmin;
    height: 10vmin;
    display: flex;
    justify-content: center;
    align-items: center;
}`;

