declare module '*.css' {
    const content: {readonly [name: string]: string};
    export default content;
}

declare module '*.pcss' {
    const content: {readonly [name: string]: string};
    export default content;
}
