<template>
  <div>
    <!-- v-bind="$attrs"  sử dụng để kế thừa thuộc tính được thêm vào từ cha -->
    <button
      v-bind="$attrs"
      :class="buttonClass"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "BaseButton",
  props: {
    buttonClass: {
      type: String,
    },
  },
};
</script>

