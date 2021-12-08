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
      <div :class="dataList.length > 6 ? 'table-list scroll' : 'table-list'">
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
          btn: "Update",
        },
      ],
      dataList: [],
    };
  },

  mounted() {
    const me = this;
    // Nếu là null hoặc undefined thì sẽ là chuỗi rỗng
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
        ...this.addTask,
      };

      this.listTodo.push(newTask);

      this.handleSearch();
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
  height: calc(100% - 200px);
}

.table-list {
  position: absolute;
  background-color: #fff;
  margin-top: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* Nếu danh sách trên 6 phần tử thì sẽ mở ra bảng cuộn*/
.scroll {
  overflow: scroll;
}

.box-bulk {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
  position: absolute;
  right: 0;
}

.box-btn {
  margin-left: 0px;
}
</style>
