const jira = require("jira.js");
const Version2Client = jira.Version2Client;

function getClient(token) {
return new Version2Client({
    host: 'https://jira.eg.dk/',
    newErrorHandling: true,
    authentication: {
      personalAccessToken: token
    },
});
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/frontend/dist/';
const app = express();

app.use(express.static(path));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/projects', async function (req,res) {
  try {
    const token = req.body.token;
    const client = getClient(token);
    const projects = await client.projects.getAllProjects();
    res.json(projects);
  } catch(e) {
    res.status(500);
    res.json({});
  }
});

app.post('/issues', async function (req,res) {
  try {
  const token = req.body.token;
  const client = getClient(token);
  const params = {
    jql: 'Project=UNO&status!=Done',
    fields: "*all",
    maxResults : 1000
  };
  const issues = await client.issueSearch.searchForIssuesUsingJql(params);
  res.json(issues);
  } catch (error) {

    res.status(500);
    res.json({});
  }
  
});


// set port, listen for requests
const PORT = 8888;//process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
