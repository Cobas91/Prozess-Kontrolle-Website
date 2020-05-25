import * as Time from "../../utils/time";
const serverData = require("../serverOptions");
var FileSaver = require("file-saver");
async function getAllKunden() {
  const data = {
    table: "kunden",
    where: {},
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/get`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resjason = await result.json();
  return resjason;
}

async function getAllSystems() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/all`,
    {
      method: "get",
    }
  );
  const resjason = await result.json();
  return resjason;
}

async function addExcelImport(input) {
  var result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/add/excel`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );
  const resjason = await result.json();
  return resjason;
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
      Computername: input.computername,
      Assetnummer: input.assetnummer,
    },
  };

  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/add`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resjason = await result.json();
  return resjason;
}

async function getAllStatus() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/all/status`,
    {
      method: "get",
    }
  );
  const resjason = await result.json();
  return resjason;
}

async function getAllChecklisten() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/all/checklisten`,
    {
      method: "get",
    }
  );
  const resjason = await result.json();
  return resjason;
}

function sortSystems(data, where) {
  Object.getOwnPropertyNames(where[0]);
  console.log();
  var erg = [];
  data.forEach((system) => {
    if (
      system[Object.getOwnPropertyNames(where[0])[0]] ===
      where[0][Object.getOwnPropertyNames(where[0])[0]]
    ) {
      erg.push(system);
    }
  });
  if (erg.length <= 0) {
    return [];
  } else {
    return erg;
  }
}
async function getAllStraßen() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/all/strasen`,
    {
      method: "get",
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function getAllData() {
  var kunden = await getAllKunden();
  var systeme = await getAllSystems();
  var status = await getAllStatus();
  var checklisten = await getAllChecklisten();
  var straßen = await getAllStraßen();
  var uebersichtVersand = await sortSystems(systeme, [
    { Status: "Versand Ready" },
  ]);
  const data = {
    systeme: systeme,
    kunden: kunden,
    status: status,
    checklisten: checklisten,
    uebersichtVersand: uebersichtVersand,
    straßen: straßen,
  };
  return data;
}

async function updateSystem(input) {
  const data = {
    table: "systeme",
    set: input,
    where: {
      ID: input.ID,
    },
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/update`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resjason = await result.json();
  return resjason;
}

async function setStatus(input) {
  console.log(input);
  for (var property in input) {
    const data = {
      where: {
        SN: property,
      },
    };
    fetch(`http://${serverData.ip}:${serverData.port}/api/db/updateStatus`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}

async function pxeReset(sn) {
  const data = {
    data: {
      SN: sn,
    },
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/pxeReset`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resjason = await result.json();
  return resjason;
}

async function getComments(sn) {
  const data = {
    table: "comments_systeme",
    where: {
      system_ID: sn,
    },
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/get/comments`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resjason = await result.json();
  return resjason;
}

async function addChecklisteToSystem(input) {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/add/checklisteSN`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );
  const resjason = await result.json();
  return resjason;
}

function createFileDownloadName(type, extension) {
  var name = type + "_" + Time.convert(Date.now()) + "_" + extension;
  return name;
}

async function askforPDF(data, name) {
  const pdf = {
    filename: name,
    content: data,
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/create/pdf`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdf),
    }
  );
  const resjason = await result;
  console.log("R1", result);
  result.blob().then(function (result) {
    FileSaver.saveAs(result, createFileDownloadName(name, ".pdf"));
    console.log(result);
  });
  return resjason;
}

async function startKHKImport_Lagerbestand() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/import/lager`,
    {
      method: "get",
    }
  );
  return await result;
}
async function massenStatus(allData) {
  var data = {
    status: allData.status,
    systeme: allData.sn,
    bemerkung: allData.bemerkung,
    Straße: allData.Straße,
    Kunde: allData.kunde,
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/massStatus`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function getConfig() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/cfg/get`,
    {
      method: "get",
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function saveConfig(config) {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/cfg/set`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function getDBlogs() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/logs`,
    {
      method: "get",
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function sendTeams(type, data, channel) {
  var toSend = {
    type: type,
    data: data,
    channel: channel,
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/teams`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function getVersandReady() {
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/get/versand`,
    {
      method: "get",
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function getUsername(input) {
  var user = {
    name: input,
  };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/login`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const resjason = await result.json();
  return resjason;
}
async function getHierarchie(sn) {
  var toFind = { sn: sn };
  const result = await fetch(
    `http://${serverData.ip}:${serverData.port}/api/db/hyrachie`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toFind),
    }
  );
  const resjason = await result.json();
  return resjason;
}

export {
  getAllKunden,
  addNewSystem,
  getAllSystems,
  addExcelImport,
  getAllData,
  updateSystem,
  pxeReset,
  getComments,
  addChecklisteToSystem,
  askforPDF,
  startKHKImport_Lagerbestand,
  setStatus,
  massenStatus,
  getConfig,
  saveConfig,
  getDBlogs,
  sendTeams,
  getVersandReady,
  sortSystems,
  getUsername,
  getHierarchie,
};
