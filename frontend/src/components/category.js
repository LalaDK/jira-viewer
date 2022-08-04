class Category {
  static teamNames = [];

  constructor(name, color) {
    this.show = false;
    this.issues = [];
    this.name = name;
    this.setColor(color);
  }

  setColor(color) {
    if (color) {
      this.color = color;
    } else {
      this.color =
        {
          "To Do": "#e65100",
          Ready: "#0231e8",
          "Ready for Test": "#bf55ec",
          "Ready for Release": "#3e6f49",
          "In Progress": "#2e87d2",
          Refinement: "#e65100",
          "Not Done": "#800000",
          "In production": "#65f763",
        }[this.name] || "green";
    }
  }

  getColor() {
    return this.color;
  }

  static defaultCategorySortOrder() {
    return [
      "Not Done",
      "To Do",
      "Refinement",
      "Ready",
      "In Progress",
      "Ready for Test",
      "Ready for Release",
      "In production",
    ];
  }

  static generateCategories(issues) {
    issues = issues.filter((issue) => {

      // We are already iterating, so why not ...
      let teamName = (issue.fields.customfield_10216 || {}).value;
      if(teamName && Category.teamNames.indexOf(teamName) == -1) {
        Category.teamNames.push(teamName);
      }
      
      if (issue.fields.issuetype.subtask) {
        return false;
      }
      if (issue.fields.issuetype.name == "Epic") {
        return false;
      }

      return true;
    });
    if (!issues || !issues.length) {
      throw "Argument 'issues' is empty!";
    }

    let categories = [];

    issues = issues.groupBy((issue) => issue.fields.status.name);
    Object.keys(issues).forEach((key) => {
      let category = new Category(key);
      category.issues = issues[key];
      categories.push(category);
    });

    return categories;
  }
}

export default Category;
