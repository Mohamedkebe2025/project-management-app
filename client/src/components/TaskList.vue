<template>
  <div>
    <h3>Tasks in List: {{ listName }}</h3>
    <input v-model="newTaskDescription" placeholder="New Task description" />
    <button @click="addTask">Add Task</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :checked="task.completed" @change="toggleComplete(task)" />
        <span :class="{ completed: task.completed }">{{ task.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['listId', 'listName'],
  data() {
    return {
      tasks: [],
      newTaskDescription: '',
    };
  },
  watch: {
    listId: 'fetchTasks',
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      if (!this.listId) {
        this.tasks = [];
        return;
      }
      try {
        const response = await axios.get(`/api/tasks/list/${this.listId}`);
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask() {
      try {
        await axios.post('/api/tasks', { description: this.newTaskDescription, listId: this.listId, completed: false });
        this.newTaskDescription = '';
        this.fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async toggleComplete(task) {
      try {
        await axios.put(`/api/tasks/${task.id}`, { completed: !task.completed });
        this.fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
