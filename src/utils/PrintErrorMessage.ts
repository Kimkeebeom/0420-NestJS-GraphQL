export function PrintErrorMessage(caller: string, errMsg: string){
    console.log("======================================================================================================================================================");
    console.log(`${caller} ERROR : ${errMsg}`);
    console.trace();
    console.log("======================================================================================================================================================");
}