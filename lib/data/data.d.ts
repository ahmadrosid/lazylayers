interface Emoji {
    name: string;
    url: string;
}

declare module 'emojis.json' {
    const emojis: Emoji[];
    export default emojis;
}
