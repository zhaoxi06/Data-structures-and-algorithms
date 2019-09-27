/**
 * 背包问题：动态规划方式解决
 * @param {背包容量} capacity 
 * @param {物品重量} size 
 * @param {物品价值} value 
 * @param {物品数量} n 
 */
function dKnapsack(capacity, size, value, n){
    var K = [];
    for(var i=0; i<=capacity+1; i++){
        K[i] = [];
    }
    for(var i=0; i<=n; i++){
        for(var w=0; w<=capacity; w++){
            if(i==0 || w==0){   //第一行第一列初始化为0，方便后面的赋值
                K[i][w] = 0;
            }else if(size[i-1] <= w){   //物品的质量小于等于背包的容量，即该物品能装入背包
                // print('K[i-1][w]',K[i-1][w]);
                K[i][w] = max(value[i-1] + K[i-1][w-size[i-1]], K[i-1][w]);
            }else{  //物品质量大于背包容量，即该物品无法装入背包
                K[i][w] = K[i-1][w];
            }
            putstr(K[i][w] + " ");
        }
        print();
    }

    return K[n][capacity];
}

function max(a, b){
    return a > b ? a : b;
}

var value = [4, 5, 10, 11, 13];
var size = [1, 2, 3, 4, 4];
var capacity = 6;
var n = 5;
print(dKnapsack(capacity, size, value, n));
/**
 * 行代表物品的个数，列代表背包的容量
 * 第一行：当只有一个价值为4的物品时，不管背包的容量是1~6中的任何一个，背包所能装的物品价值都是4
 * 第二行：取第二个物品出来，当背包容量不足以放下这个物品时，此时背包价值为之前所放入物品的总价值；当背包容量能放入这个物品时，即当背包容量升级到2时，能装下质量为2的物品，如果装下质量为2价值为5的物品+除去当前物品质量后剩余背包控件所能装的物品价值 大于 不装入这个物品时背包的价值，则装入这个物品，否则不装入
 * 第三行：取出第三个物品，按第二行所说方法，以此类推......
 *  0 0 0 0 0 0 0
    0 4 4 4 4 4 4
    0 4 5 9 9 9 9
    0 4 5 10 14 15 19
    0 4 5 10 14 15 19
    0 4 5 10 14 17 19
    19

 */