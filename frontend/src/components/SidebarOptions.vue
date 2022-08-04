<template>
  <div>
    <button
      id="optionsBtn"
      class="btn btn-outline-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
    >
      <b-icon-exclamation style="fill: red" v-if="!settings.token" />
      <b-icon-gear />
    </button>

    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">
          Indstillinger
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <b-form-group label="Projekt" label-for="project" description="">
          <b-form-select v-model="settings.teamName" required>
            <option
              v-for="teamName in settings.teamNames"
              :value="teamName"
              :key="teamName"
            >
              {{ teamName }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Personal Access Token"
          label-for="token"
          description="Jira -> Profile -> Personal Access Tokens"
        >
          <b-form-input
            placeholder="Personal Access Token"
            v-model="settings.token"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Kategorier" label-for="categories">
          <b-list-group>
            <b-list-group-item
              v-for="category in settings.categories"
              :key="category.name"
              class="d-flex justify-content-between"
            >
              {{ category.name }}
              <div class="pull-right">
                <b-button variant="outline-primary" class="mx-1">
                  <b-icon-arrow-up />
                </b-button>
                <b-button variant="outline-primary">
                  <b-icon-arrow-down />
                </b-button>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
import Category from "./category.js";
export default {
  data() {
    return {
      settings: {
        token: null,
        teamName: null,
        teamNames: [],
        categories: [],
      },
    };
  },
  created() {
    this.loadLocalStorageSettings();
  },

  methods: {
    loadLocalStorageSettings() {
      const localStorageSettings = localStorage.getItem("settings");
      if (localStorageSettings) {
        this.settings = JSON.parse(localStorageSettings);
      }
    },
    saveLocalStorageSettings() {
      let data = {
        token: this.settings.token,
        teamName: this.settings.teamName
      }
      localStorage.setItem("settings", JSON.stringify(this.settings));
    },
  },

  props: ["modelValue"],

  watch: {
    modelValue: {
      handler(newValue) {
        this.settings = newValue;
      },
      deep: true,
    },

    settings: {
      handler(newValue, oldValue) {
        this.$emit("update:modelValue", newValue);
        this.saveLocalStorageSettings();
      },
      deep: true,
    },
  },
};
</script>
<style>
#optionsBtn {
  border-radius: 0 0 0 0.375rem;
  border-width: 0 0 1px 1px;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
