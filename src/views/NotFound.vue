<template>
  <div class="block">
    <h1 class="display-1">Oops!</h1>
    <h3 class="headline">The {{ resource }} you're looking for is not here.</h3>
    <router-link to="/">Back to the home page</router-link>
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      default: () => 'page'
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 40px auto 0;
  padding: 0 10px;
  max-width: 460px;
  h1 {
    margin-bottom: 12px;
  }
  h3 {
    margin-bottom: 8px;
  }
  a {
    font-size: 1.15em;
    text-decoration: none;
  }
}
</style>
