<template>
  <div>
    <label v-if="label">{{ label }}
    </label>
    <input
      ref="input"
      :title="title"
      :value="value"
      :class="inputClass"
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
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      isActiveFocus: false,
      isValid: false,
      title: "",
    };
  },
};
</script>
