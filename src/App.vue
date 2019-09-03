<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link :to="{ name: 'dashboard' }" class="title-link">API Dashboard</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-if="loggedIn">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">{{ selectorTitle }}</v-btn>
            </template>
            <v-list>
              <div v-if="customers.length === 0">
                <v-btn text active-class="pure" :to="{ name: 'settings' }">Creaet new customer</v-btn>
              </div>
              <v-list-item
                v-for="customer in customers"
                :key="customer.id"
                @click="selectCustomer(customer.id)"
              >
                <v-list-item-title>
                  {{
                  customer.name + ' ' + customer.surname
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-btn :to="{ name: 'settings' }" text icon>
          <v-icon dark>mdi-settings-outline</v-icon>
        </v-btn>
        <v-btn text rounded @click="logout">Logout</v-btn>
      </template>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    {{ customers }}
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['customers']),
    activeCustomer() {
      console.log('activeCustomer is ...')
      console.log(this.$store.getters['getActiveCustomer'])
      return this.$store.getters['getActiveCustomer']
    },
    selectorTitle() {
      console.log('call title')
      if (this.activeCustomer) {
        return (
          'Active customer: ' +
          this.activeCustomer.name +
          ' ' +
          this.activeCustomer.surname
        )
      }
      return 'Select customer'
    },
    loggedIn() {
      return this.$store.getters['loggedIn']
    }
  },
  methods: {
    selectCustomer(id) {
      this.$store.dispatch('selectCustomer', id)
      console.log('Selecting customer ' + id)
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.pure::before {
  background-color: transparent;
}
.title-link {
  color: inherit;
  text-decoration: none;
}
</style>
