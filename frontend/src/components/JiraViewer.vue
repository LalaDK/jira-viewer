<template>
  <div>
    <button
      id="refreshBtn"
      class="btn btn-outline-primary"
      type="button"
      @click="query"
    >
      <b-icon-arrow-clockwise />
    </button>
    <SidebarOptions />
    <b-container class="my-3">
      <b-row>
        <b-col>
          <b-alert variant="danger" :show="!!error" @click="error = null">
            {{ error }}
          </b-alert>
          <div class="center" v-if="loading" id="spinner">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
          <div>
            <b-tabs content-class="mt-3" align="center" pills>
              <b-tab title="First" v-for="project in projects">
                <template #title>
                  {{ project.name }}
                </template>
                <div
                  v-for="category in project.categories"
                  :key="category.name"
                  class="group-container"
                >
                  <b-badge
                    :style="{
                      'background-color': `${category.color} !important`,
                    }"
                    >{{ category.name }} ({{ category.issues.length }})</b-badge
                  >
                  <div role="tablist">
                    <div class="issues-container">
                      <b-accordion flush>
                        <b-accordion-item
                          v-for="issue in category.issues"
                          :key="issue.id"
                        >
                          <template #title>
                            <div class="d-block  d-md-none w-100">
                              <IssueHeaderMobile :issue="issue" :category="category" />
                            </div>
                            <div class="d-none d-md-block w-100">
                              <IssueHeader :issue="issue" :category="category" />
                            </div>
                          </template>
                          <IssueBody :issue="issue" />
                        </b-accordion-item>
                      </b-accordion>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import IssueHeader from "./IssueHeader";
import IssueHeaderMobile from "./IssueHeaderMobile";
import IssueBody from "./IssueBody";
import SidebarOptions from "./SidebarOptions.vue";
import Jira from "./jira.js";
const axios = require("axios").default;
var jira;

export default {
  name: "JiraViewer",
  components: { IssueBody, IssueHeader, IssueHeaderMobile, SidebarOptions },
  data() {
    return {
      error: null,
      loading: false,
      projects: [],
    };
  },

  created() {
    this.query();
  },

  methods: {
    query() {
      this.error = null;
      this.projects = [];
      let token = localStorage.getItem("token");
      if (!token) {
        this.error =
          "Du skal angive en 'Personal Access Token' i Indstillinger.";
        return;
      }

      this.loading = true;
      axios.post("/api/issues", { token }).then(
        (response) => {
          jira = new Jira(response.data.issues);
          window.jira = jira;
          this.projects = jira.projects;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = error.response.data;
        }
      );
    },
  },
};
</script>

<style scoped>
#refreshBtn {
  border-radius: 0 0 0.375rem 0;
  border-width: 0 1px 1px 0;
  position: fixed;
  left: 0;
  top: 0;
}
:deep(.table > :not(caption) > * > *) {
  padding: 0;
}

:deep(.group-container > .badge:first-child) {
  cursor: pointer;
  font-size: 90%;
  user-select: none;
  border-radius: 0.375rem 0.375rem 0 0 !important;
}

.issues-container {
  border: 2px solid #ccc;
  border-radius: 0 5px 5px 5px;
  padding: 5px;
}

.group-container {
  margin-bottom: 10px;
}

:deep(.accordion) {
  --bs-accordion-btn-padding-x: 0px;
  --bs-accordion-btn-padding-y: 2px;
}

:deep(.accordion-body) {
  --bs-accordion-body-padding-y: 0px;
  --bs-accordion-body-padding-x: 0px;
}

.center {
  text-align: center;
}

#spinner {
  positon: relative;
  margin-top: 50px;
}
</style>
