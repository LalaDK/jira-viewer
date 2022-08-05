import Category from "./category.js";

export default class Project {
  constructor(name) {
    this.name = name || "";
    this.categories = [];
  }

  addIssue(issue) {
    let status = issue.fields.status.name;
    let category = this.getCategory(status);
    category.addIssue(issue);
  }

  getCategory(name) {
    let category = this.categories.find((e) => e.name == name);

    if (!category) {
      this.categories.push(new Category(name));
    }

    return this.categories.find((e) => e.name == name);
  }
}
