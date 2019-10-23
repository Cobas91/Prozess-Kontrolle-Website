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

async function addNewSystem(inputs) {
  console.log(inputs.input)
  const data = {
    table: "systeme",
    data: {
      SN: inputs.input,
      LSNummer: "Unbekannt",
      Status: "Neu Angelegt",
      Modell: "850G5",
      Kunden_ID: inputs.dropdown,
      Betankungs_ID: 0,
      Versand_ID: "NULL",
      Checklisten_ID_Done: 0,
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


export {getAllKunden, addNewSystem, getAllSystems}