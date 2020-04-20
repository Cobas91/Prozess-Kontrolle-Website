import * as Time from "../../utils/time";
const serverData = require("../serverOptions");
var FileSaver = require('file-saver');
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

async function getAllChecklisten(){
    const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/all/checklisten`, {
      method: 'get'
    })
  const resjason = await result.json()
  return resjason
}


async function getAllData(){
  var kunden = await getAllKunden();
  var systeme = await getAllSystems();
  var status = await getAllStatus();
  var checklisten = await getAllChecklisten();
  const data = {
    systeme: systeme,
    kunden: kunden,
    status : status,
    checklisten: checklisten
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

async function getStatus(sn){
  const data = {
    table: "comments_systeme",
    where: {
      system_ID: sn
    }
  }
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/get/status`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
  const resjason = await result.json()
  return resjason
}

async function addChecklisteToSystem(input){
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/db/add/checklisteSN`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(input)
    })
  const resjason = await result.json()
  return resjason
}

function createFileDownloadName(type, extension){
  var name = type + "_" + Time.convert(Date.now()) + "_" + extension
  return name;
}

async function askforPDF(data, name){
  const pdf = {
    filename: name,
    content: data
  }
  const result = await fetch(`http://${serverData.ip}:${serverData.port}/api/create/pdf`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(pdf)
    })
  const resjason = await result
  console.log("R1",result)
  result.blob().then(function(result){
    FileSaver.saveAs(result, createFileDownloadName(name, ".pdf"));
    console.log(result)
  })
  return resjason
}

export {getAllKunden, addNewSystem, getAllSystems, addExcelImport, getAllData, updateSystem, pxeReset, getStatus, addChecklisteToSystem, askforPDF}