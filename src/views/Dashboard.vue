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
      <v-col v-if="!cards" class="text-center mt-10">
        <div class="headline mb-6">
          API cards list is empty. It looks like you don`t create any customer
          yet.
        </div>
        <v-btn rounded outlined large :to="{ name: 'settings' }" class="link"
          >Click to create customer</v-btn
        >
      </v-col>
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
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: inherit;
}
</style>
