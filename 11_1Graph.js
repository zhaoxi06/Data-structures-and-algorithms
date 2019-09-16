function Graph(v){
    this.vertices = v;
    this.vertexList = [];
    this.edges = 0;
    this.adj = [];
    for(var i=0; i<this.vertices;++i){
        this.adj[i] = [];
    }
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.dfs = dfs;
    this.bfs = bfs;
    this.marked = [];
    for(var i=0; i<this.vertices; ++i){
        this.marked[i] = false;
    }
    this.edgeTo = [];
    this.pathTo = pathTo;
    this.hasPathTo = hasPathTo;
    this.topSort = topSort;
    this.topSortHelper = topSortHelper;
}

function addEdge(v, w){
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}

// function showGraph(){
//     for(var i=0; i<this.vertices; i++){
//         putstr(i + " -> ");
//         for(var j=0; j<this.vertices;j++){
//             if(this.adj[i][j] != undefined){
//                 putstr(this.adj[i][j] + ' ');
//             }
//         }
//         print();
//     }
// }
function showGraph(){
    var visited = [];
    for(var i=0; i<this.vertices; i++){
        putstr(this.vertexList[i] + " -> ");
        visited.push(this.vertexList[i]);
        for(var j=0; j<this.vertices; j++){
            if(this.adj[i][j] != undefined){
                if(visited.indexOf(this.vertexList[j]) < 0){
                    putstr(this.vertexList[j] + ' ');
                }
            }
        }
        print();
        visited.pop();
    }
}


function dfs(v){
    this.marked[v] = true;
    if(this.adj[v] !== undefined){
        print("Visited vertex: " + v);
    }
    for(var w in this.adj[v]){
        if(!this.marked[this.adj[v][w]]){
            this.dfs(this.adj[v][w]);
        }
    }
}

function bfs(s){
    var queue = [];
    this.marked[s] = true;
    queue.push(s);
    while(queue.length > 0){
        var v = queue.shift();
        if(typeof(v) != 'string'){
            print("Visited vertex: " + v);
        }
        for(var w in this.adj[v]){
            if(!this.marked[this.adj[v][w]]){
                this.edgeTo[this.adj[v][w]] = v;
                this.marked[this.adj[v][w]] = true;
                queue.push(this.adj[v][w]);
            }
        }
    }
}

function pathTo(v){
    var source = 0;
    if(!this.hasPathTo(v)){
        return undefined;
    }
    var path = [];
    for(var i=v; i!=source; i=this.edgeTo[i]){
        path.push(i);
    }
    path.push(source);
    return path;
}

function hasPathTo(v){
    return this.marked[v];
}

function topSort(){
    var stack = [];
    var visited = [];
    for(var i=0; i<this.vertices; i++){
        visited[i] = false;
        this.topSortHelper(i, visited, stack);
    }
    for(var i=0; i<stack.length; i++){
        if(stack[i] != undefined && stack[i] != false){
            print(this.vertexList[stack[i]]);
        }
    }
}

function topSortHelper(v, visited, stack){
    visited[v] = true;
    for(var w in this.adj[v]){
        if(!visited[w]){
            this.topSortHelper(visited[w], visited, stack);
        }
    }
    stack.push(v);
}

// g = new Graph(5);
// g.addEdge(0,1);
// g.addEdge(0,2);
// g.addEdge(1,2);
// g.addEdge(1,3);
// g.addEdge(2,4);
// g.showGraph();
// g.dfs(0);
// g.bfs(0);
// var vertex = 2;
// var paths = g.pathTo(vertex);
// while(paths.length > 0){
//     if(paths.length > 1){
//         putstr(paths.pop() + '-');
//     }else{
//         putstr(paths.pop());
//     }
// }


g = new Graph(6);
g.addEdge(1,2);
g.addEdge(2,5);
g.addEdge(1,3);
g.addEdge(1,4);
g.addEdge(0,1);
g.vertexList = ["CS1", "CS2", "Data Structures", "Assembly Language", "Operating System", "Algorithms"];
g.showGraph();
g.topSort();