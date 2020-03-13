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

          // async _resetPXE(sn){
    //     await dgapi.pxeReset(sn).then((result)=>{
    //         this.setState({
    //             notify:{         
    //                 title: "Erfolg",
    //                 message: `${sn} wird zurückgesetzt.`,
    //                 status: true,
    //                 type: "default"
    //               }
    //         })
    //         setTimeout(() => {
    //             this.setState(
    //                 {
    //                 notify: {
    //                   title: "",
    //                   message: "",
    //                   status: false,
    //                   type: "default"
    //                 }
    //               }
    //             );
    //             this.props.updateApp()
    //           }, 800);
    //     }) 
    // }