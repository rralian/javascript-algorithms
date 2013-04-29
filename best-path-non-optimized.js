/**
 * A mostly reasonable (but not optimal) approach to finding a path through
 * a grid with passable and non-passable nodes using recursion. On each pass,
 * we check whether we're at the solution (and if it's best), and if not whether
 * this was the best path to this node. If so, we pass each possible next step
 * back into the function.
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


var start = [0,0],
    goal = [3,4],
    fromStart = {}, // object to keep track of best path to a node, as '0,3': 4
    solution = false,
    iterations = 0, // track each pass through the function
    startTime,
    endTime;

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
 * Find the path to goal from a given node. This function stores results
 * in the solution variable declared in the parent IIFE and returns nothing.
 *
 * @param    {array}   node   The node to start from
 * @param    {array}   goal   The goal node
 * @param    {array}   path   An array representing all nodes leading to current node
 *
 */
var findPath = function(node, goal, path){
    
    iterations++;
    
    var posStr = node.toString(),
        stepStr,
        step,
        validSteps,
        i,
        stepLength;

    // add node to the local path
    path.push(node);
    
    // if we have a better way to this node, stop looking in this branch
    if(typeof fromStart[posStr] ==='number' && fromStart[posStr] <= path.length) {
        return;
    }
    
    fromStart[posStr] = path.length;

    // are we at the solution?
    if(posStr===goal.toString()){
        
        // if it's better than what we have, save it
        if (!solution || path.length < solution.length) {
            solution = path;
        }
        return;
    }
    
    // get all valid steps from current node
    validSteps = getValidSteps(node);
    
    // loop through valid steps
    for (i=0;i<validSteps.length;i++){
        
        /*
        For each valid step, recurse through the function.
        Keep in mind that complex types are passed as pointers
        (by reference), so we need to pass a clone of `path`,
        hence the `.slice(0)`.
         */
        step = validSteps[i];
        findPath(step, goal, path.slice(0));

    }
    
};

// OK, so let's do this
startTime = new Date().getTime();
findPath(start, goal, []);
endTime = new Date().getTime();

// Now let's see the solution, how long it took, and how many iterations we ran
console.log('took '+iterations+' iterations and '+(endTime-startTime).toString()+' milliseconds');
console.log(solution);
console.log('---------');


}());