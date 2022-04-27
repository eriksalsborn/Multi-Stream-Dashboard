const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-north-1",
});
const util = require("../utils/util");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTable = "multistream-urls";

async function savelayouts(requestBody) {
  if (!requestBody.username) {
    return util.buildResponse(401, {
      verified: false,
      message: "incorrect request body",
    });
  }

  const username = requestBody.username;

  const url = requestBody.twitchWindows;
  if (!url) {
    return util.buildResponse(401, {
      message: "All fields are required",
    });
  }

  const user = {
    username: username.toLowerCase().trim(),
    url: url,
  };
  console.log(user.url);

  const saveUserResponse = await saveUser(user);
  if (!saveUserResponse) {
    return util.buildResponse(503, {
      message: "Server error. Please try again later.",
    });
  }
  return util.buildResponse(200, { username: username });
}

async function saveUser(user) {
  const params = {
    TableName: userTable,
    Item: user,
  };
  return await dynamoDB
    .put(params)
    .promise()
    .then(
      (response) => {
        return true;
      },
      (error) => {
        console.error("There is an saving urls: ", error);
      }
    );
}

module.exports.savelayouts = savelayouts;
