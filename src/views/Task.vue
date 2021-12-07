<template>
  <div class="task">
    <form
      action="#"
      id="add-task"
    >
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
          <select id="priority">
            <option
              v-for="(value, index) in priority"
              :key="index"
              :value="value"
              :selected="value === newTask.priority ? true : false"
            >{{ value }}</option>
          </select>
        </div>
      </div>
      <BaseButton
        @click="submit"
        buttonClass="btn btn-green"
      >{{ !newTask.btn ? 'Add' : newTask.btn }}</BaseButton>
    </form>
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
      priority: ["Low", "Normal", "High"],
      newTask: {
        ...this.task,
      },
    };
  },
  methods: {
    submit() {},
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
</style>
