<template>
  <div>
    {{ settings }}
    <button
      id="refreshBtn"
      class="btn btn-outline-primary"
      type="button"
      :disabled="!settings.token"
      @click="query"
    >
      <b-icon-arrow-clockwise />
    </button>
    <SidebarOptions v-model="settings" />
    <b-container class="my-3">
      <b-row>
        <b-col>
          <div
            v-for="category in settings.categories"
            :key="category.name"
            class="group-container"
          >
            <b-badge
              :style="{'background-color': `${ category.color } !important`}"
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
                        <IssueHeader
                          :issue="issue"
                          :category="category"
                        />
                      </template>
                      <IssueBody :issue="issue" />
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
import IssueHeader from "./IssueHeader";
import IssueBody from "./IssueBody";
import SidebarOptions from "./SidebarOptions.vue";
import Category from "./category.js";
const axios = require("axios").default;
export default {
  name: "JiraViewer",
  components: { IssueBody, IssueHeader, SidebarOptions },
  data() {
    return {
      settings: {
        token: null,
        teamName: null,
        teamNames: [],
        categories: [],
      }
    };
  },


  created() {
    this.query();
  },

  methods: {
    query() {
    if(!this.settings.token) {
      return;
    }
      axios.post("/api/issues", { token: this.settings.token }).then(
        (response) => {
          this.settings.categories = Category.generateCategories(
            response.data.issues
          );
          this.settings.teamNames = Category.teamNames;
        },
        (error) => {
          alert("Der skete en fejl. Kunne ikke hente data.");
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
}
:deep(.group-container > .badge:not(.collapsed):first-child) {
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
</style>
