import React from 'react';
import { Label, FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "", withLabel: false, required: true };
  }
  handleChange(date) {
    this.setState({ date: date });
    if(this.props.handleDatePicker!==undefined) {
      this.props.handleDatePicker(date);
    }
  }

  componentDidMount() {
    if (this.props.labelText !== undefined) {
      this.setState({ withLabel: true });
    }

    if (this.props.required !== "true") {
      this.setState({ required: false });
    }
  }

  render() {
    if (this.state.required) {
      if (!this.state.withLabel) {
        return (
          <DatePicker
            autoComplete="off"
            disabled={this.props.disabled}
            className="form-control"
            selected={this.state.date}
            id={this.props.id}
            name={this.props.name}
            maxDate={this.props.date}
            placeholderText="Click to select a date"
            showYearPicker
            required
            dateFormat={this.props.monthPicker ? "MM/yyyy" : undefined}
            showMonthYearPicker={this.props.monthPicker ? true : undefined}
            onChange={this.handleChange.bind(this)}
            value={
              this.state.date === "" && this.props.value !== undefined
                ? this.props.value
                : this.state.date
            }
          />
        );
      } else {
        return (
          <div style={{ zIndex: "2" }}>
            <FormGroup>
              <Label htmlFor="text-input">{this.props.labelText}</Label>
              <br />
              <DatePicker
                autoComplete="off"
                disabled={this.props.disabled}
                className="form-control col-12"
                selected={this.state.date}
                id={this.props.id}
                name={this.props.name}
                showYearDropdown
                placeholderText="Click to select a date"
                dateFormat={this.props.monthPicker ? "MM/yyyy" : undefined}
                showMonthYearPicker={this.props.monthPicker ? true : undefined}
                required
                onChange={this.handleChange.bind(this)}
                value={
                  this.state.date === "" && this.props.value !== undefined
                    ? this.props.value
                    : this.state.date
                }
              />
            </FormGroup>
          </div>
        );
      }
    } else {
      if (!this.state.withLabel) {
        return (
          <DatePicker
            autoComplete="off"
            disabled={this.props.disabled}
            className="form-control"
            selected={this.state.date}
            id={this.props.id}
            name={this.props.name}
            maxDate={this.props.date}
            placeholderText="Click to select a date"
            showYearPicker
            dateFormat={this.props.monthPicker ? "MM/yyyy" : undefined}
            showMonthYearPicker={this.props.monthPicker ? true : undefined}
            onChange={this.handleChange.bind(this)}
            value={
              this.state.date === "" && this.props.value !== undefined
                ? this.props.value
                : this.state.date
            }
          />
        );
      } else {
        return (
          <div style={{ zIndex: "2" }}>
            <FormGroup>
              <Label htmlFor="text-input">{this.props.labelText}</Label>
              <br />
              <DatePicker
                autoComplete="off"
                disabled={this.props.disabled}
                className="form-control col-12"
                selected={this.state.date}
                id={this.props.id}
                name={this.props.name}
                showYearDropdown
                placeholderText="Click to select a date"
                dateFormat={this.props.monthPicker ? "MM/yyyy" : undefined}
                showMonthYearPicker={this.props.monthPicker ? true : undefined}
                onChange={this.handleChange.bind(this)}
                value={
                  this.state.date === "" && this.props.value !== undefined
                    ? this.props.value
                    : this.state.date
                }
              />
            </FormGroup>
          </div>
        );
      }
    }
  }
}

export default CustomDatePicker;

//<DatePicker
//    autoComplete="off"
//    disabled={this.props.disabled}
//    className="form-control"
//    selected={this.state.date}
//    id={this.props.id}
//    name={this.props.name}
//    maxDate={this.props.date}
//    placeholderText="Click to select a date"
//    required
//    dateFormat={this.props.monthPicker ? "MM/yyyy h:mm aa" : undefined}
//    showMonthYearPicker={this.props.monthPicker ? true : undefined}
//    showTimeSelect
//    timeFormat="HH:mm"
//    timeIntervals={15}
//    timeCaption="time"
//    onChange={this.handleChange.bind(this)}
//    value={this.state.date === '' && this.props.value !== undefined ? this.props.value : this.state.date}
///>
