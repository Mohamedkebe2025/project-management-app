<template>
  <div id="app">
    <div class="header">
      <h1>Project Manager</h1>
    </div>
    <SpaceList @space-selected="handleSpaceSelection" />
    <router-view></router-view>
  </div>
</template>

<script>
import SpaceList from './components/SpaceList.vue'

export default {
  components: {
    SpaceList
  },
  methods: {
    handleSpaceSelection(space) {
      this.$router.push({ name: 'Lists', params: { spaceId: space.id } })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
</style>
