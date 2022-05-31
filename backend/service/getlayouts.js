const AWS = require("aws-sdk")
AWS.config.update({
    region: "eu-north-1",
})
const util = require("../utils/util")

const dynamoDB = new AWS.DynamoDB.DocumentClient()
const userTable = "multistream-urls"

async function getlayouts(requestBody) {
    if (!requestBody.username || !requestBody.token) {
        return util.buildResponse(401, {
            verified: false,
            message: "incorrect request body",
        })
    }

    const username = requestBody.username

    const dynamoUser = await getLayout(username.toLowerCase().trim())
    // if (!dynamoUser || !dynamoUser.username) {
    //   return util.buildResponse(403, {
    //     message: "user does not exist.",
    //   });
    // }

    const response = {
        username: username,
        layouts: dynamoUser.url,
        requestbody: requestBody,
    }

    return util.buildResponse(200, response)
}

async function getLayout(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username,
        },
    }

    return await dynamoDB
        .get(params)
        .promise()
        .then(
            (response) => {
                return response.Item
            },
            (error) => {
                console.error("There is an error getting user: ", error)
            }
        )
}

module.exports.getlayouts = getlayouts
