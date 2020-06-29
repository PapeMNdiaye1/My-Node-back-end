import React, { Component } from "react";
// import "./customers.css";

const myFetcher = async (theUrl, theType, data) => {
  var dataToSend = await data;
  await fetch(theUrl, {
    method: theType,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(dataToSend),
  });
};
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "papediop",
      Email: "pmomar44@gmal.com",
      Password: "papeduip",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    myFetcher("/signup", "post", this.state);
  }

  handleChange(e) {
    const theFormName = e.target.name;
    const theFormValue = e.target.value;
    this.setState({
      [theFormName]: theFormValue,
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state);
    myFetcher("/signup", "post", this.state);
  }
  // ############################################
  render() {
    return (
      <div>
        <div className="container">
          <h1 className="mb-4">Signup</h1>
          <div> {JSON.stringify(this.state)}</div>
          <form action="/" method="POST" onSubmit={this.handleClick}>
            <Form type="text" name="Name" onchange={this.handleChange} />
            <Form type="email" name="Email" onchange={this.handleChange} />
            <Form
              type="password"
              name="Password"
              onchange={this.handleChange}
            />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const Form = ({ type, name, onchange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input
        required
        type={type}
        name={name}
        id={name}
        className="form-control"
        onChange={onchange}
      />
    </div>
  );
};

export default SignUp;
