<template>
  <v-card
    class="card"
    :style="{ 'border-color': card.color }"
    hover
    :to="{ name: 'card', params: { card } }"
  >
    <v-card-title>
      <div class="card-title__icon" v-html="card.icon"></div>
      <div class="card-title__text headline">{{ card.title }}</div>
    </v-card-title>
    <v-card-text>{{ shortenedDescription }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    shortenedDescription() {
      if (this.card.description.length <= 160) return this.card.description
      return this.card.description.substr(0, 160) + '...'
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-height: 200px;
  border: 2px solid;
}
.card-title {
  &__text {
    margin-left: 16px;
  }
}
</style>
