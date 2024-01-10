const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Utils = {}

const botsId = [
    "1013187419618685050"
]

Utils.isBot = function isBot(userId) {
    return botsId.find(id => id === userId)
}

Utils.resetPoints = async function(userId) {
    return await db.delete(userId)
}

module.exports = { Utils }