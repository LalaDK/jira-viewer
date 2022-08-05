<template>
  <div class="row w-100">
    <div class="col-9" style="white-space: nowrap">
      <b-badge
        class="d-inline-block"
        style="width: 80px"
        :style="{
          'background-color': `${category.color} !important`,
        }"
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
        <b-icon-chat />
      </b-badge>
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
</style>
