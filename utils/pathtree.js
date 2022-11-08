/**
 * Example:
 * ```ts
 * let treeRoot = new TreeNode<string>();
 * 
 * treeRoot.put("a/b/c", "hello");
 * treeRoot.put("a/b/c/d", "world");
 * 
 * treeRoot.get("a/b/c") //returns hello
 * treeRoot.get("a/b/c/d") //return world
 * 
 * //Trailing and beginning backslashes are removed:
 * 
 * //   /a/b/c/ becomes a/b/c
 * //   a/b/c/ becomes a/b/c
 * //   /a/b/c becomes a/b/c
 * ```
 */
export class TreeNode {
  constructor() {
    this.children = new Map();
  }

  find(path, create = true) {
    //remove potential trailing and beginning backslash
    let trimStart = path.startsWith("/") ? 1 : 0;
    let trimEnd = path.endsWith("/") ? 1 : 0;

    if (trimStart > 0 || trimEnd > 0) {
      // console.log("path before trim", path);
      path = path.substring(trimStart, path.length - trimEnd); //only one substring op, yay!
      // console.log("path after trim", path);
    } //split path into parts deliniated by backslash


    let pathParts = path.split("/"); //recursively find (or create) our path

    return this.findParts(pathParts, 0, create);
  }

  findParts(pathParts, depth = 0, create = true) {
    let part = pathParts[depth];
    let child = this.children.get(part);

    if (!child) {
      if (create) {
        child = new TreeNode();
        this.children.set(part, child);
      } else {
        return null;
      }
    }

    depth++;

    if (depth <= pathParts.length) {
      return child.findParts(pathParts, depth, create);
    } else {
      return this;
    }
  }

  put(path, item) {
    let node = this.find(path, true);
    node.item = item;
  }

  get(path) {
    let node = this.find(path, false);

    if (node) {
      return node.item;
    } else {
      return null;
    }
  }

  keys(path) {
    if (!path) {
      let result = new Array();

      for (let [k, v] of this.children) {
        if (!k) continue;
        result.push(k);
      }

      return result;
    }

    let node = this.find(path, true);

    if (node) {
      let result = new Array();

      for (let [k, v] of node.children) {
        if (!k) continue;
        result.push(k);
      }

      return result;
    } else {
      return null;
    }
  }

}