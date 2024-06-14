<template>
  <span @click="toggleCheckbox">
    <input type="checkbox" :checked="modelValue" />
    <label>{{ level }} {{ index + 1 }}</label>
  </span>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const toggleCheckbox = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  transform: scale(1.5);
  margin-right: 10px;
  vertical-align: middle;
}
</style>
