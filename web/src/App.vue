<template>
  <div id="app">
    <keep-alive :include="$store.getters.keepList">
       <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
