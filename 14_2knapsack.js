/**
 * 背包问题：递归方式解决
 * @param {背包容量} capacity 
 * @param {物品重量} size 
 * @param {物品价值} value 
 * @param {物品数量} n 
 */
function knapsack(capacity, size, value, n){
    print(capacity, size, value, n);
    if(n==0 || capacity==0){
        return 0;
    }
    if(size[n-1] > capacity){   //物品重量大于背包容量
        return knapsack(capacity, size, value, n-1);
    }else{  //比较 放入当前这个物品加上剩余其他物品的价值更高 还是 不放入这个物品计算其他物品的价值更高
        return max(
            value[n-1]+knapsack(capacity-size[n-1], size, value, n-1),
            knapsack(capacity, size, value, n-1)
        );
    }
}

function max(a, b){
    return a > b ? a : b;
}


var value = [13, 11, 10, 5, 4];
var size = [9, 8, 7, 4, 3];
var capacity = 16;
var n = 5;
print(knapsack(capacity, size, value, n));