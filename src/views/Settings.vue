<template>
  <v-form>
    <v-container>
      <v-row class="mt-4">
        <v-col
          cols="12"
          md="8"
          offset-md="2"
          xl="6"
          offset-xl="3"
          class="relative"
        >
          <h3 class="headline mb-4">{{ formTitle }}</h3>
          <v-text-field
            v-model="name"
            label="Name"
            :error-messages="nameErrors"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="surname"
            label="Surname"
            :error-messages="surnameErrors"
            @blur="$v.surname.$touch()"
          ></v-text-field>
          <v-textarea v-model="about" color="teal">
            <template v-slot:label>
              <div>
                Bio
                <small>(optional)</small>
              </div>
            </template>
          </v-textarea>

          <template v-if="!isNew">
            <v-btn @click="updateActiveCustomer" color="primary" class="mr-4">
              <v-icon small left>mdi-refresh</v-icon>Update
            </v-btn>
            <v-btn @click="unselectActiveCustomer" right absolute
              >Create new customer</v-btn
            >
          </template>
          <template v-else>
            <v-btn @click="addNewCustomer" color="primary" class="mr-4">
              <v-icon small left>mdi-plus</v-icon>Add
            </v-btn>
            <v-btn
              @click="selectActiveCustomer"
              right
              absolute
              v-if="activeCustomerData"
              >Update active customer</v-btn
            >
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      name: '',
      surname: '',
      about: '',
      isNew: true
    }
  },
  validations: {
    name: { required },
    surname: { required }
  },
  computed: {
    activeCustomerData() {
      return this.$store.getters['getActiveCustomer']
    },
    formTitle() {
      if (!this.isNew) {
        return (
          'Update customer: ' +
          this.activeCustomerData.name +
          ' ' +
          this.activeCustomerData.surname
        )
      }
      return 'Create new customer:'
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      if (!this.$v.name.required) errors.push('Name is required.')
      return errors
    },
    surnameErrors() {
      const errors = []
      if (!this.$v.surname.$dirty) return errors
      if (!this.$v.surname.required) errors.push('Surname is required.')
      return errors
    }
  },
  watch: {
    activeCustomerData: function(newCustomer) {
      this.setData(newCustomer)
    }
  },
  methods: {
    setData(customer) {
      this.$v.$reset()
      this.name = customer.name
      this.surname = customer.surname
      this.about = customer.about
      if (this.name === '' && this.surname === '') {
        this.isNew = true
      } else {
        this.isNew = false
      }
    },
    addNewCustomer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          name: this.name,
          surname: this.surname,
          about: this.about
        }
        this.$store.dispatch('createCustomer', data)
      }
    },
    updateActiveCustomer() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          name: this.name,
          surname: this.surname,
          about: this.about
        }
        this.$store.dispatch('updateCustomer', data)
      }
    },
    unselectActiveCustomer() {
      this.setData({ name: '', surname: '', about: '' })
    },
    selectActiveCustomer() {
      this.setData(this.activeCustomerData)
    }
  },
  mounted() {
    if (this.activeCustomerData) {
      this.setData(this.activeCustomerData)
    }
  }
}
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
</style>
