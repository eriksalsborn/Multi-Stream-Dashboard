// Contains functions for user information and token
module.exports = {
    //function to get the current user
    getUser: function () {
        const user = sessionStorage.getItem("user")

        if (user === "undefined" || !user) {
            return null
        } else {
            return JSON.parse(user)
        }
    },

    //function to get the current users token
    getToken: function () {
        return sessionStorage.getItem("token")
    },

    //function to give a user a token
    setUserSession: function (user, token) {
        sessionStorage.setItem("user", JSON.stringify(user))
        sessionStorage.setItem("token", token)
    },

    //function to remove a users token
    resetUserSession: function () {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
    },
}
