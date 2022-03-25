import React from 'react';

import styled from 'styled-components'

const Result = (props) => {
    return(
        <Display>
            {props.displayNum}
        </Display>
    )
}

const Display = styled.div`
background-color: #2d2e2d;
color: white;
font-size: 2.8em;
padding: 5px 3px 5px 0;
text-align: right;
`;

export default Result;