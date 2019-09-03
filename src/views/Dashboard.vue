<template>
  <v-container>
    <v-row>
      <template v-for="(card, index) in cards">
        <v-col
          cols="12"
          sm="10"
          offset-sm="1"
          md="6"
          offset-md="0"
          lg="4"
          xl="3"
          :key="index"
        >
          <ApiCard :card="card" :key="index"></ApiCard>
        </v-col>
      </template>
      <v-col v-if="!cards">Nothing to show, create customer first</v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiCard from '../components/ApiCard'

export default {
  components: {
    ApiCard
  },
  computed: {
    cards() {
      return this.$store.getters['getActiveCustomerCards']
    }
  },
  created() {
    // if()
    // console.log(this.customer)
  }
}
</script>

<style lang="scss" scoped></style>
