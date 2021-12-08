<template>
  <div class="home">
    <div class="new-task">
      <h2>New Task</h2>
      <Task @onSubmit="addTask($event)"></Task>
    </div>
    <div class="list">
      <TodoList :addTask="newTodo"></TodoList>
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
  data() {
    return {
      newTodo: {},
    };
  },
  methods: {
    addTask(data) {
      this.newTodo = data;
    },
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
  width: 80%;
  margin: 16px auto;
}

.new-task {
  width: 41.66%;
  padding: 16px;
  border-right: 1px solid #000;
}

.list {
  width: 58.33%;
  padding: 16px;
  position: relative;
  padding-bottom: 80px;
}

.new-task .task {
  margin-top: 32px;
}

@media only screen and (max-width: 1080px) {
  /* For mobile phones: */
  .home {
    width: 100%;
  }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .home {
    flex-direction: column;
  }

  .new-task {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #000;
    padding: 16px 0 32px 0;
  }

  .list {
    width: 100%;
    padding: 16px 0 120px 0;
  }
}
</style>
