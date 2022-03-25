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
box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
transition: box-shadow 0.5s ease-in-out;
:hover {
	box-shadow: rgba(17, 17, 26, 0.1)
	0px 8px 24px, rgba(17, 17, 26, 0.1)
	0px 16px 56px, rgba(17, 17, 26, 0.1)
	0px 24px 80px;
}
`;

export default Calculator;