import React, {useState, useRef} from "react";

import styled from "styled-components";

import Keypad from "../Keypad";
import Result from "../Result";

/*
* Main component to be rendered
* @param {Int} displayNum - number to be displayed on calculator
* @param {Function} setDisplayNum - function used to set displayNum
* @param {Object} ref - object containing accumulator array to store numbers and operators
*/
const Calculator = () => {
  const [displayNum, setDisplayNum] = useState(0);
  const accumulator = useRef([]);
  return(
    <Wrapper>
      <Result displayNum={displayNum} />
      <Keypad
        displayNum={displayNum}
        setDisplayNum={setDisplayNum}
        accumulator={accumulator}
      />
    </Wrapper>
    )
}

const Wrapper = styled.section`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
border: 1px solid black;
border-radius: 5px;
`;

export default Calculator;