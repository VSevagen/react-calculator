import React from "react";
import {evaluate} from "mathjs";

import styled from "styled-components";

const operations = [
  {
    operator: "AC",
    symbol: "AC"
  },
  {
    operator: "+",
    symbol: "+",
  },
  {
    operator: "-",
    symbol: "-"
  },
  {
    operator: "/",
    symbol: "%"
  },
  {
    operator: "*",
    symbol: "x"
  },
  {
    operator: "=",
    symbol: "="
  }
]

const numbers = [1,2,3,4,5,6,7,8,9,0];

/*
* Keypad component
* @props {displayNum} displayNum - number displayed on calculator
* @props {accumulator} accumulator - ref object containing the array of numbers and operators to be evaluated
* @props {setDisplayNum} setDisplayNum - function to set state value, displayNum
*/
const Keypad = (props) => {
  const {setDisplayNum, accumulator, setCurrent} = props;

  const handleNumber = (event) => {
    accumulator.current.push(event.target.value);
    setCurrent(accumulator.current.join(""));
  }

  const handleOperation = (event) => {
    if(event.target.value === "=") {
      let output = accumulator.current.join("");
      accumulator.current = [];
      accumulator.current.push(evaluate(output));
      setDisplayNum(evaluate(output));
      setCurrent(evaluate(output));
    }

    if(event.target.value === "AC") {
      setDisplayNum(0);
      setCurrent(0);
      accumulator.current = [];
    }

    if (event.target.value !== "=" && event.target.value !== "AC") {
      accumulator.current.push(event.target.value);
      setCurrent(accumulator.current.join(""));
    }

    if (event.target.value === "AC") {
      setCurrent(0);
    }
  }

  return(
    <div>
      {/* The below container will render the operation buttons */}
      <Container>
        {operations.map((operation) => {
          return(
            <OperationButton
              key={operation.symbol}
              type="submit"
              value={operation.operator}
              onClick={handleOperation}
            >
              {operation.symbol}
            </OperationButton>
          )
        })}
      </Container>
        {/* The below container will render the number buttons */}
      <Container>
        {numbers.map((number) => {
          return(
            <NumberButton
              key={number}
              type="submit"
              onClick={handleNumber}
              value={number}
            >
              {number}
            </NumberButton>
          )
        })}
      </Container>
    </div>
  )
}

const Container = styled.section`
display: grid;
grid-template-columns: repeat(3, 1fr);
`;

const Button = styled.button`
border: none;
font-size: 1.5em;
padding: 0.5em 0.7em;
border: 0.5px solid black;
`;

const NumberButton = styled(Button)`
color: white;
background-color: #484a48;
grid-column-end: ${
    props => props.value === 0
    ? "span 3" : "span 1"
};
:hover {
	background-color: #3b3d3b;
}
`

const OperationButton = styled(Button)`
color: white;
background-color: #d4820f;
:hover {
	background-color: #b8710d;
}
`;

export default Keypad;