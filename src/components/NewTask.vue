<template>
  <div class="task">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "NewTask",
  props: {
    msg: String,
  },
};
</script>
