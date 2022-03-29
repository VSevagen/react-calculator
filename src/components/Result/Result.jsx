import React, {Fragment} from "react";

import styled from "styled-components";

/*
* Output component of Calculator
* @props {Int} displayNum - output value of calculator
*/
const Result = (props) => {
  return (
    <Fragment>
      <CurrentWrapper>
        {props.current}
      </CurrentWrapper>
      <OutputWrapper>
        {props.displayNum}
      </OutputWrapper>
    </Fragment>
  )
}

const OutputWrapper = styled.div`
background-color: #2d2e2d;
color: white;
font-size: 2.8em;
padding: 5px 3px 5px 0;
text-align: right;
`;

const CurrentWrapper = styled(OutputWrapper)`
font-size: 1rem;
`;

export default Result;