<template>
  <div>
    <div class="row">
      <div class="col-7">
        <div class="bold">Beskrivelse</div>
        <div style="white-space: pre-wrap">{{ issue.fields.description }}</div>
        <div
          v-if="issue.fields.comment.comments.length"
          style="margin-top: 10px"
        >
          <div class="bold">Kommentarer</div>
          <div
            v-for="(comment, index) in issue.fields.comment.comments"
            :key="index"
          >
            <div class="bold small">
              {{ comment.author.displayName }} -
              {{ Date.create(comment.created).format("%d/%m-%Y") }}
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
            <td>{{ Date.create(issue.fields.created).format("%d/%m-%Y") }}</td>
          </tr>
          <tr>
            <th>Oprettet af</th>
            <td>{{ issue.fields.creator.displayName }}</td>
          </tr>
          <tr>
            <th>Tildelt</th>
            <td>{{ (issue.fields.assignee || {}).displayName || " - " }}</td>
          </tr>
          <tr>
            <th>Link</th>
            <td>
              <a
                :href="`https://jira.eg.dk/browse/${issue.key}`"
                target="_blank"
                >{{ `https://jira.eg.dk/browse/${issue.key}` }}</a
              >
            </td>
          </tr>
        </table>
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
  },
};
</script>
<style lang="css" scoped>
.bold {
  font-weight: bold;
}
.small {
  font-size: 80%;
}
.white-space-pre-wrap {
  white-space: pre-wrap;
}
</style>
