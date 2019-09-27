/**
 * 寻找最长公共子串
 * @param {第一个子串} word1 
 * @param {第二个子串} word2 
 */
function lcs(word1, word2){
    var max = 0;
    var index = 0;
    var lcsarr = new Array(word1.length+1);
    for(var i=0; i<=word1.length+1; i++){
        lcsarr[i] = new Array(word2.length+1);
        for(var j=0; j<=word2.length+1; j++){
            lcsarr[i][j] = 0;
        }
    }

    for(var i=0; i<=word2.length; i++){
        for(var j=0; j<=word2.length; j++){
            if(i==0 || j==0){
                lcsarr[i][j] = 0;
            }else{
                if(word1[i-1] == word2[j-1]){
                    lcsarr[i][j] = lcsarr[i-1][j-1] + 1;
                }else{
                    lcsarr[i][j] = 0;
                }
            }
            if(max < lcsarr[i][j]){
                max = lcsarr[i][j];
                index = j;
            }
        }
    }
    print('max',max);
    print('index', index);

    var str = '';
    for(var i=index-max; str.length<max; ++i){
        str += word2[i];
    }
    return str;
}

print(lcs('abbcc', 'dbbcc'));