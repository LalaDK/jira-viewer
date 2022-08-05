import Category from "./category.js";

export default class Project {
  static categorySortOrder = [
    "Not Done",
    "To Do",
    "Refinement",
    "Ready",
    "In Progress",
    "Ready for Test",
    "Ready for Release",
    "In production",
  ];

  constructor(name) {
    this.name = name || "";
    this.categories = [];
  }

  sort() {
    this.categories.sort((a, b) => {
      return (
        Project.categorySortOrder.indexOf(a.name) -
        Project.categorySortOrder.indexOf(b.name)
      );
    });
    this.categories.forEach((category) => category.sort());
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
