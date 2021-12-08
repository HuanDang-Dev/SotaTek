<template>
  <div class="todo-item">
    <div class="box-item">
      <div class="input-checkbox">
        <BaseButton
          class="btn-white"
          @click="handleCheckbox"
        >
          <div v-show="dataUpdate.check">
            <i class="fas fa-check"></i>
          </div>
        </BaseButton>
      </div>
      <h5>{{ dataUpdate.title }}</h5>
      <div class="box-option">
        <BaseButton
          @click="detail"
          buttonClass="btn btn-blue"
        >Detail</BaseButton>
        <BaseButton
          @click="remove"
          buttonClass="btn btn-red"
        >Remove</BaseButton>
      </div>
    </div>
    <div
      class="detail-item"
      v-if="isDetail"
    >
      <Task
        :task="dataUpdate"
        @onSubmit="handleUpdate($event)"
      ></Task>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import Task from "@/views/Task.vue";
export default {
  name: "TodoItem",
  props: {
    todoItem: Object,
  },

  components: {
    BaseButton,
    Task,
  },

  data() {
    return {
      dataUpdate: {
        ...this.todoItem,
      },
      isDetail: false,
    };
  },

  watch: {
    todoItem() {
      this.dataUpdate = { ...this.todoItem };
    },
  },

  methods: {
    handleCheckbox() {
      this.dataUpdate.check = !this.dataUpdate.check;
      this.$emit("update", this.dataUpdate);
    },
    detail() {
      this.isDetail = !this.isDetail;
    },
    remove() {
      this.isDetail = false;
      this.$emit("removeItem", this.dataUpdate.id);
    },
    handleUpdate(data) {
      this.isDetail = false;
      this.dataUpdate = data;
    },
  },
};
</script>

<style scoped>
.box-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 16px;
  margin-bottom: 0;
  height: 80px;
  border: 1px solid;
  position: relative;
}

.input-checkbox {
  outline: none;
  border: 1px solid #000;
  background: #fff;
  cursor: pointer;
  margin: 0;
  position: relative;
  top: 0px;
  left: 16px;
  height: 20px;
  width: 20px;
}

.box-option {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
}

button svg {
  position: absolute;
  top: 1px;
  left: 4px;
  font-size: 18px;
}

.box-btn {
  margin-left: 0px;
}

.detail-item {
  border: 1px solid #000;
  border-top: none;
  margin: 0px 16px;
  padding: 16px 0 32px;
  transition: all 1s ease;
}
</style>
