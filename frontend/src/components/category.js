export default class Category {
  constructor(name, color) {
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

  addIssue(issue) {
    this.issues.push(issue);
  }
}
