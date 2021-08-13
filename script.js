let result = document.querySelector("#results h1");
let a = [];
let b =[];
let operator;
let operations = {"add": (a,b)=>a+b, "substract": (a,b)=>a-b, "multiply": (a,b)=>a*b, "divide": (a,b)=>a/b};
let numbers = {"zero":0,"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7,"eight":8, "nine":9};
let keycodes ={96:"zero",97:"one", 98:"two", 99:"three", 100:"four", 101:"five", 102:"six", 103:"seven",104:"eight", 105:"nine", 107:"add", 109:"substract", 106:"multiply", 111:"divide", 110:"dot", 46:"clear", 8:"backspace", 13:"equal"}

let buttons = document.querySelectorAll(".buttons");
buttons.forEach(button => button.addEventListener("click", operate));

//keypad support
document.addEventListener("keydown", function(e){operate(e, keycodes[e.keyCode])});
//button highlight on keypad press
document.addEventListener("keydown", function(e){highlight(e, keycodes[e.keyCode], true)});
document.addEventListener("keyup", function(e){highlight(e, keycodes[e.keyCode], false)});

function operate(e, id = this.id){
	if(id in numbers){
		currentArray().push(numbers[id]);
		result.textContent = currentArray().join().replaceAll(",","");
	}
	else if(id in operations && (a.length > 0 || typeof a === "number")){
		 operator = operations[id];
		 console.log("poop");
	}
	else if(id == "change-sign"){
		if(result.textContent.indexOf("-") == 0)
		{
			result.textContent = result.textContent.slice(1);
			if(!Array.isArray(a)) a *= -1;
			else currentArray().shift("-");
		}
		else 
		{ 
			result.textContent = "-"+result.textContent;
			if(!Array.isArray(a)) a *= -1;
			else currentArray().unshift("-");
		}
	}
	else if(id == "percentage" && parseFloat(result.textContent) != 0){
		if(operator==null){
			result.textContent = (Math.round(10**9*(parseFloat(result.textContent)))/10**11).toString();
			!Array.isArray(a) ? a /= 100 : a = result.textContent.split("");
		}
		else{
			operate(null, "equal");
			a /= 100;
			result.textContent = a.toString();
		}
	}
	else if(id == "dot" && result.textContent.indexOf(".") == -1){
		result.textContent = result.textContent + ".";
		currentArray().push(".");
	}
	else if(id == "equal" && b.length > 0){
		if(parseFloat(b.join().replaceAll(",","")) == 0 && operator == operations.divide){
			result.textContent = "Math ERROR";
			a = []
			b = [];
			operator = null;
		}
		console.log(a);
		console.log(b);
		Array.isArray(a) ? result.textContent = Math.round(operator(parseFloat(a.join().replaceAll(",","")), parseFloat(b.join().replaceAll(",","")))*10**11)/10**11 : Math.round(operator(a, parseFloat(b.join().replaceAll(",","")))*10**11)/10**11;
		a = parseFloat(result.textContent);
		b = [];
		operator = null;
	}
	else if(id == "clear"){
		result.textContent = "0";
		a = []
		b = [];
		operator = null;
	}
	else if(id == "backspace"){
		currentArray().pop();
		result.textContent = currentArray().join().replaceAll(",","");
	}
}

function currentArray(){
	return operator == null && Array.isArray(a) ?  a: b;
}

function highlight(e, id, turnOn){
	if(id != "equal"){
		turnOn ? document.getElementById(id).classList.add("grey-highlight"): document.getElementById(id).classList.remove("grey-highlight");
	}
	else{
		turnOn ? document.getElementById(id).classList.add("green-highlight"): document.getElementById(id).classList.remove("green-highlight");
	}
}