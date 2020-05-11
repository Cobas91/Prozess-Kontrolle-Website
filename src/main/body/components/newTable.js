import React from "react";

import Select from "react-select";
import Button from "../components/Button";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class NewTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.props.App.data.systeme,
      filtered: [],
      select2: undefined,
    };
  }

  onFilteredChangeCustom = (value, accessor) => {
    let filtered = this.state.filtered;
    let insertNewFilter = 1;

    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value });
    }

    this.setState({ filtered: filtered });
  };

  render() {
    const { data } = this.props.App.data.systeme;
    return (
      <div>
        <pre>{JSON.stringify(this.state.filtered, null, 2)}</pre>
        <br />
        <br />
        Extern Select2 :{" "}
        <Select
          style={{ width: "50%", marginBottom: "20px" }}
          onChange={(entry) => {
            this.setState({ select2: entry });
            this.onFilteredChangeCustom(
              entry.map((o) => {
                return o.value;
              }),
              "firstName"
            );
          }}
          value={this.state.select2}
          multi={true}
          options={this.state.data.map((o, i) => {
            return { id: i, value: o.firstName, label: o.firstName };
          })}
        />
        <ReactTable
          data={data}
          filterable
          filtered={this.state.filtered}
          onFilteredChange={(filtered, column, value) => {
            this.onFilteredChangeCustom(value, column.id || column.accessor);
          }}
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id;
            if (typeof filter.value === "object") {
              return row[id] !== undefined
                ? filter.value.indexOf(row[id]) > -1
                : true;
            } else {
              return row[id] !== undefined
                ? String(row[id]).indexOf(filter.value) > -1
                : true;
            }
          }}
          columns={[
            {
              Header: "Seriennummer",
              accessor: "SN",
            },
            {
              Header: "Kunde",
              accessor: "Kunde",
            },
            {
              Header: "KHK Matchcode",
              accessor: "Kunde_KHK",
            },
            {
              Header: "Aktueller Status",
              accessor: "Status",
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
                    action={() =>
                      this.props.setSite("editsystem", { SN: row.value })
                    }
                    title="Editieren"
                  />
                </div>
              ),
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default NewTable;
