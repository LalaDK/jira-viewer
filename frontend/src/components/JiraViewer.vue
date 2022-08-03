<template>
  <div>
    <b-container>
      <b-row class="my-3">
        <b-col>
          <b-input-group>
            <b-input-group-prepend>
              <b-button variant="outline-secondary" @click="reverseOrder = !reverseOrder">
                <b-icon-sort-up-alt v-if="reverseOrder"/>
                <b-icon-sort-down-alt v-else/>
              </b-button>
            </b-input-group-prepend>
            <b-form-select v-model="teamName">
              <option value="Panama">Panama</option>
              <option value="Unoung">Unoung</option>
              <option value="Brobygning">Brobygning</option>
            </b-form-select>
            <b-input-group-append>
              <b-button variant="outline-secondary" @click="changeToken">
                Token
              <b-icon-key/>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div v-for="group in issues" :key="group.name" class="group-container">
            <b-badge :style="{ 'background-color': `${groupColors[group.name]} !important` }"
              >{{ group.name }} ({{ group.issues.length }})</b-badge
            >
            <div role="tablist">
              <div class="issues-container">
                <b-accordion flush>
                  <b-accordion-item v-for="issue in group.issues" :key="issue.id">
                    <template #title>
                      <div class="row w-100">
                        <div class="col-9" style="white-space: nowrap">
                          <b-badge
                            class="d-inline-block"
                            style="width: 80px"
                            :style="{ 'background-color': `${groupColors[group.name]} !important` }"
                            >{{ issue.key }}</b-badge
                          >
                          <span class="mx-1 d-inline-block"
                            >{{ issue.fields.summary.truncate(100) }}
                          </span>
                        </div>
                        <div class="col">
                          <span class="small"
                            >{{
                              Date.create().daysSince(Date.create(issue.fields.created))
                            }}
                            dage</span
                          >
                        </div>
                        <div v-if="issue.fields.assignee" class="col">
                          <b-avatar
                            variant="info"
                            size="sm"
                            :text="
                              issue.fields.assignee.displayName
                                .split(' ')
                                .map((e) => e[0])
                                .join('')
                            "
                          ></b-avatar>
                        </div>
                        <div class="col pull-right">
                          <b-badge v-if="issue.fields.comment.comments.length" variant="warning">
                            {{ issue.fields.comment.comments.length }}
                          <b-icon-chat/>
                          </b-badge>
                        </div>
                      </div>
                    </template>
                    <div class="row">
                      <div class="col-7">
                        <div class="bold">Beskrivelse</div>
                        <div style="white-space: pre-wrap">{{ issue.fields.description }}</div>
                        <div v-if="issue.fields.comment.comments.length" style="margin-top: 10px">
                          <div class="bold">Kommentarer</div>
                          <div
                            v-for="(comment, index) in issue.fields.comment.comments"
                            :key="index"
                          >
                            <div class="bold small">
                              {{ comment.author.displayName }} -
                              {{ Date.create(comment.created).format('%d/%m-%Y') }}
                            </div>
                            <div>
                              {{ comment.body }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <table class="table table-striped table-bordered">
                          <tr>
                            <th>Oprettet d.</th>
                            <td>{{ Date.create(issue.fields.created).format('%d/%m-%Y') }}</td>
                          </tr>
                          <tr>
                            <th>Oprettet af</th>
                            <td>{{ issue.fields.creator.displayName }}</td>
                          </tr>
                          <tr>
                            <th>Tildelt</th>
                            <td>{{ (issue.fields.assignee || {}).displayName || ' - ' }}</td>
                          </tr>
                          <tr>
                            <th>Link</th>
                            <td>
                              <a :href="`https://jira.eg.dk/browse/${issue.key}`" target="_blank">{{
                                `https://jira.eg.dk/browse/${issue.key}`
                              }}</a>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </b-accordion-item>
                </b-accordion>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const axios = require('axios').default
export default {
  name: 'JiraViewer',
  data() {
    return {
      token: null,
      teamName: 'Unoung',
      groupColors: {
        'To Do': '#e65100',
        Ready: '#0231e8',
        'Ready for Test': '#bf55ec',
        'Ready for Release': '#3e6f49',
        'In Progress': '#2e87d2',
        Refinement: '#e65100',
        'Not Done': '#800000',
        'In production': '#65f763',
      },
      response: {
        issues: [],
      },
      reverseOrder: false,
    }
  },

  computed: {
    issues() {
      let issues = this.response.issues || []
      issues = issues.filter((issue) => {
        if (issue.fields.issuetype.subtask) {
          return false
        }
        if (issue.fields.issuetype.name == 'Epic') {
          return false
        }
        if (issue.fields.customfield_10216.value != this.teamName) {
          return false
        }

        return true
      })

      issues = issues.sortBy((e) => Date.create(e.fields.created))
      issues = issues.groupBy((issue) => issue.fields.status.name)

      issues = Object.keys(issues).map((key) => {
        return {
          name: key,
          issues: issues[key],
        }
      })

      issues = issues.sortBy((group) => {
        return [
          'Not Done',
          'To Do',
          'Refinement',
          'Ready',
          'In Progress',
          'Ready for Test',
          'Ready for Release',
          'In production',
        ].indexOf(group.name)
      })

      if (this.reverseOrder) {
        issues = issues.reverse()
      }
      return issues
    },
  },

  created() {
    this.token = localStorage.getItem('token')
    if (!this.token) {
      this.changeToken()
    } else {
      this.query()
    }
  },

  methods: {
    changeToken() {
      const newToken = prompt('Personal API Token', this.token || '')
      if (newToken) {
        this.token = newToken
        localStorage.setItem('token', this.token)
      }
      this.query()
    },

    query() {
      axios.post('/api/issues', { token: this.token }).then(
        (response) => {
          this.response = response.data
        },
        (error) => {
          alert('Der skete en fejl.')
        }
      )
    },
  },
}
</script>

<style scoped>
:deep(.table > :not(caption) > * > *) {
  padding: 0;
}
:deep(.group-container > .badge:first-child) {
  border-radius: 0.375rem 0.375rem 0 0 !important;
  font-size: 90%;
}
.pull-right {
  text-align: right;
}
.issues-container {
  border: 2px solid #ccc;
  border-radius: 0 5px 5px 5px;
  padding: 5px;
}

.group-container {
  margin-bottom: 20px;
}

.white-space-pre-wrap {
  white-space: pre-wrap;
}
:deep(.accordion) {
  --bs-accordion-btn-padding-x: 0px;
  --bs-accordion-btn-padding-y: 2px;
}

:deep(.accordion-body) {
  --bs-accordion-body-padding-y: 0px;
  --bs-accordion-body-padding-x: 0px;
}

.bold {
  font-weight: bold;
}

.small {
  font-size: 80%;
}
</style>
