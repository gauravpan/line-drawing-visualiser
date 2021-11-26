function Node(id, status) {
  this.id = id;
  this.status = status;
}

function Board(height, width) {
  this.height = height;
  this.width = width;
  this.startNode = "";
  this.targetNode = "";
  this.boardArray = [];
  this.nodes = {};
  this.isPressedNode = false;
  this.mouseDown = false;
  this.pathArray = [];
}

Board.prototype.initialize = function() {
  this.createGrid();
  this.addEventListeners();
};

Board.prototype.createGrid = function() {
  let tableHTML = "";
  for (let r = 0; r < this.height; r++) {
    let currentArrayRow = [];
    let currentHTMLRow = `<tr id="row ${r}">`;
    for (let c = 0; c < this.width; c++) {
      let newNodeId = `${r}-${c}`,
        newNodeClass,
        newNode;
      if (r === 1 && c === 1) {
        newNodeClass = "start";
        this.startNode = `${newNodeId}`;
      } else if (r === 2 && c === 6) {
        newNodeClass = "target";
        this.targetNode = `${newNodeId}`;
      } else {
        newNodeClass = "unvisited";
      }
      newNode = new Node(newNodeId, newNodeClass);
      currentArrayRow.push(newNode);
      currentHTMLRow += `<td id="${newNodeId}" class="${newNodeClass}"></td>`;
      this.nodes[`${newNodeId}`] = newNode;
    }
    this.boardArray.push(currentArrayRow);
    tableHTML += `${currentHTMLRow}</tr>`;
  }
  let board = document.getElementById("board");
  board.innerHTML = tableHTML;
};

Board.prototype.addEventListeners = function() {
  let board = this;
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      let currentId = `${r}-${c}`;
      let currentNode = board.getNode(currentId);
      let currentElement = document.getElementById(currentId);
      //mouse down
      currentElement.onmousedown = e => {
        e.preventDefault();
        board.mouseDown = true;

        if (currentId == board.startNode) {
          board.isPressedNode = true;
        }
      };
      // mouse up
      currentElement.onmouseup = () => {
        if (board.isPressedNode && board.mouseDown) {
          board.changeNode(currentElement, currentId, "start");

          board.mouseDown = false;
          console.log("  up");
        }
      };
      //mouse enter
      currentElement.onmouseenter = () => {
        if (board.isPressedNode && board.mouseDown) {
          board.changeNode(currentElement, currentId, "start");

          console.log(" enter");
        }
      };
      //mouse leave
      currentElement.onmouseleave = () => {};
    }
  }
};
Board.prototype.getNode = function(id) {
  let coordinates = id.split("-");
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);
  return this.boardArray[r][c];
};

Board.prototype.getNodePoint = function(id) {
  let coordinates = id.toString().split("-");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  return { x, y };
};

Board.prototype.drawPath = function(...pathArray) {
  this.clearPath();
  pathArray.pop();
  pathArray.shift();
  for (let point of pathArray) {
    let id = point.join("-");
    document.getElementById(id).className = "path";
  }
  this.pathArray = pathArray;
};

Board.prototype.changeNode = function(currentNode, currentId, specialClass) {
  document.getElementById(this.startNode).className = "unvisited";
  if (specialClass === "start") {
    currentNode.className = specialClass;
    this.startNode = currentId;
  }
  if (specialClass === "target") {
    currentNode.className = specialClass;
    this.targetNode = currentId;
  }
};

Board.prototype.clearPath = function() {
  if (this.pathArray) {
    for (let point of this.pathArray) {
      let id = point.join("-");
      document.getElementById(id).className = "unvisited";
    }
  }
};

Board.prototype.getStartNode = function() {
  return this.startNode;
};
Board.prototype.getTargetNode = function() {
  return this.targetNode;
};
export default Board;
