<template>
  <v-container>
    <v-row class="mt-2">
      <v-col cols="12" sm="8" offset-sm="2" class="wrapper">
        <v-card>
          <v-card-title>
            <h1 class="display-1">Login</h1>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                label="Username"
                type="text"
                name="username"
                prepend-icon="mdi-account-circle"
                v-model="username"
                :error-messages="usernameErrors"
                @blur="$v.username.$touch()"
              />

              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="passwordErrors"
                v-model="password"
                @click:append="showPassword = !showPassword"
                @blur="$v.password.$touch()"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="px-4 py-1" @click="login"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      showPassword: false,
      username: '',
      password: ''
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      if (!this.$v.username.required) errors.push('Username should be valid.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.required) errors.push('Password should be valid.')
      return errors
    }
  },
  methods: {
    login() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('login', {
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$router.push({ name: 'dashboard' })
          })
      }
    }
  },
  created() {
    if (this.$store.getters['loggedIn']) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 460px;
  margin: 0 auto;
}
</style>
