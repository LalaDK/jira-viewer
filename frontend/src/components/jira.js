import Category from "./category.js";
import Project from "./project.js";

export default class Jira {
  constructor(issues) {
    this.projects = {};

    issues.forEach((issue) => {
      if (
        !issue.fields.issuetype.subtask &&
        issue.fields.issuetype.name != "Epic"
      ) {
        let projectName = (issue.fields.customfield_10216 || {}).value;
        this.projects[projectName] =
          this.projects[projectName] || new Project(projectName);
        this.projects[projectName].addIssue(issue);
      }
    });

    this.projects = Object.values(this.projects);
    this.projects.forEach((project) => project.sort());
  }

  projectNames() {
    return this.projects.map((project) => project.name);
  }

  getProject(projectName) {
    return this.projects.find((project) => project.name == projectName);
  }
}
