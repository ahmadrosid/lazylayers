import fs from "fs"

export const read = (path: string) => JSON.parse(fs.readFileSync(path).toString())

const key = "heroicons-solid";

const data = read(key + ".json")
const result = Object.keys(data.icons).map((item) => ({
    url: `https://files.svgcdn.io/heroicons/${item}.svg`,
    key: item
}))

console.log(JSON.stringify(result))
