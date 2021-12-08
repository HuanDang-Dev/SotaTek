<template>
  <div class="todo-list">
    <h1>To Do List</h1>
    <BaseInput
      inputClass="input-search"
      placeholder="Search ..."
      type="text"
      v-model="searchValue"
      @keydown.enter="handleSearch"
    ></BaseInput>
    <div class="table">
      <div class="table-list">
        <TodoItem
          v-for="(item, index) in dataList"
          :key="index"
          :todoItem="item"
          @update="updateData($event, index)"
          @removeItem="removeItem($event)"
        ></TodoItem>
      </div>
    </div>
    <div
      class="box-bulk"
      v-show="bulkAction"
    >
      <h5>Bulk Action:</h5>
      <div class="box-option">
        <BaseButton buttonClass="btn btn-done btn-lg">Done</BaseButton>
        <BaseButton
          @click="remove"
          buttonClass="btn btn-red btn-lg"
        >Remove</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import TodoItem from "@/components/TodoItem.vue";
import BaseInput from "@/components/base/BaseInput.vue";
export default {
  name: "TodoList",
  props: {
    addTask: Object,
  },
  components: {
    TodoItem,
    BaseInput,
    BaseButton,
  },

  data() {
    return {
      searchValue: "",
      listTodo: [
        {
          id: 0,
          check: false,
          title: "Do my homework",
          des: "description ok",
          priority: "Normal",
          dueDate: "2000-04-29",
          btn: "Update",
        },
      ],
      dataList: [],
      height: 0,
    };
  },

  mounted() {
    const me = this;

    if (localStorage.TodoList) {
      const storageTodoList = JSON.parse(localStorage.TodoList);

      const count = storageTodoList.map(function (db, index) {
        return {
          id: me.listTodo.length + index,
          check: false,
          btn: "Update",
          ...db,
        };
      });

      me.listTodo = [...me.listTodo, ...count];
    }
    me.handleSearch();
  },

  watch: {
    addTask() {
      const newTask = {
        id: this.listTodo.length,
        check: false,
        btn: "Update",
        dueDate: "",
        ...this.addTask,
      };

      this.listTodo.push(newTask);

      this.handleSearch();
    },

    dataList() {
      this.sortList();
    },
  },

  computed: {
    bulkAction() {
      let count = this.dataList.filter(function (db) {
        return db.check == true;
      });

      // Nếu có nhiều hơn 1 ô được tích thì sẽ hiện bảng bulk action
      if (count.length >= 2) {
        return true;
      }

      return false;
    },
  },

  methods: {
    removeItem(id) {
      if (confirm("Bạn muốn xóa hành động này!")) {
        let count = this.listTodo.filter(function (db) {
          return db.id !== id;
        });

        this.listTodo = count;

        this.handleSearch();
      }
    },

    remove() {
      if (confirm("Bạn muốn xóa tất cả hành động đã chọn!")) {
        const count = this.dataList.filter(function (db) {
          return db.check !== true;
        });

        this.listTodo = count;

        this.handleSearch();
      }
    },

    handleSearch() {
      var me = this;

      me.dataList = me.listTodo.filter(function (db) {
        return (
          db.title.toLowerCase().indexOf(me.searchValue.toLowerCase()) >= 0
        );
      });
    },

    updateData(data, index) {
      this.dataList[index] = data;
      this.listTodo[this.dataList[index].id] = data;
      this.sortList();
    },

    sortList() {
      this.listTodo = this.listTodo.sort((a, b) => {
        const big = new Date(a.dueDate);
        const small = new Date(b.dueDate);

        return big - small;
      });
    },
  },
};
</script>

<style scoped>
.todo-list {
  width: 100%;
  height: 100%;
}
.todo-list h1 {
  margin-bottom: 32px;
}

.table {
  position: relative;
  width: 100%;
  min-height: 700px;
}

.table-list {
  background-color: #fff;
  margin-top: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 16px;
}

.box-bulk {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-top: 1px solid;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #e3e3e3;
}

.box-option {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-btn {
  margin-left: 0px;
}

@media only screen and (max-width: 456px) {
  /* For mobile phones: */
  .box-bulk {
    flex-direction: column;
    justify-content: center;
    height: 120px;
  }

  .box-bulk h5 {
    margin: 0 16px 16px;
  }
}
</style>
