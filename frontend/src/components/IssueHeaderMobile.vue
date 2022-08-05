<template>
  <div class="row w-100">
    <div class="col">
      <b-badge
        class="d-inline-block"
        style="width: 80px"
        :style="{
          'background-color': `${category.color} !important`,
        }"
        >{{ issue.key }}</b-badge
      >
      <span class="mx-1 d-inline-block"
        >{{ issue.fields.summary }}
      </span>
    </div>
    </div>
    <div class="row">
    <div class="col center">
      <span class="small d-inline-block mx-1"
        >{{
          Date.create().daysSince(Date.create(issue.fields.created))
        }}
        dage</span
      >
    <div v-if="issue.fields.assignee" class="col d-inline-block mx-1">
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
      <b-badge v-if="issue.fields.comment.comments.length" variant="warning" class="mx-1">
        {{ issue.fields.comment.comments.length }}
        <b-icon-chat />
      </b-badge>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    issue: {
      required: true,
      type: Object,
    },
    category: {
      required: true,
      type: Object,
    },
  },
};
</script>
<style lang="css" scoped>
.small {
  font-size: 80%;
}
.pull-right {
  text-align: right;
}
.center {
  text-align: center;
}
</style>
