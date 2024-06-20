export default function getUniqueElements(largerArray: any[], smallerArray: any[]) {    
    let unique1 = largerArray.filter((o) => smallerArray.indexOf(o) === -1);
    
    const unique = unique1;
    
    return unique
}