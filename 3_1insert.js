/**
 * 增加一个向列表中插入元素的方法，该方法只在待茶元素大于列表中的所有元素时才执行插入操作。这里的大于有多重含义，
 * 对于数字，它是指数值上的大小，对于字母，它是指字母表中出现的先后顺序。
 */
function List(){
    this.dataSource = [];
    this.append = append;
    this.insert = insert;
    this.toString = toString;
}

function append(ele){
    this.dataSource.push(ele);
}

function insert(ele, after){
    var newArr = [].concat(this.dataSource);
    newArr.sort((a, b) => a-b);
    var max = newArr[newArr.length-1];
    print ('max:' + max);
    if(ele > max){
        var afterAt = this.dataSource.indexOf(after);
        if(afterAt>-1){
            this.dataSource.splice(afterAt+1, 0, ele);
        }else{
            print ('error')
        }
    }else{
        print ('after < max');
    }
}

function toString(){
    for(var i =0;i<this.dataSource.length;i++){
        print (this.dataSource[i]);
    }
}

var names = new List();
names.append(12);
names.append(3);
names.append(2);
names.append(68);
names.append(54);
names.insert(100, 3);
names.toString();