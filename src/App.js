import React, { Component } from 'react';
import { Form, StyledText, StyledRadioGroup, StyledRadio } from 'react-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './App.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const selectRowProp = {
  mode: 'checkbox'
};

function onAfterDeleteRow(rowKeys) {
  const store = JSON.parse(localStorage.getItem("store"))
  store.splice(rowKeys, 1)
  localStorage.setItem('store', JSON.stringify(store));
}

const options = {
  afterDeleteRow: onAfterDeleteRow
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem("store")) || []
    };
  }

  errorValidator = ( values ) => {
    const validateFirstName = ( firstName ) => {
      if (!firstName) {
        return 'First name is required.'
      } else if (firstName.length < 2) {
        return 'First name must be longer than 2 characters.'
      }
      return null;
    };
    const validateLastName = ( lastName ) => {
      if (!lastName) {
        return 'First name is required.'
      } else if (lastName.length < 2) {
        return 'Last name must be longer than 2 characters.'
      }
      return null;
    };
    const validatePhone = ( phone ) => {
      if (!phone) {
        return 'Phone is required.'
      } else if (phone.length < 10) {
        return 'Phone must be longer than 10 characters.'
      } else if (isNaN(phone)) {
        return 'Use only numbers'
      }
      return null;
    };
    const validateGender = ( gender ) => {
      return !gender ? 'Gender is required.' : null;
    };
    const validateAge = ( age ) => {
      if (!age) {
        return 'Age is required.'
      } else if (isNaN(age)) {
        return 'Use only numbers'
      } else if (age < 18) {
        return 'Your age must be higher than 18.'
      }
      return null;
    };
    return {
      firstName: validateFirstName( values.firstName ),
      lastName: validateLastName( values.lastName ),
      phone: validatePhone( values.phone ),
      gender: validateGender (values.gender),
      age: validateAge( values.age )
    };
  }

  save = (values, formApi) => {
    const {items} = this.state;

    const newItem = values;
    newItem.age = + values.age;
    newItem.id = items.length;

    this.setState({
      items: [...items, newItem]
    })



    localStorage.setItem('store', JSON.stringify(this.state.items));
    console.log(localStorage.getItem('store'));

    this.allForm.context.formApi.setAllValues({
      firstName: null,
      lastName: null,
      phone: null,
      gender: null,
      age: null,
    });
  }

  render() {
    const { items } = this.state;

    return (
      <div className="App">
        <div className="col-md-3">
          <Form
            dontValidateOnMount={true}
            validateOnSubmit={true}
            validateError={this.errorValidator}
            onSubmit={this.save}
          >
            { formApi => (
              <form onSubmit={formApi.submitForm} id="form1" className="mb-4">
                <label htmlFor="firstName">First name</label>
                <StyledText  field="firstName" id="firstName" ref={(form) => { this.allForm = form; }} />

                <label htmlFor="lastName">Last name</label>
                <StyledText  field="lastName" id="lastName" />

                <label htmlFor="phone">Phone</label>
                <StyledText  field="phone" id="phone" />

                <label>Choose Gender</label>
                <StyledRadioGroup field="gender">
                  { group => (
                    <div>
                      <StyledRadio group={group} value="male" id="male" label="Male" className="d-inline-block" />
                      <StyledRadio group={group} value="female" id="female" label="Female" className="d-inline-block" />
                    </div>
                  )}
                </StyledRadioGroup>

                <label htmlFor="age">Age</label>
                <StyledText  field="age" id="age" />

                <button type="submit" className="mb-4 btn btn-primary">Submit</button>
              </form>
            )}
          </Form>
        </div>

        <div className="col-md-9">
          <BootstrapTable data={items} deleteRow={true} selectRow={selectRowProp} options={options}>
            <TableHeaderColumn dataField='id' dataSort={true} width='50' isKey>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName' dataSort={true}>First Name</TableHeaderColumn>
            <TableHeaderColumn dataField='lastName' dataSort={true}> Last Name</TableHeaderColumn>
            <TableHeaderColumn dataField='phone' dataSort={true}>Phone</TableHeaderColumn>
            <TableHeaderColumn dataField='gender' dataSort={true} width='120'>Gender</TableHeaderColumn>
            <TableHeaderColumn dataField='age' dataSort={true} width='80'>Age</TableHeaderColumn>
          </BootstrapTable>
        </div>

      </div>
    );
  }
}

export default App;
