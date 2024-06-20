export default function reduceData(data: {
    [key: string]: number;
}) {
    var other = 0;
    const temp = data;
    Object.entries(data).forEach((i, index) => {
        console.log(i)
        if(i[1] === 1) {
            console.log("if")
            other += 1;
            console.log(1)
            delete temp[i[0]]
        } else console.log("else")
    })
    temp["other"] = other
    console.log("other", other)
    return temp
}