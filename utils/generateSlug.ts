export default function generateSlug() {
    const number = new Date().getTime();
    const numberToString = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    let uniqueString = "";
    for(let element of String(number).split("")) {
        uniqueString += numberToString[Number(element)];
    }
    return uniqueString;
}