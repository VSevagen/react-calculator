import React, { useRef } from "react";

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
  const {setDisplayNum, displayNum, accumulator} = props;
  const ref = useRef({
    updateDisplay: true,
  });

	/*
	* Calculates the output base on the numbers and operator provided
	* @param {String} num_1 - string value of first number pressed
	* @param {String} num_2 - string value of second number pressed
	* @param {String} operator - mathematical operator to evaluate the 2 numbers
	*/
  const handleMathsOperation = (num_1, num_2, operator) => {
    switch(operator) {
      case "+":
        return parseInt(num_1) + parseInt(num_2);
          case "-":
            return parseInt(num_1) - parseInt(num_2);
          case "/":
            return parseInt(num_1) / parseInt(num_2);
          case "*":
            return parseInt(num_1) * parseInt(num_2);
    }
  }

	/*
	* Handles process to be followed after an operation button is pressed
	* @param {Object} event - returns bunch of information on the button pressed
	*/
  const handleOperation = (event) => {
    // When user pressed equal button, we'll proceed with calculation
    // of the output based on the values accumulated in the accumulator array
    if(event.target.value === "=") {
      let sum = 0;
      accumulator.current.push(displayNum);
      for(let i = 0;i < accumulator.current.length;i++) {
        if(
					accumulator.current[i] === "+" ||
          accumulator.current[i] === "-" ||
          accumulator.current[i] === "/" ||
          accumulator.current[i] === "*"
        ) {
          if(sum === 0) {
            sum = handleMathsOperation(accumulator.current[i-1], accumulator.current[i+1], accumulator.current[i]);
          } else {
            sum = handleMathsOperation(sum, accumulator.current[i+1], accumulator.current[i]);
          }
        }
      }
      // clearing accumulator since values have already been used
      accumulator.current = [];

      // show calculated sum
      setDisplayNum(sum);
    } else if (event.target.value === "AC") {
      // Reset displayNum, accumulator and updateDisplay to true;
      setDisplayNum(0);
      accumulator.current = [];
      ref.current.updateDisplay = true;
    } else {
      // Push the number chosen by the user and the following operator
      //  to the accumulator array.
      // Reset updateDisplay to true for displayNum to be updated with new numbers
      accumulator.current.push(displayNum, event.target.value);
      ref.current.updateDisplay = true;
    }
  }

	/*
	* Handles process to be followed after a number button is pressed
	* @param {Object} event - returns bunch of information on the button pressed
	*/
  const handleNumber = (event) => {
    if(ref.current.updateDisplay) {
      setDisplayNum(event.target.value);
      ref.current.updateDisplay = false;
    } else {
      setDisplayNum(displayNum.concat(event.target.value));
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
`

const OperationButton = styled(Button)`
color: white;
background-color: #d4820f;
`;

export default Keypad;