<template>
  <div v-if="todo.taskName">
    <h1>({{ todo.scoreTotal }}) {{ todo.taskName }}</h1>
    <p>{{ todo.taskDescription }}</p>
    <p>Created at: {{ todo.createdAt }}</p>
    <p>Updated at: {{ todo.updatedAt }}</p>
  </div>
</template>

<script>
export default {
  name: "TodoDetails",
  props: [
      'todo'
  ]
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

div {
  font-family: 'Lato', sans-serif;
  width: 300px;
}

</style>