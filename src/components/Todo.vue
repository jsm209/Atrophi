<template>
  <div>
    <div class="border" v-on:click="onTaskSelect">
      <div class="labels">
        <span class="scoreLabel">{{todo.scoreTotal}}</span>
        <span class="todoLabel">{{ todo.taskName }}</span>
      </div>
      <div class="controls">
        <img v-if="!todo.completed" src="../assets/check.png" v-on:click="onTaskComplete"/>
        <img v-if="!todo.archived" src="../assets/clear.png" v-on:click="onTaskArchive"/>
      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: "Todo",
  props: [
      "todo"
  ],
  methods: {
    onTaskComplete() {
      this.$emit('complete-task', this.todo);
    },
    onTaskArchive() {
      this.$emit('archive-task', this.todo);
    },
    onTaskSelect() {
      this.$emit('select-task', this.todo);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
.todoLabel {
  font-family: 'Lato', sans-serif;
  color: black;
  font-size: 16px;
}

.border {
  background-color: #ddd;
  border: none;
  padding: 10px 20px;
  width: 90%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  text-align: left;
}

.scoreLabel {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: bold;
  padding-right: 15px;
}

img {
  display: inline-block;
  height: auto;
  width: 20px;
  padding: 10px;
}
</style>