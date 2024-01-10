const { QuickDB } = require("quick.db");
const db = new QuickDB()

const filterArray = [
    { channel: "1154847605080203305", filter: "pao"},
    { channel: "1154557480496537610", filter: "contador"},
]

const Filter = {}

Filter.pao = (message) => {
    if (message.content !== "pão") {
        setTimeout(() => message.delete(), 5000)

        return message.reply({ content: "Qual a parte de só poder digitar 'pão' você não entendeu?", options: { ephemeral: true }})
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                }).catch(err => console.log(err))
    }
}

Filter.contador = (message) => {
    console.log("passou aqui")
}

module.exports = {
    filterArray,
    Filter
}