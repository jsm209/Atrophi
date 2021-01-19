<template>
  <div>
    <form id="todoForm">
      <label>What is the task?</label>
      <input type="text" v-model="taskName">

      <label>Task notes</label>
      <input type="text" v-model="taskDescription">

      <label>How long to do?</label>
      <select v-model="scoreTime">
        <option selected="selected" disabled value="0">Please select one</option>
        <option value="1">30 minutes or less</option>
        <option value="2">30 minutes to an hour</option>
        <option value="3">1-3 hours</option>
        <option value="5">3-6 hours</option>
        <option value="8">6+ hours</option>
      </select>

      <label>How much concentration does it need?</label>
      <select v-model="scoreEffort">
        <option selected="selected" disabled value="0">Please select one</option>
        <option value="1">Mindless task, can do it without thinking.</option>
        <option value="2">Easy task, can confidently complete with zero foreseeable problems.</option>
        <option value="3">Normal task, requires some thinking but will not have difficult problems.</option>
        <option value="5">Hard task, requires significant thinking and multiple problems to solve.</option>
        <option value="8">Very hard task, requires significant learning or has unknown problems.</option>
      </select>

      <label>How much will it hurt to NOT do this task?</label>
      <select v-model="scoreHurt">
        <option selected="selected" disabled value="0">Please select one</option>
        <option value="1">Completely optional, not necessary for anything at all.</option>
        <option value="2">Tiny damage, a nice to have task.</option>
        <option value="3">Small damage, it will take time to forget about it.</option>
        <option value="5">Will damage, not doing this will hurt significantly.</option>
        <option value="8">Life threatening, if you don't do this it will significantly impact your life.</option>
      </select>

      <label>How soon do you need to get this done?</label>
      <select v-model="scoreUrgency">
        <option selected="selected" disabled value="0">Please select one</option>
        <option value="3">Never urgent, can do it whenever it needs to be done.</option>
        <option value="5">Little urgency, the sooner the better but there are no deadlines.</option>
        <option value="8">Urgent, there is a deadline, but it's more than a week away.</option>
        <option value="13">Very urgent, this is something that needs to be done this week.</option>
        <option value="21">Necessary, should be done either today or in the next few days.</option>
      </select>

      <button v-on:click="onTaskSubmit">Add task</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
    return {
      taskName: "",
      taskDescription: "",
      scoreTime: 0,
      scoreEffort: 0,
      scoreHurt: 0,
      scoreUrgency: 0,
    }
  },
  methods: {
    onTaskSubmit(event) {
      event.preventDefault();

      let newTask = {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        scoreTime: parseInt(this.scoreTime),
        scoreEffort: parseInt(this.scoreEffort),
        scoreHurt: parseInt(this.scoreHurt),
        scoreUrgency: parseInt(this.scoreUrgency),
        scoreTotal: parseInt(this.scoreTime) + parseInt(this.scoreEffort) + parseInt(this.scoreHurt) + parseInt(this.scoreUrgency),
        completed: false,
        archived: false
      };
      this.$emit('submit-new-task', newTask);

      // Clear form and reset data
      document.getElementById("todoForm").reset();
      this.taskName = "";
      this.taskDescription = "";
      this.scoreTime = 0;
      this.scoreEffort = 0;
      this.scoreHurt = 0;
      this.scoreUrgency = 0;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

  div {
    font-family: 'Lato', sans-serif;
    width: 300px;
  }

  label, select, input {
    display: block;
  }

  label, button {
    margin-top: 30px;
  }
</style>