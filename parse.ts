import fs from "fs"

export const read = (path: string) => JSON.parse(fs.readFileSync(path).toString())

// from iconsets: https://github.com/iconify/icon-sets

// const key = "fluent-emoji";

// const data = read(key + ".json")
// const result = Object.keys(data.icons)
//     // .filter(item => !item.startsWith("flag-for"))
//     .map((item) => ({
//         url: `https://files.svgcdn.io/${key}/${item}.svg`,
//         key: item
//     }))

// console.log(JSON.stringify(result))

const fluentemoji = read("fluentemoji.json")
const emojis = read("lib/data/emojis.json")
const res = fluentemoji.concat(emojis); 
console.log(JSON.stringify(res));

