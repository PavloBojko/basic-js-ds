const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
root— повернути кореневий вузол дерева
add(data)— додати вузол з dataдо дерева
has(data)— повертає true, якщо вузол із dataіснує в дереві та falseв іншому випадку
find(data)— повертає вузол із вузломdata if з існує в дереві та інакшеdatanull
remove(data)— видаляє з дерева вузол з , якщо існує вузол зdatadata
min— повертає мінімальне значення , що зберігається в дереві (або nullякщо дерево не має вузлів )
max— повертає максимальне значення , що зберігається в дереві (або nullякщо дерево не має вузлів )
*/
class BinarySearchTree {
  constructor() {
    this.binaryTree = {
      data: null,
      left: null,
      right: null,
    };
  }

  root() {
    return this.binaryTree.data ? this.binaryTree : null;
  }

  add(data) {
    this.binaryTree = this.addData(this.binaryTree, data);
  }

  has(data) {
    return this.find(data) !== null ? true : false;
  }

  find(data) {
    return this.find_Data(this.binaryTree, data);
  }

  remove(data) {
    if (this.has(data)) this.binaryTree = this.remov_Data(this.binaryTree, data);
  }

  min() {
    return this.find_Min(this.binaryTree.left, this.binaryTree.data);
  }

  max() {
    return this.find_Max(this.binaryTree.right, this.binaryTree.data);
  }
  addData(binaryTree, data) {
    if (!binaryTree) binaryTree = { data: data, left: null, right: null };
    else if (!binaryTree.data) binaryTree.data = data;
    else if (data <= binaryTree.data) binaryTree.left = this.addData(binaryTree.left, data);
    else if (data > binaryTree.data) binaryTree.right = this.addData(binaryTree.right, data);

    return binaryTree;
  }
  find_Data(binaryTree, data) {
    if (!binaryTree) return null;
    else if (!binaryTree.data) return null;
    else if (binaryTree.data === data) return binaryTree;
    else if (data <= binaryTree.data) return this.find_Data(binaryTree.left, data);
    else if (data > binaryTree.data) return this.find_Data(binaryTree.right, data);
  }
  find_Max(binaryTree, max) {
    if (!binaryTree) return max;
    else if (!binaryTree.right) return max;
    else return this.find_Max(binaryTree.right, binaryTree.right.data);
  }
  find_Min(binaryTree, min) {
    if (!binaryTree) return min;
    else if (binaryTree.data < min) return this.find_Min(binaryTree.left, binaryTree.data)
    else if (!binaryTree.left) return min;
    else return this.find_Min(binaryTree.left, binaryTree.left.data);
  }
  remov_Data(binaryTree, data) {
    if (data < binaryTree.data) { binaryTree.left = this.remov_Data(binaryTree.left, data) };
    if (data > binaryTree.data) { binaryTree.right = this.remov_Data(binaryTree.right, data) };
    if (data === binaryTree.data) {
      if (!binaryTree.left && !binaryTree.right) return null;
      else if (!binaryTree.left) return binaryTree.right;
      else if (!binaryTree.right) return binaryTree.left;
      else {
        let maxL = this.find_Max(binaryTree.left, binaryTree.left.data);
        binaryTree.data = maxL;
        binaryTree.left = this.remov_Data(binaryTree.left, maxL);
      }
    }

    return binaryTree;
  }
}

module.exports = {
  BinarySearchTree
};