     // const header = [
      //       {
      //           Header: "Seriennummer",
      //           accessor: "SN"
      //       },
      //       {
      //           Header: "Kunde",
      //           accessor: "Kunde"
      //       },
      //       {
      //         Header: "Lager",
      //         accessor: "Lager_KHK"
      //       },
      //       {
      //           Header: "Lieferschein",
      //           accessor: "LSNummer"
      //       },
      //       {
      //           Header: "Modell",
      //           accessor: "Modell"
      //       },
      //       {
      //           Header: "Status",
      //           accessor: "Status"
      //       },
      //       {
      //           Header: "Bearbeiten",
      //           accessor: "SN",
      //           Cell: row => <div className="tabelle_feld">
      //               <Link to={`/system/edit/?sn=${row.value}`}><FaBars/></Link>
      //             </div>
      //       },
      //       {
      //         Header: "Checkliste",
      //         accessor: "SN",
      //         Cell: row => <div className="tabelle_feld">
      //             <Link to={`/admin/checkliste/edit/?sn=${row.value}`}><FiEdit/></Link>
      //           </div>
      //     },
      //       {
      //           Header: "PXE Zurücksetzen",
      //           accessor: "SN",
      //           Cell: row => <div className="tabelle_feld">
      //             <Button className="tabelle_Feld" action={() => this._resetPXE(row.value)} title="Reset"/>
      //             </div>
      //       },
      //   ]