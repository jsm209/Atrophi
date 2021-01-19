<template>
  <div id="app">
    <div class="flexbox">
      <TodoDetails v-bind:todo="selectedTodo"/>
      <TodoList v-bind:todos="todos" v-on:complete-task="handleCompleteTask" v-on:archive-task="handleArchiveTask" v-on:select-task="handleSelectTask" title="Todo"/>
      <TodoForm v-on:submit-new-task="handleNewTask"/>
    </div>

    <button v-on:click="sortBy('scoreTotal')">SORT BY SCORE TOTAL</button>
    <button v-on:click="buttonTest">TEST</button>
  </div>
</template>

<script>

// Components
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoDetails from "./components/TodoDetails";

// Services
import DataService from "./services/DataService";


export default {
  name: 'App',
  components: {
    TodoList,
    TodoForm,
    TodoDetails
  },

  // When the app starts, we want to retrieve all the todos
  // And whenever the value of this changes, we want to update our data.
  created: function() {
    this.getAllTodos();
  },
  methods: {
    getAllTodos() {
      // Get all todos
      DataService.getAll().on('value', (res) => {

        console.log(res.val())

        let data = res.val();
        let newTodos = [];

        // Setting item IDs to match Firebase IDs
        for (const property in data) {
          let item = data[property];
          item.id = property;
          newTodos.push(item);
        }

        // Update our todos with the new data
        this.todos = newTodos
      });
    },
    handleNewTask(task) {
      task.id = Math.random().toString(36).substr(2, 10);

      DataService.create(task.id, task)
      .then(() => {
        console.log("Created a new item successfully!");
        //this.todos.push(task); no need, firebase reference automatically updates
      })
      .catch(error => {
        console.log(error);
      });
    },

    handleCompleteTask(task) {
      let updatedTask = task;
      updatedTask.completed = true;
      updatedTask.archived = false;

      DataService.update(task.id, updatedTask)
          .then(() => {
            console.log("Updated a new item successfully!");
          })
          .catch(error => {
            console.log(error);
          });
    },

    handleArchiveTask(task) {
      let updatedTask = task;
      updatedTask.completed = false;
      updatedTask.archived = true;

      DataService.update(task.id, updatedTask)
          .then(() => {
            console.log("Updated a new item successfully!");
          })
          .catch(error => {
            console.log(error);
          });
    },

    handleSelectTask(task) {
      if (this.selectedTodo == task) {
        this.selectedTodo = {};
      } else {
        this.selectedTodo = task;
      }
    },

    // Given a property, will sort the todos by that property
    // in descending order, and replace the array with the new
    // order.
    sortBy(property) {
      console.log(this.todos.sort(this.propComparator(property)));
    },

    // Will return a sorting function that can be used
    // to compare objects by a given property in an array.
    propComparator(property) {

      // Given two objects and a property shared by both, will return
      // -1 if a is greater than b in that property
      // 1 if a is less than b in that property
      // 0 if and b are equal in that property
      // (aka descending order)
      return function(a, b) {
        return b[property] - a[property];
      }
    },

    // Given an array with objects and a given ID,
    // will return the index of the object with the ID.
    indexOfObjectByID(array, id) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
          return i;
        }
      }
      return -1;
    },

    buttonTest() {




    }

  },
  data() {
    return {
      currentID: 0,
      selectedTodo: {},
      todos: [
        {
          id: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          taskName: "test task",
          taskDescription: "small description",
          scoreTime: 1,
          scoreEffort: 1,
          scoreHurt: 1,
          scoreUrgency: 1,
          scoreTotal: 1,
          completed: false,
          archived: false
        },
        {
          id: 1,
          createdAt: 0,
          updatedAt: Date.now() - 86400 * 4,
          taskName: 'Go workout',
          taskDecription: "",
          scoreTotal: 1,
          completed: false,
          archived: false
        },
        {
          id: 2,
          createdAt: 0,
          taskName: 'Do laundry',
          taskDecription: "",
          scoreTotal: 2,
          completed: false,
          archived: false
        },
        {
          id: 3,
          createdAt: 0,
          taskName: 'Cook food',
          taskDecription: "",
          scoreTotal: 3,
          completed: false,
          archived: false
        },
        {
          id: 4,
          createdAt: 0,
          taskName: 'Clean up room',
          taskDecription: "",
          scoreTotal: 4,
          completed: false,
          archived: false
        },
        {
          id: 5,
          createdAt: 0,
          taskName: 'Finish work',
          taskDecription: "",
          scoreTotal: 5,
          completed: false,
          archived: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.flexbox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
