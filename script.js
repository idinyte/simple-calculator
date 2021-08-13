let result = document.querySelector("#results h1");
let a = [];
let b = []; 
let operator;
let numbers = {"zero":0,"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7,"eight":8, "nine":9};
let operations = {"add": (a,b)=>a+b, "substract": (a,b)=>a-b, "multiply": (a,b)=>a*b, "divide": (a,b)=>a/b}

let buttons = document.querySelectorAll(".buttons");
buttons.forEach(button => button.addEventListener("click", operate));

function operate(){
	if(this.id in numbers){
		if(operator == null){
			a.push(numbers[this.id]);
			result.textContent = a.join().replaceAll(",","");
			console.log(typeof operator);
		}
		else{
			b.push(numbers[this.id]);
			result.textContent = b.join().replaceAll(",","");
			console.log(typeof a);
		}
	}
	else if(this.id in operations && (a.length > 0 || typeof a === "number")){
		 operator = operations[this.id];
	}
	else if(this.id == "change-sign"){
		if(result.textContent.indexOf("-") == 0)
		{
			result.textContent = result.textContent.slice(1);
			if(!Array.isArray(a)) a *= -1;
			else operator == null || !Array.isArray(a) ? a.shift("-"): b.shift("-");
		}
		else 
		{ 
			result.textContent = "-"+result.textContent;
			if(!Array.isArray(a)) a *= -1;
			else operator == null ? a.unshift("-"): b.unshift("-");
		}
	}
	else if(this.id == "percentage" && parseFloat(result.textContent) != 0){
		result.textContent = (parseFloat(result.textContent)/100).toString();
		if(!Array.isArray(a)) a /= 100;
		else operator == null ? (parseFloat(a.join().replaceAll(",",""))/100).split(""): (parseFloat(b.join().replaceAll(",",""))/100).split("");
	}
	else if(this.id == "dot" && result.textContent.indexOf(".") == -1){
		result.textContent = result.textContent + ".";
		operator == null ? a.push("."): b.push(".");
	}
	else if(this.id == "equal" && b.length > 0){
		Array.isArray(a) ? result.textContent = Math.round(operator(parseFloat(a.join().replaceAll(",","")), parseFloat(b.join().replaceAll(",","")))*100000)/100000 : result.textContent = Math.round(operator(a, parseFloat(b.join().replaceAll(",","")))*100000)/100000;
		a = parseFloat(result.textContent);
		b = [];
	}
	else if(this.id == "clear"){
		result.textContent = "0";
		a = []
		b = [];
		operator = null;
	}

	operator == null ? console.log(a): console.log(b);
}
