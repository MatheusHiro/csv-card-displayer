export default function stringFormat(words: string): string {

    return words
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}
