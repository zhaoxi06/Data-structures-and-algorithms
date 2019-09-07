/**
 * 将n个人围成一圈，并且第m个人会被杀掉，计算一圈人中哪几个人最后会存活
 * @param {*} element 
 */

function Node(element){
    this.element = element;
    this.next = null;
}

function LList(){
    this.head = new Node('head');
    this.head.next = this.head;
    this.insert = insert;
    this.remove = remove;
    this.find = find;
    this.display = display;
}

function find(item){
    let currentNode = this.head;
    while(currentNode.element !== item){
        currentNode = currentNode.next;
    }
    return currentNode;
}

function previous(item){
    let current = this.head;
    while(current.next.element !== item ){
        current = current.next;
    }
    return current;
}

function insert(ele, item){
    let newNode = new Node(ele);
    let current = find(item);
    newNode.next = current.next;
    current.next = newNode;
}

function remove(ele){
    let previousNode = previous(ele);
    previousNode.next = previousNode.next.next;
}

function display(){
    let elements = [];
    let current = this.head.next;
    while(current !== null){
        elements.push(current.element);
        current = current.next;
    }
    return elements.join(' ');
}

let numbers = new LList();
numbers.insert(1, 'heade');
numbers.insert(2, 1);
numbers.insert(3, 2);
numbers.insert(4, 3);
console.log(numbers.display());