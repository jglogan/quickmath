import styled from 'styled-components'

export const Button = styled.button`
    display: inline-block;
    padding: 0.5rem 1.75rem;
    border: 4px solid white;
    margin: 0 0.3rem 0.3rem 0;
    border-radius: 0.5rem;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 300;
    font-size: 1.5rem;
    background-color: transparent;
    color: white;
    text-align: center;
    transition: all 0.2s;

    &:hover {
        color: black;
        background-color: white;
    }

    @media all and (max-width:30em) {
        display: block;
        margin: 0.4em auto;
    }
}`;

export default Button;