const fs = require("fs")
const path = require("path")

const envText = Object.entries(process.env)
.map(entry =>{
    return `${entry[0]}="${entry[1]}"`
})
.join('\n')

fs.writeFileSync(path.join(__dirname,'../.env'), envText)
console.log(envText)