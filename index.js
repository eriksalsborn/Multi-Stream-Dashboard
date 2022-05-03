const registerService = require("./service/register");
const loginService = require("./service/login");
const verifyService = require("./service/verify");
const savelayoutsService = require("./service/savelayouts");
const util = require("./utils/util");

const healthPath = "/health";
const registerPath = "/register";
const loginPath = "/login";
const verifyPath = "/verify";
const savelayoutsPath = "/savelayouts";

exports.handler = async (event) => {
    console.log("Request Event: ", event);
    let response;
    switch (true) {
        case event.httpMethod === "OPTIONS":
            response = util.buildCORSResponse(200, "Success");
            break;
        case event.httpMethod === "GET" && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === "POST" && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = await registerService.register(registerBody);
            break;
        case event.httpMethod === "POST" && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = loginService.login(loginBody);
            break;
        case event.httpMethod === "POST" && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = verifyService.verify(verifyBody);
            break;
        case event.httpMethod === "POST" && event.path === savelayoutsPath:
            const savelayoutsBody = JSON.parse(event.body);
            response = savelayoutsService.savelayouts(savelayoutsBody);
            break;
        default:
            response = util.buildResponse(404, "404 Not found");
    }
    return response;
};
