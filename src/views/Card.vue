<template>
  <v-container>
    <v-row>
      <v-col class="content">
        <!-- Description -->
        <div class="card-data">
          <div class="card-data__title">{{ card.title }}</div>
          <div class="card-data__icon" v-html="card.icon"></div>
          <div class="card-data__source">
            Source:
            <a :href="card.link" target="_blamk">{{ card.link }}</a>
          </div>
          <div class="card-data__description">{{ card.description }}</div>
        </div>

        <!-- Results -->
        <div class="request-data">
          <div class="request-data__request">
            <div class="title">
              Request:
              <span class="caption">{{
                activeRequest ? '' : '(select any reqest in grid)'
              }}</span>
            </div>
            <div class="code">
              <pre>{{ activeRequest ? 'GET: ' + activeRequest.url : ' ' }}</pre>
            </div>
          </div>
          <div class="request-data__response">
            <div class="title">Response:</div>
            <div class="code">
              <pre>{{ activeRequest ? activeRequest.response : ' ' }}</pre>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div class="table">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">URL</th>
                <th class="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(request, index) in requests"
                :key="index"
                @click="openRequest(request)"
              >
                <td class="table__url-column" width="80%">{{ request.url }}</td>
                <td class="table__status-column text-center" width="20%">
                  <!-- Done icon -->
                  <v-tooltip right v-if="request.status === 'done'">
                    <template v-slot:activator="{ on }">
                      <v-icon class="icon_done" v-on="on">mdi-check</v-icon>
                    </template>
                    <span>Done</span>
                  </v-tooltip>
                  <!-- Failed icon -->
                  <v-tooltip right v-if="request.status === 'failed'">
                    <template v-slot:activator="{ on }">
                      <v-icon class="icon_failed" v-on="on"
                        >mdi-alert-circle-outline</v-icon
                      >
                    </template>
                    <span>Failed</span>
                  </v-tooltip>
                  <!-- Waiting icon -->
                  <v-tooltip right v-if="request.status === 'waiting'">
                    <template v-slot:activator="{ on }">
                      <v-icon class="icon_waiting" v-on="on"
                        >mdi-clock-out</v-icon
                      >
                    </template>
                    <span>Waiting for response</span>
                  </v-tooltip>
                  <!-- Ready icon -->
                  <v-tooltip right v-if="request.status === 'ready'">
                    <template v-slot:activator="{ on }">
                      <v-icon class="icon_ready" v-on="on"
                        >mdi-clock-outline</v-icon
                      >
                    </template>
                    <span>Is not sent yet</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      requests: [],
      activeRequest: null
    }
  },
  computed: mapState(['activeCustomerId']),
  methods: {
    callAllApiRequests() {
      let activeRequest = null

      for (const r of this.requests) {
        if (r.status === 'ready') {
          activeRequest = r
          break
        }
      }
      if (activeRequest === null) return

      activeRequest.status = 'waiting'

      axios
        .get(activeRequest.url)
        .then(response => {
          activeRequest.response = response.data
          activeRequest.status = 'done'
          this.callAllApiRequests()
        })
        .catch(err => {
          activeRequest.response = err
          activeRequest.status = 'failed'
          this.callAllApiRequests()
        })
    },
    openRequest(request) {
      this.activeRequest = request
    }
  },
  watch: {
    activeCustomerId() {
      this.$router.push({ name: 'dashboard' })
    }
  },
  created() {
    if (!this.card) this.$router.push({ name: 'dashboard' })

    for (const request of this.card.requests) {
      this.requests.push({ url: request, status: 'ready' })
    }

    this.callAllApiRequests()
  }
}
</script>

<style lang="scss" scoped>
.content {
  max-width: 1200px;
  margin: 4px auto 80px;
}
.icon {
  &_done {
    color: #388e3c;
  }
  &_failed {
    color: #d32f2f;
  }
  &_waiting {
    color: #1976d2;
  }
  &_ready {
    color: #fbc02d;
  }
}
.card-data {
  margin-bottom: 32px;

  &__title {
    float: left;
    font-size: 3em;
    margin: 8px 0;
  }
  &__icon {
    float: right;
    width: 128px;
    height: 128px;
    transform: scale(2);
    transform-origin: 0 0;
  }
  &__source {
    clear: left;
    font-size: 1.2em;
    margin-bottom: 8px;
    a {
      text-decoration: none;
    }
  }
  &__description {
    font-size: 1.15em;
  }
}

.request-data {
  margin-bottom: 32px;

  .code {
    margin-bottom: 8px;
    padding: 8px 24px;
    background-color: #eeeeee;
    border-radius: 8px;
    overflow: auto;
    max-height: 720px;
  }
}
</style>
