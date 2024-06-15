<script setup>
import { onMounted, ref } from "vue";
import Checkbox from "./Checkbox.vue";

const ladder = ref(null);
const defaultStore = [
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

const saveUpdate = () => {
  const newData = JSON.parse(JSON.stringify(ladder.value));
  const newChanges = deactivateChildrenIfParentInactive(newData);
  localStorage.setItem("ladder", JSON.stringify(newChanges));
  ladder.value = newChanges;
};

// deactivate children if parent is inactive
function deactivateChildrenIfParentInactive(store) {
  return store.map(item => {
    if (item.active === false) {
      item.children = deactivateAllChildren(item.children);
    }
    
    if (item.children && item.children.length > 0) {
      item.children = deactivateChildrenIfParentInactive(item.children);
    }
    return item;
  });
}

function deactivateAllChildren(children) {
  return children.map(child => {
    child.active = false;
    if (child.children && child.children.length > 0) {
      child.children = deactivateAllChildren(child.children);
    }
    return child;
  });
}

onMounted(() => {
  let data = localStorage.getItem("ladder");
  if (!data) {
    localStorage.setItem("ladder", JSON.stringify(defaultStore));
    ladder.value = defaultStore;
  } else {
    ladder.value = JSON.parse(data);
  }
});
</script>

<template>
  <div class="ladder-container">
    <div
      v-for="(parent, parentIndex) in ladder"
      :key="parentIndex"
      class="ladder-item"
    >
      <!-- Parent Checkbox -->
      <Checkbox
        v-model="parent.active"
        :level="parent.level"
        :index="parentIndex"
        @update:modelValue="saveUpdate"
      />

      <!-- Child Checkboxes -->
      <div
        v-if="parent.active && parent.children.length"
        class="child-container mt-2"
      >
        <div
          v-for="(child, childIndex) in parent.children"
          :key="childIndex"
          class="ladder-item"
        >
          <Checkbox
            v-model="child.active"
            :level="child.level"
            :index="childIndex"
            @update:modelValue="saveUpdate"
          />

          <!-- Sub-child Checkboxes -->
          <div
            v-if="child.active && child.children.length"
            class="sub-child-container mt-2"
          >
            <div
              v-for="(subChild, subChildIndex) in child.children"
              :key="subChildIndex"
              class="ladder-item"
            >
              <Checkbox
                v-model="subChild.active"
                :level="subChild.level"
                :index="subChildIndex"
                @update:modelValue="saveUpdate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ladder-container {
  display: flex;
  flex-direction: column;
}

.ladder-item {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  transform: scale(1.5);
  margin-right: 0.5rem;
}

.child-container,
.sub-child-container {
  margin-left: 14rem;
}

.mt-2 {
  margin-top: 2rem;
}
</style>
