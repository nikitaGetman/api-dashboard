<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link :to="{ name: 'dashboard' }" class="title-link"
          >API Dashboard</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-if="loggedIn">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text rounded v-on="on">{{ selectorTitle }}</v-btn>
            </template>
            <v-list>
              <div v-if="customers.length === 0">
                <v-btn text active-class="pure" :to="{ name: 'settings' }"
                  >Creaet new customer</v-btn
                >
              </div>
              <v-list-item
                v-for="customer in customers"
                :key="customer.id"
                @click="selectCustomer(customer.id)"
              >
                <v-list-item-title>
                  {{ customer.name + ' ' + customer.surname }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-btn :to="{ name: 'settings' }" text rounded class="mx-4">
          <v-icon dark>mdi-settings-outline</v-icon>
        </v-btn>
        <v-btn text rounded @click="logout">Logout</v-btn>
      </template>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['customers']),
    activeCustomer() {
      return this.$store.getters['getActiveCustomer']
    },
    selectorTitle() {
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
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
.pure::before {
  background-color: transparent !important;
}
.title-link {
  color: inherit !important;
  text-decoration: none;
}
</style>
