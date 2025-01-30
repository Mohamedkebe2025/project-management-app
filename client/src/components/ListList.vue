<template>
  <div>
    <h3>Lists in Space: {{ spaceName }}</h3>
    <input v-model="newListName" placeholder="New List name" />
    <button @click="addList">Add List</button>
    <ul>
      <li v-for="list in lists" :key="list.id">
        {{ list.name }}
        <button @click="selectList(list)">View Tasks</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['spaceId', 'spaceName'],
  data() {
    return {
      lists: [],
      newListName: '',
    };
  },
  watch: {
    spaceId: 'fetchLists',
  },
  mounted() {
    this.fetchLists();
  },
  methods: {
    async fetchLists() {
      if (!this.spaceId) {
        this.lists = [];
        return;
      }
      try {
        const response = await axios.get(`/api/lists/space/${this.spaceId}`);
        this.lists = response.data;
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    },
    async addList() {
      try {
        await axios.post('/api/lists', { name: this.newListName, spaceId: this.spaceId });
        this.newListName = '';
        this.fetchLists();
      } catch (error) {
        console.error('Error adding list:', error);
      }
    },
    selectList(list) {
      this.$emit('list-selected', list);
    },
  },
};
</script>
