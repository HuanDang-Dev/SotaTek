import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TodoList from "../views/TodoList.vue";
import NewTask from "../views/Task.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todoList",
    name: "TodoList",
    component: TodoList,
  },
  {
    path: "/newTask",
    name: "NewTask",
    component: NewTask,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
