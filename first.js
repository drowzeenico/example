
let cats = [
 { id: 1, parent: 0 },
 { id: 2, parent: 1 },
 { id: 3, parent: 2 },
 { id: 4, parent: 3 },
 { id: 5, parent: 3 },
 { id: 6, parent: 2 },
 { id: 7, parent: 1 },
 { id: 8, parent: 0 },
 { id: 9, parent: 0 },
 { id: 999, parent: 9 },
 { id: 10, parent: 4 },
 { id: 11, parent: 10 },
 { id: 12, parent: 8 },
 { id: 13, parent: 2 },
 { id: 14, parent: 8 }
];

const buildTree = (root = 0) => {
  const groupedByParent = {};

  cats.forEach(cat => {
    if (!groupedByParent[cat.parent]) {
      groupedByParent[cat.parent] = [];
    }
    groupedByParent[cat.parent].push({
      id: cat.id, childs: []
    });
  });

  const compile = (parentId) => {
    const tree = { id: parentId, childs: []};
    if (!groupedByParent[parentId]) return tree;

    groupedByParent[parentId].forEach(node => {
      if (groupedByParent[node.id])
        tree.childs.push(compile(node.id));
      else
        tree.childs.push(node);
    });
    return tree;
  };

  return compile(root);
}

console.log("%o", buildTree())
