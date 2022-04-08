const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-north-1",
});
const util = require("../utils/util");
const bcrypt = require("bcryptjs");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTable = "multistream-users";

async function register(userInfo) {
  const name = userInfo.name;
  const email = userInfo.email;
  const username = userInfo.username;
  const password = userInfo.password;
  if (!username || !name || !email || !password) {
    return util.buildResponse(401, {
      message: "All fields are required",
    });
  }

  const dynamoUser = await getUser(username.toLowerCase().trim());
  if (dynamoUser && dynamoUser.username) {
    return util.buildResponse(401, {
      message: "username already exists in our database. please choose a different username",
    });
  }

  const encryptedPW = bcrypt.hashSync(password.trim(), 10);
  const user = {
    name: name,
    email: email,
    username: username.toLowerCase().trim(),
    password: encryptedPW,
  };

  const saveUserResponse = await saveUser(user);
  if (!saveUserResponse) {
    return util.buildResponse(503, {
      message: "Server error. Please try again later.",
    });
  }

  return util.buildResponse(200, { username: username });
}

async function getUser(username) {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };

  return await dynamoDB
    .get(params)
    .promise()
    .then(
      (response) => {
        return response.item;
      },
      (error) => {
        console.error("There is an error getting user: ", error);
      }
    );
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
        console.error("There is an saving users: ", error);
      }
    );
}

module.exports.register = register;
