import React, { Component } from 'react'
import './styles.css'

export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      uname:"",
      email:"",
      password:"",
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const {uname,email,password} = this.state;
    console.log(uname,email,password);
    fetch("http://localhost:3000/registery",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        uname,
        email,
        password,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      alert("Registered succesfully ");
      window.localStorage.setItem("token",data.data);
      window.location.href="./sign-in";
      console.log(data,"userRegister");
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='page'>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>user name</label>
          <input type="text" className="form-control" placeholder="user name" 
          onChange={(e)=>this.setState({uname:e.target.value})} />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password:e.target.value})}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
        </div>
      </form>
    )
  }
}
