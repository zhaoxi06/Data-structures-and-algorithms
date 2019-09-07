/**
 * 用栈来判断一个算术表达式中的括号是否匹配。
 */

function Stack(){
    this.dataStore = [];
    this.push = push;
    this.pop = pop;
    this.length = length;
}

function push(ele){
    this.dataStore.push(ele);
}

function pop(){
    return this.dataStore.pop();
}

function length(){
    return this.dataStore.length;
}

function match(expression){
    let s = new Stack();
    let word = '';
    let popWord = '';
    for(let i=0;i<expression.length;i++){
        word = expression[i];
        if(word == '('){
            s.push(word);
        }else if(word == ')'){
            popWord = s.pop();
            if(popWord === undefined){
                return false;
            }
        }
    }
    if(s.length()>0){
        return false;
    }
    return true;
}

var exp = '2+3+1-4)';
print (match(exp));