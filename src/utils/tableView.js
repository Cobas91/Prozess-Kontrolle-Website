import Dropdown from "..//main/body/components/Dropdown";
import Button from "../main/body/components/Button";
import Switch from "../main/body/components/Switch.js";
import matchSorter from "match-sorter";
import React from "react";

function standard(comp) {
  console.log("Table View", comp);
  var standard = [
    {
      Header: "Seriennummer",
      accessor: "SN",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["SN"] }),
      filterAll: true,
    },
    {
      Header: "Computername",
      accessor: "Computername",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Computername"] }),
      filterAll: true,
    },
    {
      Header: "Modell",
      accessor: "Modell",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Modell"] }),
      filterAll: true,
    },
    {
      Header: "Kunde",
      accessor: "Kunde",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Kunde"] }),
      filterAll: true,
      Filter: ({ filter, onChange }) => (
        <Dropdown
          title={""}
          name={"Kunde"}
          options={comp.kundenFilter}
          value={filter ? filter.value : ""}
          placeholder={"Kunde wählen...."}
          handlechange={(event) => onChange(event.target.value)}
        />
      ),
    },
    {
      Header: "Aktueller Status",
      accessor: "Status",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Status"] }),
      filterAll: true,
      Filter: ({ filter, onChange }) => (
        <Dropdown
          title={""}
          name={"Status"}
          options={comp.statusFilter}
          value={filter ? filter.value : ""}
          placeholder={"Status wählen..."}
          handlechange={(event) => onChange(event.target.value)}
        />
      ),
    },
    {
      Header: "Letzte Bemerkung",
      accessor: "Bemerkung",
    },
    {
      Header: "",
      accessor: "SN",
      Cell: (row) => (
        <div className="tabelle_feld">
          <Button
            className="tabelle_Feld"
            action={() => comp.props.setSite("editsystem", { SN: row.value })}
            title="Editieren"
          />
        </div>
      ),
      filterable: false,
      sortable: false,
    },
  ];
  return standard;
}

function lieferscheine(comp) {
  var standard = [
    {
      Header: "Lieferschein Nummer",
      accessor: "LSNummer",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["LSNummer"] }),
      filterAll: true,
    },
    {
      Header: "Seriennummer",
      accessor: "SN",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["SN"] }),
      filterAll: true,
    },
    {
      Header: "Modell",
      accessor: "Modell",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Modell"] }),
      filterAll: true,
    },
    {
      Header: "Kunde",
      accessor: "Kunde",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Kunde"] }),
      filterAll: true,
      Filter: ({ filter, onChange }) => (
        <Dropdown
          title={""}
          name={"Kunde"}
          options={comp.kundenFilter}
          value={filter ? filter.value : ""}
          placeholder={"Kunde wählen...."}
          handlechange={(event) => onChange(event.target.value)}
        />
      ),
    },
    {
      Header: "Aktueller Status",
      accessor: "Status",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Status"] }),
      filterAll: true,
      Filter: ({ filter, onChange }) => (
        <Dropdown
          title={""}
          name={"Status"}
          options={comp.statusFilter}
          value={filter ? filter.value : ""}
          placeholder={"Status wählen..."}
          handlechange={(event) => onChange(event.target.value)}
        />
      ),
    },
    {
      Header: "Letzte Bemerkung",
      accessor: "Bemerkung",
    },
  ];
  return standard;
}

function versandReady(comp) {
  const header = [
    {
      Header: "Seriennummer",
      accessor: "SN",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["SN"] }),
      filterAll: true,
    },
    {
      Header: "Lieferschein",
      accessor: "LSNummer",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["LSNummer"] }),
      filterAll: true,
    },
    {
      Header: "Modell",
      accessor: "Modell",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Modell"] }),
      filterAll: true,
    },
    {
      Header: "Kunde",
      accessor: "Kunde",
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["Kunde"] }),
      filterAll: true,
    },
    {
      Header: (
        <Button
          action={comp._save}
          type={"primary"}
          title={"Status Versand setzen"}
        />
      ),
      Cell: (row) => (
        <div className="tabelle_feld">
          <Switch
            title="Versenden"
            onChange={(e) => comp._handleSwitchChange(e, row)}
            checked={comp._isChecked(row.row.SN)}
          />
        </div>
      ),
      filterable: false,
      sortable: false,
    },
  ];
  return header;
}

export { standard, lieferscheine, versandReady };
