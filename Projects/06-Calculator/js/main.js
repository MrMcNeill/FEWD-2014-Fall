var $calculator;
var $button;
var $display;

var currentValue = 0;
var currentOperator = "";
var currentInput = "";
var lastInput = "";
var lastPress = ";"
var operators = ["+", "-", "*", "/"];
var hasOperated = false;
var hasInput = false;
var hasCalculated = false;


/* waits for document to be parsed and rendered before acting */

$(document).ready(function() {
	//Cache jquery objects (so you arent constantly pulling the page over and over with each click)
	$calculator = $(".calculator");
	$button = $(".button");
	$display = $(".display");


	//Bind events

	$button.on("click",onButtonClick);


	//
	reset();
});

function onButtonClick(e) {

	var $target = $(this);
	var buttonValue = $target.text().toLowerCase();
	var buttonCharCode = buttonValue.charCodeAt(0);
	

	//replace operator's special chargs with real operators

	if (buttonCharCode === 247) {

		buttonValue = "/";

		}
	else if (buttonCharCode === 215) {

		buttonValue = "*";

	}

	//Delegate button action

	if (buttonValue == "c"){

		reset();

	}else if (buttonValue === "="){
		calculateValue();
	}else if (operators.indexOf(buttonValue) > -1) {
		setOperator(buttonValue);
	}else{
		appendInput(buttonValue);
	}
	}


	function reset() {
		currentValue = 0;
		currentOperator = "";
		currentInput = "";
		lastInput = "";
		lastPress = "";
		hasOperated = false;
		hasInput = false;
		hasCalculated = false;


		//Update display

		updateDisplay(currentValue);



	}

		function appendInput(input){
			//guard against multiple decimals

			if (input === "." && currentInput.indexOf(".") > -1) {
				return;
			} else
			//if last press is operator
			if (lastPress === "operator") {
				currentInput  = input;
			}else{
				currentInput += input;
			}

			// Remove leading zeros
			if (currentInput.length > 1 && currentInput.slice(0,1) && currentInput.slice(0,1) === "0" && currentInput.slice(1,1) !== "." ){
				currentInput = currentInput.slice(1, currentInput.length);
			}

			//Makre decimals all have leading zero
			if (currentInput.slice(0,1) === "."){
				currentInput = "0" + currentInput;
			}

			lastPress = "digit";
			hasInput = "true";
			hasCalculated = false;

			//updates current display

			updateDisplay(currentInput);

		}



		
		//set operator
		function setOperator (operator) {
			//first, calculate if input-operator-input
			if (hasOperated && lastPress !== "operator") {
				calculateValue();
			}

			currentOperator = operator;
			currentValue = parseFloat(currentInput);

			//make sure it is a real number

			if (isNaN(currentValue)){

				currentValue = 0;
			}

			lastPress = "operator";
			hasOperated = true;
			hasInput = false;
			hasCalculated = false;

		}


		function calculateValue() {
			var input;

			//if we have already calcuated but user continues to press equal sign do not square

		if (hasCalculated){
			input = parseFloat(lastInput);
		} else {
			input = parseFloat(currentInput);
			lastInput = input;
		}

		//do calculation

		switch (currentOperator) {

			case "+":
				currentValue += input;
				break;

			case "-":
				currentValue -= input;
				break;

			case "*":
				currentValue *= input;
				break;

			case "/":
				currentValue /= input;
				break;
			
			default:
				break;
		}

		//update applciation status state
		lastPress = "operator"
		hasInput = false;
		hasCalculated = true;


		//update display
		updateDisplay(currentValue);
		currentInput = currentValue.toString();
	}

	//Uppdate the display

		function updateDisplay(value) {
			console.log(value);			
			$display.val(value);
		}