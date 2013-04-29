/**
 * This is a javascript implementation of the a-star algorithm. As you step 
 * through the maze, you keep track of the optimal score of each unexplored 
 * node. The score is the sum of how the best path to that node, and the 
 * ideal path to the goal. At each step, you review the scores of each 
 * unexplored node and follow the path to the unexplored node with the 
 * lowest score. This is guaranteed to find the shortest path while optimally 
 * exploring the fewest paths.
 */

(function(){
/**
 * A representation of the grid as an array of arrays, with passable nodes as
 * '1' and impassable nodes as '0'. e.g., The four corners would look like:
 * 
 * - (nw) grid[0,0] // 1
 * - (ne) grid[0,5] // 0
 * - (se) grid[5,5] // 1
 * - (sw) grid[5,0] // 1
 */
var grid = [
    [1,1,1,1,0,0],
    [1,0,1,1,1,1],
    [1,1,1,0,0,0],
    [1,0,1,0,1,0],
    [1,1,1,0,1,0],
    [1,1,1,1,1,1]
];

/**
 * Get all possible next moves from a given node.
 *
 * @param    {array}   node   starting node, e.g., [0,3]
 *
 * @return   {array}          array of nodes, e.g., [[0,2],[0,4],[1,3]]
 */
var getValidSteps = function(node){
  var x = node[0],
      y = node[1],
      steps = [];
  if (grid[x-1] && grid[x-1][y]) steps.push([x-1,y]);
  if (grid[x+1] && grid[x+1][y]) steps.push([x+1,y]);
  if (grid[x][y-1]) steps.push([x,y-1]);
  if (grid[x][y+1]) steps.push([x,y+1]);
  return steps;
};

/**
 * Find the shortest possible distance from node to goal
 * @param  {array}   node the node we are testing
 * @return {integer}      the sum of the differences between x and y coords
 */
var getFromGoal = function(node){
  return Math.abs(node[0]-goal[0]) + Math.abs(node[1]-goal[1]);
};


var start = [0,0],
    goal = [3,4];

var findPath = function(start, goal){

  /**
   * sort from high to low, so we can pop the lowest. standard js sort algorithm
   */
  var sortNodes = function(a,b){
    aStr = a.toString();
    bStr = b.toString();
    if(combinedScore[bStr] < combinedScore[aStr]){
      return -1;
    }else if(combinedScore[bStr] > combinedScore[aStr]){
      return 1;
    }
    return 0;
  };

  /**
   * build the solution path as an array
   * @param  {array} node [description]
   * @return {[type]}      [description]
   */
  var walkPath = function(node){

    if(!confirm('walk path?')) return;
    var result = [node];
    var getNext = function(currNode){
      var nodeStr = currNode.toString(),
          nextNode = fromNode[nodeStr];
          if(nextNode){
            console.log('nextNode', nextNode);
            if(!confirm('nextNode?')) return;
            result.push(nextNode);
            getNext(nextNode);
          }
    };
    getNext(node);
    return result.reverse();
  };

  var nodeStr = start.toString(),
  explored = [],
  possibles = [start], // array to keep track of possible steps to explore
  fromNode = {},
  combinedScore = {},
  fromStart = {'0,0': 0},
  fromGoal = {},
  current,
  currStr,
  nextSteps,
  step,
  stepStr,
  i;

  while(possibles.length){
//    if(!confirm('keep going?')) return;
    // sort and find the next best step
    possibles.sort(sortNodes);
    current = possibles.pop();
    currStr = current.toString();

    fromGoal[currStr] = fromGoal[currStr] || getFromGoal(current);
    if (!fromGoal[currStr]){
      return walkPath(current);
    }

    currFromStart = fromStart[current] || 0;
    nextSteps = getValidSteps(current);

    for(i = 0; i < nextSteps.length; i++){
      step = nextSteps[i];
      stepStr = step.toString();
      if((typeof fromStart[stepStr] === 'undefined') || fromStart[stepStr]>currFromStart+1){
        fromStart[stepStr] = currFromStart+1;
        fromNode[stepStr] = current;
        fromGoal[stepStr] = fromGoal[stepStr] || getFromGoal(step);
        combinedScore[stepStr] = fromStart[stepStr] + fromGoal[stepStr];
        possibles.push(step);
      }
    }

  }

  return false;

};

var solution = findPath(start, goal);
console.log(solution);
}());
