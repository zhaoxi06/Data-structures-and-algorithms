/**
 * 中缀表达式转后缀表达式，并计算表达式的值
 */

function Stack(){
    this.dataStore = [];
    this.push = push;
    this.pop = pop;
    this.length = length;
    this.peek = peek;
    this.isEmpty = isEmpty;
    this.toString = toString;
}

function push(ele){
    this.dataStore.push(ele);
}

function pop(){
    return this.dataStore.pop();
}

function peek(){
    return this.dataStore[this.dataStore.length-1];
}

function isEmpty(){
    return this.dataStore.length === 0;
}

function length(){
    return this.dataStore.length;
}

function toString(){
    let concat = '';
    for(let i=0;i<this.dataStore.length;i++){
        concat += this.dataStore[i];
    }
    return concat;
}

function weight(str){
    switch(str){
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;       
    }
}

function expressionChange(expression){
    let now = '';
    let newExpress = [];
    let operator = new Stack();
    for( let i=0; i<expression.length;i++){
        now = expression[i];
        if(/\d/.test(now)){
            let str = '';
            while(/\d/.test(expression[i])){
                str += expression[i];
                i++;
            }
            newExpress.push(str);
            i--;
        }else if(/[+\-*\/]/.test(now)){
            ({operator, newExpress} = compare(now, operator, newExpress));
        }else if(now === '('){
            operator.push(now);
        }else if(now === ')'){
            ({operator, newExpress} = popOperator(operator, newExpress));
        }
    }
    while(!operator.isEmpty()){
        newExpress.push(operator.pop());
    }
    return newExpress;
}

function newIsDigit(now, newExpress){

}

function popOperator(operator, newExpress){
    if(operator.peek() === '('){
        operator.pop();
    }else{
        newExpress.push(operator.pop());
        ({operator, newExpress} = popOperator(operator, newExpress));
    }
    return {newExpress: newExpress, operator: operator};
}

function compare(now, operator, newExpress){
    if(operator.isEmpty()){
        operator.push(now);
    }else{
        let nowWeight = weight(now);
        let topWeight = weight(operator.peek());
        if(nowWeight > topWeight){
            operator.push(now);
        }else{
            newExpress.push(operator.pop());
            ({operator, newExpress} = compare(now, operator, newExpress));
        }
    }
    return {newExpress: newExpress, operator: operator};
}

function calculate(express){
    if(express.length>1){
        for(let i=0; i<express.length; i++){
            if(/[*+\-\/]/.test(express[i])){
                let first = express[i-2];
                let second = express[i-1];
                express.splice(i-2, 3, operator(first, second, express[i]));
                return calculate(express);
            }
        }
    }else{
        return express[0];
    } 
}

function operator(first, second, operator){
    switch(operator){
        case '*':
            return Number(first) * Number(second);
        case '/':
            return Number(first) / Number(second);
        case '+':
            return Number(first) + Number(second);
        case '-':
            return Number(first) - Number(second);
    }
}

var express = '20*(9+6/3-5)+4';
var suffixExpress = expressionChange(express)
console.log(suffixExpress.join(' '));
var result = calculate(suffixExpress);
console.log(result);