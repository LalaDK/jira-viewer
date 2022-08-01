const jira = require("jira.js");
const Version2Client = jira.Version2Client;
const client = new Version2Client({
    host: 'https://jira.eg.dk/',
    newErrorHandling: true,
    authentication: {
      personalAccessToken: process.env.JIRA_VIEWER_PERSONAL_ACCESS_TOKEN
    },
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/frontend/dist/';
const app = express();

app.use(express.static(path));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
});

app.get('/projects', async function (req,res) {
  const projects = await client.projects.getAllProjects();
  res.json(projects);
});

app.get('/issues', async function (req,res) {
  const params = {
    jql: 'Project=UNO&status!=Done',
    fields: "*all",
    maxResults : 1000
  };
  const issues = await client.issueSearch.searchForIssuesUsingJql(params);
  res.json(issues);
});


// set port, listen for requests
const PORT = 8888;//process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
