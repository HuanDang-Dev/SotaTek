<template>
  <div class="task">
    <div id="add-task">
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
        <BaseInput
          label="Due Date"
          inputClass="input-date"
          type="date"
        ></BaseInput>
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
  name: "NewTask",
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
    };
  },

  mounted() {
    if (this.newTask.priority) {
      this.selected = this.newTask.priority;
    }
  },

  methods: {
    handleAddTask() {
      if (!this.newTask.title) {
        return false;
      }

      this.newTask.priority = this.selected;

      this.$emit("onSubmit", this.newTask);

      const jsonTask = JSON.stringify([].concat(this.newTask));

      if (!localStorage.TodoList) {
        localStorage.setItem("TodoList", jsonTask);
      } else {
        const storageTodoList = JSON.parse(localStorage.TodoList);
        storageTodoList.push(this.newTask);
        localStorage.setItem("TodoList", JSON.stringify(storageTodoList));
      }

      this.newTask = {};

      alert("Thêm task thành công");
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
  padding: 8px;
  margin-top: 10px;
  box-sizing: border-box;
}

.box-select option {
  width: 100%;
  padding: 8px;
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
  width: 50%;
}
</style>
