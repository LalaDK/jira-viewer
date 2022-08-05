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
        <b-form-group
          label="Personal Access Token"
          label-for="token"
          description="Jira -> Profile -> Personal Access Tokens"
        >
          <b-form-input
            placeholder="Personal Access Token"
            v-model="token"
            @input="tokenChanged"
            required
          ></b-form-input>
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
      token: null,
    };
  },

  created() {
    this.token = localStorage.getItem("token");
  },

  methods: {
    tokenChanged(token) {
      localStorage.setItem("token", token);
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
