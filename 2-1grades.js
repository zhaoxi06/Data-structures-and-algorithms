/**
 * 创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法。
 */

function Grages(){
    this.dataSource = [];
    this.add = add;
    this.average = average;
}

function add(grades){
    this.dataSource.push(grades);
}

function average(){
    let row;
    let average = [];
    for (let i=0;i<this.dataSource.length;i++){
        let total = 0;
        row = this.dataSource[i];
        for(let j=0;j<row.length;j++){
            total += row[j];
        }
        average.push((total/row.length).toFixed(2));
    }
    return average;
}

var thisExam = new Grages();
thisExam.add([89, 77]);
thisExam.add([76, 82, 81]);
thisExam.add([91, 94, 89, 99]);
console.log(thisExam.average());