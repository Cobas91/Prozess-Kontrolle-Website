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
      var result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/add/excel`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(input)
    })
    const resjason = await result.json()
    return resjason
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

async function getAllStatus(){
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/all/status`, {
      method: 'get'
    })
  const resjason = await result.json()
  return resjason
}

async function getAllData(){
  var kunden = await getAllKunden();
  var systeme = await getAllSystems();
  var status = await getAllStatus();
  const data = {
    systeme: systeme,
    kunden: kunden,
    status : status
  }
  return data;
}

async function updateSystem(input){
  const data = {
    table: "systeme",
    set: input,
    where: {
      ID: input.ID
    }
  }
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/update`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
  const resjason = await result.json()
  return resjason
}

async function pxeReset(sn){
  const data = {
    data: {
      SN: sn,
    }
  }
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/pxeReset`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
  const resjason = await result.json()
  return resjason
}



export {getAllKunden, addNewSystem, getAllSystems, addExcelImport, getAllData, updateSystem, pxeReset}