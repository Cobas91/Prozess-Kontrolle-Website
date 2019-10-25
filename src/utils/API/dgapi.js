const serverData = require("../serverOptions");

async function getAllKunden() {
    const data = {
        table: "kunden",
        where: {
        }
    }
    const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/get`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
    const resjason = await result.json()
    return resjason
}

async function getAllSystems() {
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/all`, {
      method: 'get'
    })
  const resjason = await result.json()
  return resjason
}

async function addExcelImport(input){
  console.log(input)
  for(var index in input){
    var system = {
      table: "systeme",
      Bemerkung: "",
      data: {
        SN: input[index].Seriennummer,
        LSNummer: "Unbekannt",
        Status: "Neu Angelegt",
        Modell: input[index].Matchcode,
        Hersteller: "Unbekannt",
        Kunde: "Unbekannt",
        Betankungs_ID: 0,
        Versand_ID: "NULL",
        Lager_ID: 0,
        Job_ID: 0,
        Lager_KHK: input[index].Lagerplatz
      }
    }
    await fetch(`http://${serverData.ip}:${serverData.port}/api/db/add/excel`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(system)
    })
    // .then((result)=>{
    //   addToLog(result)
    // })

  }
}

function addToLog(toLog){
  var send = {data:toLog}
  fetch(`http://${serverData.ip}:${serverData.port}/api/db/add/log`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(send)
  })
}
async function addNewSystem(input) {
  const data = {
    table: "systeme",
    Bemerkung: input.bemerkung,
    data: {
      SN: input.sn,
      LSNummer: input.lieferschein,
      Status: "Neu Angelegt",
      Modell: input.modell,
      Hersteller: input.hersteller,
      Kunde: input.kunde,
      Betankungs_ID: 0,
      Versand_ID: "NULL",
      Lager_ID: 0,
      Job_ID: 0
    }
  }
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/add`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
  const resjason = await result.json()
  return resjason
}



export {getAllKunden, addNewSystem, getAllSystems, addExcelImport}