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

app.post('/issues', async function (req,res) {
  console.log("/issues")
  try {
  const token = req.body.token;
  const client = getClient(token);
  console.log("token", token)
  const params = {
    jql: 'Project=UNO&status!=Done',
    fields: "*all",
    maxResults : 1000
  };
  const issues = await client.issueSearch.searchForIssuesUsingJql(params);
  res.json(issues);
  } catch (error) {
    console.log(error);
    res.status(500);
    let text = error.errorMessages.join("");
    console.log("text", text);
    res.send(text);
  }
  
});


const PORT = 8888;//process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}.`);
});
