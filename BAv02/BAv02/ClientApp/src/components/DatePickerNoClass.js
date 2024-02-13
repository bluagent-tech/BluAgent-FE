import React from 'react';
import { Label, FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: '', withLabel: false };
  }

  handleChange(date) {
    this.setState({ date: date });
  }

  componentDidMount() {
    if (this.props.labelText !== undefined) {
      this.setState({ withLabel: true });
    }
  }
  render() {
    if (!this.state.withLabel) {
      return (
        <DatePicker
          autoComplete='off'
          disabled={this.props.disabled}
          selected={this.state.date}
          id={this.props.id}
          name={this.props.name}
          maxDate={this.props.date}
          placeholderText='Click to select a date'
          showYearPicker
          required
          dateFormat={this.props.monthPicker ? 'MM/yyyy' : undefined}
          showMonthYearPicker={this.props.monthPicker ? true : undefined}
          onChange={this.handleChange.bind(this)}
          value={
            this.state.date === '' && this.props.value !== undefined
              ? this.props.value
              : this.state.date
          }
        />
      );
    } else {
      return (
        <div style={{ zIndex: '2' }}>
          <FormGroup>
            <Label htmlFor='text-input'>{this.props.labelText}</Label>
            {this.props.labelText}
            <DatePicker
              style={{ width: '200px' }}
              autoComplete='off'
              disabled={this.props.disabled}
              selected={this.state.date}
              id={this.props.id}
              name={this.props.name}
              LabelText={this.props.labelText}
              showYearDropdown
              placeholderText='Click to select a date'
              dateFormat={this.props.monthPicker ? 'MM/yyyy' : undefined}
              showMonthYearPicker={this.props.monthPicker ? true : undefined}
              required
              onChange={this.handleChange.bind(this)}
              value={
                this.state.date === '' && this.props.value !== undefined
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

export default CustomDatePicker;
