/* eslint.disable */
import React, { Component } from "react";
import matchSorter from "match-sorter";
import "../../../../css/App.css";
import * as dgapi from "../../../../utils/API/dgapi";
import Tabelle from "../../components/Table";
class AppConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    var logs = await dgapi.getDBlogs();
    this.setState(
      (prevState) => ({
        ...prevState,
        logs: logs,
      }),
      () => console.log("AppConfig  State aktualisiert: ", this.state)
    );
  }

  render() {
    console.log("DB Logs State: ", this.state);
    const header = [
      {
        Header: "Uhrzeit",
        accessor: "time",
        filterable: false,
      },
      {
        Header: "Text",
        accessor: "logText",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["logText"] }),
        filterAll: true,
      },
    ];
    return (
      <div>
        <Tabelle
          data={this.state.logs}
          header={header}
          DropdownFilter={true}
          TableName="DBLogs"
          pageSize={20}
          {...this.props}
        />
      </div>
    );
  }
}
export default AppConfig;
