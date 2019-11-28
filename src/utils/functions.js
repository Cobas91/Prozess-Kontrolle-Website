function findArrayElementByName(array, name) {
    return array.find((element) => {
      return element.Name === name;
    })
}

function findChecklistAttributWithID(array, id) {
    var ergebnis = []
    array.forEach(element => {
        if(element.Kunden_ID === id){
            ergebnis.push(element)
        }
    });
    ergebnis.sort((a, b) => (a.order > b.order) ? 1 : -1)
    return ergebnis;
}

function findSystemWithSN(systeme, sn) {
    var ergebnis = []
    systeme.forEach(element => {
        if(element.SN === sn){
            ergebnis.push(element)
        }
    });
    return ergebnis;
}

function findKundeWithID(kunden, id) {
    var ergebnis = []
    kunden.forEach(element => {
        if(element.Kunden_ID === id){
            ergebnis.push(element)
        }
    });
    return ergebnis;
}
function findKundeWithName(kunden, name) {
    var ergebnis = []
    kunden.forEach(element => {
        if(element.Name === name){
            ergebnis.push(element)
        }
    });
    return ergebnis;
}



export {findArrayElementByName, findChecklistAttributWithID, findSystemWithSN, findKundeWithID, findKundeWithName}