import { PinOutPutData } from "../database/models/Pin";

export const dijkstra = (
  graph: any,
  startPin: PinOutPutData,
  endPin: PinOutPutData
) => {
  const distances: any = {};
  const visited: any = {};
  const _path: any = [];
  const previousNodes: any = {};
  let path = [];
  console.log(graph);

  for (let node in graph) {
    distances[node] = Infinity;
  }

  distances[startPin.id] = 0;

  while (Object.keys(visited).length < Object.keys(graph).length) {
    let smallestNode;
    let smallestDistance = Infinity;
    for (let node in graph) {
      if (!visited[node] && distances[node] < smallestDistance) {
        smallestNode = node;
        smallestDistance = distances[node];
      }
    }

    if (!smallestNode) {
      break;
    }

    visited[smallestNode] = true;
    _path.push(smallestNode);

    for (let neighbor in graph[smallestNode]) {
      let distance = graph[smallestNode][neighbor];
      let totalDistance = distance + distances[smallestNode];
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previousNodes[neighbor] = smallestNode;
      }
    }
  }

  let currentNode = endPin.id;
  //   while (currentNode !== startPin.id) {
  //     path.unshift(currentNode);
  //     currentNode = previousNodes[currentNode];
  //   }
  path.unshift(startPin.id);

  if (distances[endPin.id] !== Infinity) {
    const a = {
      path: path,
      distance: distances[endPin.id],
    };
    console.log(a);
  } else {
    return null;
  }
  console.log(_path);

  console.log(visited);
  return _path;
};

// const getMinAndIndex = (arr: any) => {
//   let minVal = arr[0];
//   let minIndex = 0;
//   for (let index = 1; index < arr.length; index++) {
//     const val = arr[index];
//     if (val < minVal && val !== 0) {
//       minVal = val;
//       minIndex = index;
//     }
//   }
//   return { minVal, minIndex };
// };
// const visitNode = (unvisited: any, current: any) => {
//   for (const node of unvisited) {
//     if (node == current) {
//       const distFromCurrentNode = new Array();

//       current.forEach((element: any) => {
//         distFromCurrentNode.push(element[1]);
//       });
//     }
//   }
// };
