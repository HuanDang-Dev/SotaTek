<template>
  <div class="home">
    <div class="new-task">
      <h2>New Task</h2>
      <Task></Task>
    </div>
    <div class="list">
      <TodoList></TodoList>
    </div>
  </div>
</template>

<script>
import Task from "./Task.vue";
import TodoList from "./TodoList.vue";
export default {
  name: "Home",
  components: {
    Task,
    TodoList,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  border: 1px solid #000;
}

.new-task {
  width: 40%;
  padding: 16px;
  border-right: 1px solid #000;
}

.list {
  width: 60%;
  padding: 16px;
  position: relative;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
