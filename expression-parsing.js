function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function createBinaryOperationTree(expression) {

    function newGuid() {
        return generateGuid();
    }

    function parseExpression(expr) {
        // Split the expression into parts (AND groups) by the OR operator
        let orParts = expr.split('+').map(part => part.trim());
        if (orParts.length > 1) {
            return {
                guid: newGuid(),
                value: 'OR',
                left: parseExpression(orParts[0]),
                right: parseExpression(orParts.slice(1).join('+'))
            };
        } else {
            let andParts = orParts[0].match(/!?[A-Z]/g);
            if (andParts.length > 1) {
                return {
                    guid: newGuid(),
                    value: 'AND',
                    left: parseTerm(andParts[0]),
                    right: parseExpression(andParts.slice(1).join(''))
                };
            } else {
                return parseTerm(andParts[0]);
            }
        }
    }

    function parseTerm(term) {
        if (term.startsWith('!')) {
            return {
                guid: newGuid(),
                value: 'NOT',
                right: {
                    guid: newGuid(),
                    value: 'INPUT',
                    inputVariable: term[1]
                }
            };
        } else {
            return {
                guid: newGuid(),
                value: 'INPUT',
                inputVariable: term
            };
        }
    }

    const tree = parseExpression(expression);
    const outputNode = {
        guid: newGuid(),
        value: 'OUTPUT',
        right: tree
    }
    return outputNode;
}


function cloneGuidAndCircutType(node) {
  return {
    guid: node.guid,
    circutType: node.value,
  };
}

function treeIntoArray(node, parent = null, nodesArr) {
  if (node.left) treeIntoArray(node.left, node, nodesArr);
  if (node.right) treeIntoArray(node.right, node, nodesArr);

    if (node.value === 'OUTPUT') {
        nodesArr.push({
            guid: node.guid,
            circutType: 'OUTPUT',
            input: cloneGuidAndCircutType(node.right)
        })
    }

  if (node.value === "AND" || node.value === "OR") {
    nodesArr.push({
      guid: node.guid,
      circutType: node.value,
      leftInput: {
        guid: node.left.guid,
        circutType: node.left.value,
      },
      rightInput: {
        guid: node.right.guid,
        circutType: node.right.value,
      },
      output: parent ? cloneGuidAndCircutType(parent) : undefined,
    });
  }

  if (node.value === "NOT") {
    nodesArr.push({
      guid: node.guid,
      circutType: "NOT",
      input: {
        guid: node.right.guid,
        circutType: node.right.value,
      },
      output: parent ? cloneGuidAndCircutType(parent) : undefined,
    });
  }

  if (node.value === "INPUT") {
    nodesArr.push({
      guid: node.guid,
      circutType: "INPUT",
      inputVaraible: node.inputVariable,
      output: parent ? cloneGuidAndCircutType(parent) : undefined,
    });
  }
}



let expression = "A!BC+ABC+AC+!ABC";
let tree = createBinaryOperationTree(expression);
let array = [];
treeIntoArray(tree, null, array)
