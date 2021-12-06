import React from 'react'

import styled, { css } from 'styled-components'

export const Box = styled.div`
    ${props => css`
        overflow: ${props.overflow || 'hidden'};
        display: ${props.display || 'flex'};
        flex-direction: ${props.direction || 'column'};
        flex: ${props.basis || '0 1 auto'};
        justify-content: ${props.justify || 'center'};
        align-items: ${props.align || 'center'};
        gap: ${props.gap || '0px'};
        height: ${props.height || 'auto'};
        width: ${props.width || 'auto'};
    `}
`;

export default Box;