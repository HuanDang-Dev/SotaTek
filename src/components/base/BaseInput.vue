<template>
  <div :class="label ? 'box-input box' : 'box-input'">
    <label v-if="label">{{ label }}
    </label>
    <input
      ref="input"
      :class="inputClass"
      :value='modelValue'
      @input='$emit("update:modelValue", $event.target.value)'
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "BaseInput",
  props: {
    inputClass: {
      type: String,
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: String,
  },
};
</script>

<style>
@import "../../assets/css/common/input.css";
</style>
