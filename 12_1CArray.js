function CArray(numElements){
    // this.dataStore = [];
    this.dataStore = JSON.parse(JSON.stringify(randomNums));
    this.pos = 0;
    this.numElements = numElements;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;
    // for(var i=0 ;i<this.numElements; i++){
    //     this.dataStore[i] = i;
    // }
    this.bubbleSort = bubbleSort;
    this.insertionSort = insertionSort;
    this.selectionSort = selectionSort;
    this.shellSort = shellSort;
    this.mergeSort = mergeSort;
    this.mergeArrays = mergeArrays;
}

function setData(){
    for(var i=0; i<this.numElements; i++){
        this.dataStore[i] = Math.floor(Math.random()*this.numElements + 1);
    }
}

function clear(){
    for(var i=0; i<this.numElements; i++){
        this.dataStore[i] = 0;
    }
}

function insert(element){
    this.dataStore[this.pos++] = element;
}

function toString(){
    var str = '';
    for(var i=0; i<this.numElements; i++){
        str += this.dataStore[i] + ' ';
        if( i>0 && i%10===0){
            str += '\n';
        }
    }
    return str;
}

function swap(arr, index1, index2){
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

/**
 * 冒泡排序：每一轮循环都把未排序的数中最小的放在前面，或者把最大的放在后面。相邻的两个数字进行比较
 * 时间复杂度：O(n^2)
 * 不稳定排序
 */
function bubbleSort(){
    for(var outer=0; outer<this.numElements; outer++){
        for(var inner=outer+1; inner<this.numElements; inner++){
            if(this.dataStore[outer] > this.dataStore[inner]){
                this.swap(this.dataStore, outer, inner);
            }
        }
    }
}

/**
 * 选择排序：从第一个数开始，每一次把最小的数的位置找出来，跟还未排序的第一个数交换位置
 * 时间复杂度：O(n^2)
 * 不稳定排序
 */
function selectionSort(){
    var minIndex;
    for(var outer=0; outer<this.numElements-2; outer++){
        minIndex = outer;
        for(var inner= outer+1; inner<this.numElements; inner++){
            if(this.dataStore[inner]<this.dataStore[minIndex]){
                minIndex = inner;
            }
        }
        this.swap(this.dataStore, outer, minIndex);
    }
}

/**
 * 插入排序：将所有数字分成两部分，一部分是已经排好序的（内层循环），一部分是还没有排序的（外层循环）。
 * 想象把待插入的数据放在已经排好序的最后一个位置，把待插入的数据和已经排好序的数（从后往前）逐个比较，如果待插入的数比当前的数字更小，他们就交换位置
 * 也就是要找到新插入的数应该插入的位置。
 * 时间复杂度：O(n^2)
 * 稳定排序
 */
function insertionSort(){
    for(var outer=1; outer<this.numElements; outer++){
        for(var inner=outer; inner>0 && this.dataStore[inner] < this.dataStore[inner-1]; inner--){
            this.swap(this.dataStore, inner, inner-1);
        }
    }
}

/**
 * 希尔排序：把记录按下标的一定增量分组，对每组使用直接插入排序算法；增量逐渐减少，当增量减至1时，整个文件恰被分成一组，变成插入排序。
 * 时间复杂度：O(n^(1.3~2))
 * 不稳定排序
 */
function shellSort(){
    var h = 1;
    while( h < this.numElements/3){
        h = 3*h +1;
    }
    while(h>=1){
        for(var i=h; i<this.numElements; i++){
            for(var j=i; j>= h && this.dataStore[j-h] > this.dataStore[j]; j-=h){
                this.swap(this.dataStore, j, j-h)
            }
        }
        h = (h-1)/3;
    }
}

/**
 * 归并排序：将已有序的子序列合并，得到完全有序的序列，即先使每个子序列有序，再使子序列段间有序。
 * 时间复杂度：O(n*logn)
 * 稳定的排序
 */
function mergeSort(){
    if(this.numElements < 2){
        return;
    }
    var step = 1;
    var left, right;
    while(step < this.numElements){
        left = 0;
        right = step;
        while(right + step <= this.numElements){
            mergeArrays(this.dataStore, left, left+step, right, right+step);
            left = right + step;
            right = left + step;
        }
        if(right < this.numElements){
            mergeArrays(this.dataStore, left, left+step, right, this.numElements);
        }
        step *= 2;
    }
}

function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight){
    var rightArr = new Array(stopRight - startRight + 1);
    var leftArr = new Array(stopLeft - startLeft + 1);
    // k = startRight;
    // for(var i = 0; i<(rightArr.length-1); i++){
    //     rightArr[i] = arr[k];
    //     ++k;
    // }
    // k = startLeft;
    // for(var i = 0; i < (leftArr.length-1); i++){
    //     leftArr[i] = arr[k];
    //     ++k;
    // }
    // rightArr[rightArr.length-1] = Infinity;
    // leftArr[leftArr.length-1] = Infinity;

    leftArr = arr.slice(startLeft, stopLeft);
    rightArr = arr.slice(startRight, stopRight);
    leftArr.push(Infinity);
    rightArr.push(Infinity);

    var m = 0;
    var n = 0;
    for(var k = startLeft; k < stopRight; k++){
        if(leftArr[m] <= rightArr[n]){
            arr[k] = leftArr[m];
            m++;
        }else{
            arr[k] = rightArr[n];
            n++;
        }
    }
    // print("left array - ", leftArr);
    // print("right array - ", rightArr);
}

