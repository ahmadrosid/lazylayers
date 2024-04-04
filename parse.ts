import fs from "fs"

export const read = (path: string) => JSON.parse(fs.readFileSync(path).toString())

const key = "twemoji";

const data = read(key + ".json")
const result = Object.keys(data.icons).filter(item => !item.startsWith("flag-for")).map((item) => ({
    url: `https://files.svgcdn.io/twemoji/${item}.svg`,
    key: item
}))

console.log(JSON.stringify(result))
