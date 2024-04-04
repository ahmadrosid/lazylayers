interface Emoji {
    name: string;
    url: string;
}

declare module 'twemoji.json' {
    const emojis: Emoji[];
    export default emojis;
}


declare module 'fxemoji.json' {
    const emojis: Emoji[];
    export default emojis;
}


declare module 'heroicons.json' {
    const emojis: Emoji[];
    export default emojis;
}

