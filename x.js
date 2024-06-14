let sstore = [
  { children: [], active: false, level: "parent" },
  { children: [], active: false, level: "parent" },
  { children: [], active: false, level: "parent" },
  {
    active: false,
    level: "parent",
    children: [
      { children: [], active: false, level: "child" },
      { children: [], active: false, level: "child" },
      {
        children: [
          { children: [], active: false, level: "sub child" },
          { children: [], active: false, level: "sub child" },
          { children: [], active: false, level: "sub child" },
        ],
        active: false,
        level: "child",
      },
    ],
  },
  { children: [], active: false, level: "parent" },
  {
    children: [{ children: [], active: false, level: "child" }],
    active: false,
    level: "parent",
  },
];

function deactivateChildren(store) {
  return store.map((item) => {
    let childItem
    if (item.children) {
      childItem = item.children.map((subItem) => {
        if (!item.children.active) {
          subItem.active = false;
        }

        return subItem;
      });

      if (!item.active) {
        childItem.active = false;
      }
    }

    return (item.children = childItem);
  });
}

let newArr = deactivateChildren(sstore)

console.log(JSON.stringify(newArr, null, 2))
