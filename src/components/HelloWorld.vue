<script setup lang="ts">

defineProps<{ msg: string }>()

async function connectToFtp() {
  await window.electronAPI.connectToBlobStorage()
  window.electronAPI.uploadBlobToDataStorage();
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <h2>FPS CLIENT</h2>

  <button @click="connectToFtp();">
    Create CONTAINER
  </button>

</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
