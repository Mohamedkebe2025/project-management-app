<template>
  <div>
    <h2>Spaces</h2>
    <input v-model="newSpaceName" placeholder="New Space name" />
    <button @click="addSpace">Add Space</button>
    <ul>
      <li v-for="space in spaces" :key="space.id">
        {{ space.name }}
        <button @click="selectSpace(space)">View Lists</button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      spaces: [],
      newSpaceName: '',
    };
  },
  mounted() {
    this.fetchSpaces();
  },
  methods: {
    async fetchSpaces() {
      try {
        const response = await this.$axios.get('/spaces');
        this.spaces = response.data;
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    },
    async addSpace() {
      try {
        await this.$axios.post('/spaces', { name: this.newSpaceName });
        this.newSpaceName = '';
        this.fetchSpaces();
      } catch (error) {
        console.error('Error adding space:', error);
      }
    },
    selectSpace(space) {
      this.$emit('space-selected', space);
    },
  },
};
</script>
