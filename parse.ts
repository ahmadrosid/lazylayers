import fs from "fs"

export const read = (path: string) => JSON.parse(fs.readFileSync(path).toString())

// const key = "twemoji";

// const data = read(key + ".json")
// const result = Object.keys(data.icons).filter(item => !item.startsWith("flag-for")).map((item) => ({
//     url: `https://files.svgcdn.io/twemoji/${item}.svg`,
//     key: item
// }))

// console.log(JSON.stringify(result))

// const heroicons = read("lib/data/heroicons.json")
// const twemoji = read("lib/data/twemoji.json")
// const fxemoji = read("lib/data/fxemoji.json")
// const emojis = twemoji.concat(fxemoji).concat(heroicons); 
// console.log(JSON.stringify(emojis));