/**
 * 快速排序：首先选择一个基准元素，将列表分隔成两个子序列；再对列表重新排序，将所有小于基准值的元素放在基准值的前面，
 * 所有大于基准值的元素放在基准值的后面；分别对较小元素的子序列和较大元素的子序列重复前面两步。
 * 时间复杂度：O(n*logn)
 * 不稳定排序
 */
function qSort(list){
    if(list.length == 0){
        return [];
    }
    var lesser = [];
    var greator = [];
    var pivot = list[0];
    for(var i=1; i<list.length; i++){
        if(list[i] < pivot){
            lesser.push(list[i]);
        }else{
            greator.push(list[i]);
        }
    }
    return qSort(lesser).concat(pivot, qSort(greator));
}

var numElements = 1000;
var randomNums = [];
for(var i=0; i<numElements; i++){
    randomNums[i] =i;
}

var myNums1 = new CArray(numElements);
var myNums2 = new CArray(numElements);
var myNums3 = new CArray(numElements);
var myNums4 = new CArray(numElements);
var myNums5 = new CArray(numElements);
var myNums6 = new CArray(numElements);

var start = new Date().getTime();
myNums1.bubbleSort();
var stop = new Date().getTime();
print('bubbleSort ' + (stop - start));

start = new Date().getTime();
myNums2.selectionSort();
stop = new Date().getTime();
print('selectionSort ' + (stop - start));

start = new Date().getTime();
myNums3.insertionSort();
stop = new Date().getTime();
print('insertionSort ' + (stop - start));

start = new Date().getTime();
myNums4.shellSort();
stop = new Date().getTime();
print('shellSort ' + (stop - start));

start = new Date().getTime();
myNums5.mergeSort();
stop = new Date().getTime();
print('mergeSort ' + (stop - start));

start = new Date().getTime();
qSort(myNums6)
stop = new Date().getTime();
print('qSort ' + (stop - start));

// start = new Date().getTime();
// JSON.parse(JSON.stringify(randomNums)).sort();
// stop = new Date().getTime();
// print('sort ' + (stop - start));

// start = new Date().getTime();
// qSort(myNums1)
// stop = new Date().getTime();
// print('qSort ' + (stop - start));

/**
 * 1000个整数的有序数组：
 *  bubbleSort 2
    selectionSort 2
    insertionSort 0
    shellSort 0
    mergeSort 2
    qSort 1

    1000个倒序的数组：
    bubbleSort 2
    selectionSort 2
    insertionSort 1
    shellSort 1
    mergeSort 2
    qSort 0

    1000个无序的数组：
    bubbleSort 3
    selectionSort 2
    insertionSort 1
    shellSort 0
    mergeSort 1
    qSort 0

    10000个随机整数：快速排序和js内置的排序函数
    sort 2
    qSort 0

 */

// var numElements = 10;
// var myNums = new CArray(numElements);
// myNums.setData();
// print(myNums.toString());
// myNums.bubbleSort();
// myNums.selectionSort();
// myNums.insertionSort();
// print(myNums.toString());

//计时
// var randomNums = [];
// for(var i=0; i<this.numElements; i++){
//     this.randomNums[i] = Math.floor(Math.random()*numElements + 1);
// }
// var myNums1 = new CArray(numElements);
// var myNums2 = new CArray(numElements);
// var myNums3 = new CArray(numElements);

// var start = new Date().getTime();
// myNums1.bubbleSort();
// var stop = new Date().getTime();
// print('bubbleSort ' + (stop - start));

// start = new Date().getTime();
// myNums2.selectionSort();
// stop = new Date().getTime();
// print('selectionSort ' + (stop - start));

// start = new Date().getTime();
// myNums3.insertionSort();
// stop = new Date().getTime();
// print('insertionSort ' + (stop - start));

//希尔排序
// print('before shellsort: ');
// print(myNums.toString());
// myNums.shellSort();
// print('after shellsort: ');
// print(myNums.toString());

//归并排序
// print(myNums.toString());
// myNums.mergeSort();
// print(myNums.toString());

//快速排序
// var a = [];
// for(var i=0; i<10; i++){
//     a[i] = Math.floor(Math.random()*100 + 1);
// }
// print(a);
// print(qSort(a));