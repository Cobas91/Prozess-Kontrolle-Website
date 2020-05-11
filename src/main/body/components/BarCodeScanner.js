import React, { Component } from "react";
import Quagga from "quagga";

export class BarCodeScanner extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      label: this.props.label,
      className: this.props.className,
      barcode: "",
    };
    this._onDetected = this._onDetected.bind(this);
  }

  componentDidMount() {
    var canvas = document.getElementById("scanner-container");
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: canvas,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // or user
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 0,
        decoder: {
          readers: ["code_39_reader"],
        },
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true,
          },
        },
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }
        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(this._onDetected);
  }

  _onDetected(result) {
    this.props.onDetected(result);
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  // componentDidMount() {
  //     var canvas = document.getElementById("scanner-container")
  //     Quagga.init({
  //       inputStream: {
  //         name: "Live",
  //         type: "LiveStream",
  //         target: canvas,
  //         constraints: {
  //             width: 480,
  //             height: 320,
  //             facingMode: "environment"
  //         },
  //     },
  //       decoder : {
  //         readers: [
  //           "code_39_reader",
  //       ],
  //       debug: {
  //           showCanvas: true,
  //           showPatches: true,
  //           showFoundPatches: true,
  //           showSkeleton: true,
  //           showLabels: true,
  //           showPatchLabels: true,
  //           showRemainingPatchLabels: true,
  //           boxFromPatches: {
  //               showTransformed: true,
  //               showTransformedBox: true,
  //               showBB: true
  //           }
  //       }
  //       }
  //     }, function(err) {
  //       if (err) {
  //           console.log(err);
  //           return
  //       }
  //       console.log("Initialization finished. Ready to start");
  //       Quagga.start();

  //     });

  //       Quagga.onDetected(this.handleScan)
  //     //   Quagga.onDetected(function (result) {
  //     //     console.log("Barcode detected and processed : [" + result.codeResult.code + "]");
  //     //     document.getElementById("S/N").value = result.codeResult.code
  //     //     this.handleScan(result.codeResult.code)
  //     //     canvas.style.display = "none"
  //     //     Quagga.stop();
  //     //   })
  // }

  render() {
    return (
      <div>
        <div id="scanner-container"></div>
      </div>
    );
  }
}

export default BarCodeScanner;
