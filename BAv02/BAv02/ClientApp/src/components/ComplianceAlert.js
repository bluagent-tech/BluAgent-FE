import React from "react";
import { render } from "react-dom";
import { Collapse } from "react-collapse";
import DataTable from "react-data-table-component";
import '../index.css';


//Se restructuro este archivo a una clase
class ComplianceAlert extends React.Component {
  constructor(props) {
    super(props);

    //se declaro el estado que vamos a usar para abrir o cerrar cada uno de los collapsables
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  //Funcion para mostrar o ocultar el collapsable
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {

    //Columnas que tendra la tabla para mostrar a los drivers faltantes




    //Condicion EPN y CA
    //Varaibles para validar el state number
    //Primero llegaran aqui, pasaran por una validacion para saber
    //tienen el tag de employer pull notice y el CA en null
    //En caso de ser null se cambia el valor para ese campo en especifico
    var alert = this.props.alertType;
    var percent = this.props.porcent;
    var drivers = this.props.driverCount;
    if (this.props.tag === "Employer Pull Notice" && this.props.stateNumber === 2) {
      alert = "green";
      percent = 100;
      drivers = this.props.driverOutCount;
    }

    //console.log("Props del compliance alert", this.props);
    return (
      //Se englobo dentro de un div para poder utilizar la funcion on click y llamar a la funcion toggle
      <div >
        <div key={this.props.id} className={
          this.props.isCompliance !== "Company" ? ("custom-alert d-flex " + alert + "-alert onHoverDiv") : ("custom-alert d-flex " + alert + "-alert")
        } onClick={this.toggle}>
          <div className="col-sm-11">
            <div className="row alert-center">
              <div
                className={
                  this.props.type === "driver" ||
                    this.props.type === "trailer" ||
                    this.props.type === "truck"
                    ? "col-sm-4"
                    : "col-sm-6"
                }
              >
                <strong>{this.props.tag}</strong>
              </div>
              {this.props.type === "driver" ||
                this.props.type === "trailer" ||
                this.props.type === "truck" ? (
                <div className="col-sm-4">
                  <strong>
                    {drivers} {this.props.type} out of {this.props.driverOutCount}
                  </strong>
                </div>
              ) : null}
              <div
                className={
                  this.props.type === "driver" ||
                    this.props.type === "trailer" ||
                    this.props.type === "truck"
                    ? "col-sm-4"
                    : "col-sm-6"
                }
              >
                <strong>{percent}%</strong>
              </div>
            </div>
          </div>
          <div className="icon-alert col-sm-1 d-none-auto">
            <i
              className={
                percent !== 100
                  ? "fas fa-exclamation-circle"
                  : "fas fa-check-circle"
              }
            ></i>
          </div>
        </div>
        {this.props.isCompliance !== "Company" ? (
          <Collapse isOpened={this.state.collapse}>
            {
              this.props.tag === "Employer Pull Notice" && this.props.stateNumber === 2 ? (
                <DataTable
                  pagination
                  columns={this.props.columns}
                //data={rows}
                />) : (
                <DataTable
                  columns={this.props.columns}
                  data={this.props.rows}
                  pagination
                  noHeader

                />)
            }
          </Collapse>) : ("")}
      </div>
    );
  }
  //console.log("variable de la alerta: ", alert);
};

export default ComplianceAlert;
