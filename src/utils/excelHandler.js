function excelImport(importData){
    let i;
    let r;
    var property = {}
    var result = {}
    //Wenn erste Spalte in der Excel Datei den namen vorgeben soll Zeile 9 auf Index 0 Stellen. importData-->[0]<--[r]
    for(i = 1; i < importData.length; i++){
        for(r = 0; r < importData[i].length; r++){
            var spalte = importData[0][r]
            var value = importData[i][r]
            property[[spalte]] = value
            result[[i]] = property
        }
        property = {}

    }
    return result
}




export {excelImport}