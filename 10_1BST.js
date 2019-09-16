function Node(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show(){
    return this.data;
}

function BST(){
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.preOrder = preOrder;
    this.postOrder = postOrder;
    this.getMin = getMin;
    this.getMax = getMax;
    this.find = find;
    this.remove = remove;
}

function insert(data){
    var n = new Node(data, null, null);
    if(this.root === null){
        this.root = n;
    }else{
        var current = this.root;
        var parent;
        while(true){
            parent = current;
            if(current.data > data){
                current = current.left;
                if(current === null){
                    parent.left = n;
                    break;
                }
            }else{
                current = current.right;
                if(current === null){
                    parent.right = n;
                    break;
                }
            }
        }
    }
}

//中序遍历
function inOrder(node){
    if(node !== null){
        inOrder(node.left);
        console.log(node.show() + ' ');
        inOrder(node.right);
    }
}

//先序遍历
function preOrder(node){
    if(node !== null){
        console.log(node.show() + ' ');
        preOrder(node.left);
        preOrder(node.right);
    }
}

//后序遍历
function postOrder(node){
    if(node !== null){
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show() + ' ');
    }
}

//查找最小值
function getMin(current){
    while(current.left !== null){
        current = current.left;
    }
    return current;
}

function getMax(current){
    while(current.right !== null){
        current = current.right;
    }
    return current;
}

function find(data){
    var current = this.root;
    while(current !== null){
        if(current.data === data){
            return current;
        }else if(current.data > data){
            current = current.left;
        }else{
            current = current.right;
        }
    }
    return null;
}

function remove(data){
    root = removeNode(this.root, data);
}

function removeNode(node, data){
    if(node === null){
        return null;
    }
    if(data === node.data){
        if(node.left===null && node.right===null){
            return null;
        }
        if(node.left === null){
            return node.right;
        }
        if(node.right === null){
            return node.left;
        }
        var tempNode = getMin(node.right);  //待删除的节点有两个子节点，删除后，用右子树的最小值取代删除的这个位置
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    }else if(data < node.data){
        node.left = removeNode(node.left, data);
        return node;
    }else{
        node.right = removeNode(node.right, data);
        return node;
    }
}

var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(20);
nums.insert(17);
nums.insert(21);
// console.log("Inorder traversal: ");
// inOrder(nums.root);
// console.log("Prevorder traversal: ");
// preOrder(nums.root);
// console.log("Postorder traversal: ");
// postOrder(nums.root);
// var min = nums.getMin(nums.root);
// console.log('Th minimum value of the BST is: ' + min);
// var max = nums.getMax(nums.root);
// console.log('Th maximum value of the BST is: ' + max);
// var value = 100;
// var found = nums.find(value);
// if(found !== null){
//     console.log("Found " + value + " in the BST");
// }else{
//     console.log(value + " was not found in the BST");
// }
// nums.remove(16);
// console.log("Inorder traversal remove: ");
// inOrder(nums.root);
