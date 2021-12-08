<template>
  <div class="task">
    <div>
      <BaseInput
        inputClass="input-search"
        :placeholder="!newTask.title ? 'Add new task ...' : newTask.title"
        type="text"
        v-model="newTask.title"
      ></BaseInput>
      <div class="box description">
        <label>Description</label>
        <textarea
          rows="6"
          name="des"
          form="add-task"
          v-model="newTask.des"
        />
      </div>
      <div class="box-priority">
        <div class="box-date">
          <div class="due-date">
            <div class="date-text">{{ showDate || date || this.formatDate(new Date())}}</div>
          </div>
          <BaseInput
            label="Due Date"
            inputClass="input-date"
            type="date"
            v-model="date"
          ></BaseInput>
        </div>
        <div class="box box-select">
          <label>Priority</label>
          <select v-model="selected">
            <option
              v-for="(value, index) in priority"
              :key="index"
              :value="value"
            >{{ value }}</option>
          </select>
        </div>
      </div>
      <BaseButton
        @click="handleAddTask"
        buttonClass="btn btn-green"
      >{{ !newTask.btn ? 'Add' : newTask.btn }}</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";

export default {
  name: "Task",
  props: {
    task: Object,
  },
  components: {
    BaseButton,
    BaseInput,
  },

  data() {
    return {
      selected: "Low",
      priority: ["Low", "Normal", "High"],
      newTask: { ...this.task },
      date: "",
      showDate: "",
    };
  },

  mounted() {
    if (this.newTask.priority) {
      this.selected = this.newTask.priority;
    }
    this.showDate = this.formatDate(this.newTask.dueDate);
  },

  watch: {
    date() {
      this.newTask.dueDate = this.date;
      this.showDate = this.formatDate(this.date);
    },
  },

  methods: {
    handleAddTask() {
      if (!this.newTask.title || !this.newTask.dueDate) {
        return false;
      }

      this.newTask.priority = this.selected;

      this.$emit("onSubmit", this.newTask);

      if (!this.newTask.btn === "update") {
        // Lưu dữ liệu vào localStorage
        const jsonTask = JSON.stringify([].concat(this.newTask));

        if (!localStorage.TodoList) {
          localStorage.setItem("TodoList", jsonTask);
        } else {
          const storageTodoList = JSON.parse(localStorage.TodoList);
          storageTodoList.push(this.newTask);
          localStorage.setItem("TodoList", JSON.stringify(storageTodoList));
        }
      }

      // Đưa về giá trị mặc định
      this.newTask = {};
      this.showDate = "";
      this.date = "";
      this.selected = "Low";

      alert("Thêm task thành công");
    },

    formatDate(date) {
      if (!date) {
        return "";
      }
      var dateTime = new Date(date);
      if (Number.isNaN(dateTime.getTime())) {
        return "";
      } else {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        return (
          dateTime.getDate() +
          " " +
          month[dateTime.getMonth()] +
          " " +
          dateTime.getFullYear()
        );
      }
    },
  },
};
</script>

<style scoped>
.box-select {
  width: 50%;
}

.box-select select {
  width: 100%;
  padding: 9px;
  margin-top: 10px;
  box-sizing: border-box;
}

.description textarea {
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
}

.box-btn {
  margin-top: 48px;
}

.box-priority {
  display: flex;
}

.box-priority .box-input {
}

.box-date {
  position: relative;
  width: 50%;
}

.due-date {
  position: absolute;
  top: 45px;
  left: 17px;
  right: 56px;
  background: #fff;
  height: 38px;
  border-right: 1px solid;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
</style>
