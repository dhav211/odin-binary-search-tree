class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   *
   * @param {Array} values Array of values that will be used to create the tree
   * @param {*} start
   * @param {*} end
   */
  buildTreeFromSortedArray(values, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const newNode = new TreeNode(values[mid]);

    newNode.left = this.buildTreeFromSortedArray(values, start, mid - 1);
    newNode.right = this.buildTreeFromSortedArray(values, mid + 1, end);

    return newNode;
  }

  #insert(value, node) {
    if (node === null) return;

    if (value > node.value) {
      if (node.right === null) {
        node.right = new TreeNode(value);
        return;
      }
      this.#insert(value, node.right);
    } else {
      if (node.left === null) {
        node.left = new TreeNode(value);
        return;
      }

      this.#insert(value, node.left);
    }
  }

  insert(value) {
    if (this.root === null) {
      this.root = new TreeNode(value);
      return;
    }

    this.#insert(value, this.root);
  }

  delete(node) {
    if (node === null) return;

    if (node.left === null && node.right === null) {
      node.value = null;
      return;
    }

    if (node.left !== null) {
      node.value = node.left.value;
      this.delete(node.left);
      if (node.left.value === null) {
        node.left = null;
      }
    } else if (node.right !== null) {
      node.value = node.right.value;
      this.delete(node.right);
      if (node.right.value === null) {
        node.right = null;
      }
    }
  }

  getNode(value, root) {
    if (root === null) return;

    if (value > root.value) {
      return this.getNode(value, root.right);
    } else if (value < root.value) {
      return this.getNode(value, root.left);
    } else {
      return root;
    }
  }

  levelOrder(action) {
    const nodeQueue = [this.root];
    const nodes = [];

    while (nodeQueue.length > 0) {
      const currentNode = nodeQueue.shift();
      if (action !== undefined) {
        action(currentNode.value);
      } else {
        nodes.push(currentNode);
      }

      if (currentNode.left !== null) nodeQueue.push(currentNode.left);
      if (currentNode.right !== null) nodeQueue.push(currentNode.right);
    }

    return nodes;
  }

  inorder(node, action) {
    if (node === null) return;

    if (node.left !== null) {
      action = this.inorder(node.left, action);
    }

    if (action !== undefined && !Array.isArray(action)) {
      action(node.value);
    } else if (action === undefined || Array.isArray(action)) {
      if (action === undefined) action = [];
      action.push(node.value);
    }

    if (node.right !== null) {
      action = this.inorder(node.right, action);
    }

    return action;
  }

  preorder(node, action) {
    if (node === null) return;

    if (action !== undefined && !Array.isArray(action)) {
      action(node.value);
    } else if (action === undefined || Array.isArray(action)) {
      if (action === undefined) action = [];
      action.push(node.value);
    }

    if (node.left !== null) {
      action = this.preorder(node.left, action);
    }

    if (node.right !== null) {
      action = this.preorder(node.right, action);
    }

    return action;
  }

  postorder(node, action) {
    if (node === null) return;

    if (node.left !== null) {
      action = this.postorder(node.left, action);
    }

    if (node.right !== null) {
      action = this.postorder(node.right, action);
    }

    if (action !== undefined && !Array.isArray(action)) {
      action(node.value);
    } else if (action === undefined || Array.isArray(action)) {
      if (action === undefined) action = [];
      action.push(node.value);
    }

    return action;
  }

  getHeight(node) {
    if (node === null) return -1;
    if (node.left === null && node.right === null) return 0;

    const leftHeight = this.left !== null ? this.getHeight(node.left) : 0;
    const rightHeight = this.right !== null ? this.getHeight(node.right) : 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  getDepth(node, root) {
    if (root === null) return -1;

    if (node.value > root.value) {
      return this.getDepth(node, root.right) + 1;
    } else if (node.value < root.value) {
      return this.getDepth(node, root.left) + 1;
    } else {
      return 0;
    }
  }

  isBalanced() {
    const leftHeight = this.getHeight(this.root.left);
    const rightHeight = this.getHeight(this.root.right);

    if (leftHeight > rightHeight + 1) return false;
    else if (rightHeight > leftHeight + 1) return false;
    else return true;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

function addRandomValues(tree, amount) {
  for (let i = 0; i < amount; i++) {
    tree.insert(Math.floor(Math.random() * 100));
  }
}

const bst = new BinarySearchTree();

addRandomValues(bst, 10);

bst.prettyPrint(bst.root);

if (!bst.isBalanced()) {
  console.log('----------------------------------');
  const vals = bst.inorder(bst.root);
  bst.root = null;

  bst.root = bst.buildTreeFromSortedArray(vals, 0, vals.length - 1);
  bst.prettyPrint(bst.root);
}

bst.isBalanced() ? console.log('Tree is balanced') : console.log("Tree isn't balance");

console.log('Inorder');
bst.inorder(bst.root, (value) => console.log(value));
console.log('Preorder');
bst.preorder(bst.root, (value) => console.log(value));
console.log('Postorder');
bst.postorder(bst.root, (value) => console.log(value));
