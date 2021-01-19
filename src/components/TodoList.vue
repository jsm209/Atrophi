<template>
  <div>
    <h2>{{ title }}</h2>
    <button v-on:click="setView('new')">Todo</button>
    <button v-on:click="setView('decayed')">Decayed</button>
    <button v-on:click="setView('archived')">Archived</button>
    <button v-on:click="setView('completed')">Completed</button>
    <p>This is my basic list.</p>
    <ul>
      <li v-for="todo in filteredList" v-bind:key="todo.id">
        <Todo v-bind:todo="todo" v-on:complete-task="onTaskComplete" v-on:archive-task="onTaskArchive" v-on:select-task="onTaskSelect"/>
      </li>
    </ul>
  </div>
</template>

<script>
// instead of maintaining this.currentList,
// bind the list to the todos and instead
// make it filter afterwards

import Todo from "./Todo";

export default {
  name: "TodoList",
  components: {
    Todo
  },
  props: [
      "title",
      "todos"
  ],
  data() {
    return {
      currentList: [],
      currentView: "new"
    }
  },
  methods: {
    onTaskComplete(task) {
      this.$emit('complete-task', task);
    },

    onTaskArchive(task) {
      this.$emit('archive-task', task);
    },

    onTaskSelect(task) {
      this.$emit('select-task', task);
    },

    setView(view) {
      this.currentView = view;
    },

    // Will return a boolean if the todos is decayed or not.
    // It is decayed when a certain amount of days have passed.
    isTodoDecayed(todo, numDays) {
      // 86400 is number of seconds in 1 day (unix epoch time)
      return (Date.now() - todo.updatedAt > 86400 * numDays);
    }
  },
  computed: {
    filteredList: function() {
      let filteredList = [];
      for (let i = 0; i < this.todos.length; i++) {
        // Get the todos that are not completed or archived if we're on the new todos screen.
        let currentTodo = this.todos[i];
        if (this.currentView == "new" && !currentTodo.completed && !currentTodo.archived && !this.isTodoDecayed(currentTodo, 3)) {
          filteredList.push(currentTodo);

        // Get the todos that are completed and not archived if we're on the complete screen. Doesn't matter if they're decayed.
        } else if (this.currentView == "completed" && currentTodo.completed && !currentTodo.archived) {
          filteredList.push(currentTodo);

        // Get the todos that are archived and not yet completed if we're on the archive screen. Doesn't matter if they're decayed.
        } else if (this.currentView == "archived" && currentTodo.archived && !currentTodo.completed) {
          filteredList.push(currentTodo);

        // Get the todos that are decayed and not yet completed or archived if we're on the decay screen.
        } else if (this.currentView == "decayed" && !currentTodo.archived && !currentTodo.completed && this.isTodoDecayed(currentTodo, 3)) {
          filteredList.push(currentTodo);
        }
      }
      return filteredList;


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
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>