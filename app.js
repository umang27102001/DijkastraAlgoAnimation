let box=Array.from(document.getElementsByClassName("box"));

let src=document.getElementById("src");
let dest=document.getElementById("dest");

class Graph {
  constructor() {
    this.vertices = {};
  }

  addVertex(vertex) {
    this.vertices[vertex] = {};
  }

  addEdge(source, destination, weight) {
    if (!this.vertices[source] || !this.vertices[destination]) {
      throw new Error('Vertex does not exist');
    }

    this.vertices[source][destination] = weight;
    this.vertices[destination][source] = weight;
  }

  dijkstra(source) {
    const distances = {};
    const visited = {};
    const previous = {};

    // Initialize distances, visited, and previous
    for (let vertex in this.vertices) {
      distances[vertex] = Infinity;
      visited[vertex] = false;
      previous[vertex] = null;
    }

    distances[source] = 0;

    while (true) {
      let minDistance = Infinity;
      let nextVertex = null;

      // Find the vertex with the minimum distance
      for (let vertex in this.vertices) {
        if (distances[vertex] < minDistance && !visited[vertex]) {
          minDistance = distances[vertex];
          nextVertex = vertex;
        }
      }

      if (nextVertex === null) {
        break;
      }

      visited[nextVertex] = true;

      // Update distances and previous for the neighbors of the nextVertex
      for (let neighbor in this.vertices[nextVertex]) {
        const weight = this.vertices[nextVertex][neighbor];
        const totalDistance = distances[nextVertex] + weight;

        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = nextVertex;
        }
      }
    }

    return { distances, previous };
  }

  shortestPath(source, destination) {
    const { distances, previous } = this.dijkstra(source);

    if (distances[destination] === Infinity) {
      return 'No path found';
    }

    // Build the shortest path from source to destination
    const path = [];
    let currentVertex = destination;

    while (currentVertex !== null) {
      path.unshift(currentVertex);
      currentVertex = previous[currentVertex];
    }

    return { path, distance: distances[destination] };
  }
}

// Create a new graph
const graph = new Graph();

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');
graph.addVertex('J');
graph.addVertex('K');
graph.addVertex('L');
graph.addVertex('M');
graph.addVertex('N');

// Add edges
graph.addEdge('A', 'B', 3);
graph.addEdge('A', 'C', 5);
graph.addEdge('A', 'D', 2);
graph.addEdge('B', 'E', 1);
graph.addEdge('B', 'F', 5);
graph.addEdge('C', 'G', 2);
graph.addEdge('C', 'H', 3);
graph.addEdge('D', 'I', 3);
graph.addEdge('E', 'J', 1);
graph.addEdge('F', 'K', 5);
graph.addEdge('G', 'L', 1);
graph.addEdge('H', 'M', 2);
graph.addEdge('I', 'N', 6);


const printPath=(path)=>{
    var i = 0;                  
    function myLoop() {      
        setTimeout(function() {   
            document.getElementById(path[i]).style.backgroundColor="yellow"  
            document.getElementById(path[i]).style.color="black"  
            document.getElementById(path[i]).style.transform="scale(1.2)" 

            document.getElementById(path[i]).style.transition="0.4s" 
            i++;                    
            if (i < path.length) {          
                myLoop();             
            }                      
        }, 1000)
    }
    
    myLoop();
}

const findMin=(a,b)=>{
const { path, distance } = graph.shortestPath(a, b);
printPath(path);
}
box.forEach(elem => {
    elem.addEventListener("click",()=>{
        if(src.value==""){
            src.value=elem.innerText;
        }
        else{
            dest.value=elem.innerText;
        }
    })
});
let find=document.getElementById("findBtn");
find.addEventListener("click",()=>{
    if(src.value==""||dest.value==""){
        console.log("Error")
    }
    else{
        findMin(src.value,dest.value);
    }
})
document.getElementById("resetBtn").addEventListener("click",()=>{
  location.reload();
})
var it=0;
color=["#adb3f1","#f1adc9","#d4f1ad","#cbc2c2","#c4fff4","#ffc6e3"]
setInterval(()=>{
document.body.style.backgroundColor=color[it++]
document.body.style.transition="2s"
if(it==color.length){it=0;}
},2000)