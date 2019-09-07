/**
 * 数制间的相互转换
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

function mulBase(num, base){
    var s = new Stack();
    do {
        s.push(num % base);
        num = Math.floor(num / base);
    }while(num >0 );
    var converted = '';
    while(s.length()>0){
        converted += s.pop();
    }
    print (converted);
    return converted;
}

var num = 125;
var base = 8;
print ( num + " converted to base " + base + " " + mulBase(num, base));