/**
 * 对于0~99之间的数字，基数排序
 */

function Queue(){
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.empty = empty;
}

function enqueue(ele){
    this.dataStore.push(ele);
}

function dequeue(){
    return this.dataStore.shift();
}

function empty(){
    return this.dataStore.length === 0;
}

function distribute(nums, queues, digit){
    for(var i=0;i<nums.length;i++){
        if(digit === 1){
            queues[nums[i]%10].enqueue(nums[i]);
        }else{
            queues[Math.floor(nums[i]/10)].enqueue(nums[i]);
        }
    }
}

function collect(queues, nums){
    var index = 0;
    for(var i=0;i<nums.length; i++){
        while(!queues[i].empty()){
            nums[index++] = queues[i].dequeue();
        }
    }
}

function display(arr){
    return arr.join(' ');
}

var queues = [];
var nums = [];
for(var i=0;i<10;i++){
    queues[i] = new Queue();
    nums[i] = Math.floor(Math.random()*100);
}
console.log('before radix sort: ');
console.log(display(nums));

distribute(nums, queues, 1);
collect(queues, nums);
console.log('round 1 ');
console.log(display(nums));

distribute(nums, queues, 10);
collect(queues, nums);
console.log('round 2');
console.log(display(nums));