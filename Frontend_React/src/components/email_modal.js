import React, { useState } from "react";
import axios from "axios";
import {
  BoxComponent
} from './common';

class Mailer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: this.props.dataFromSubject,
      email: this.props.dataFromParent,
      message: this.props.dataFromMessage
    }
  }
  handleSubmit(e) {
    e.preventDefault();
  
    axios({
      method: "POST",
      url:"/api/sendMyEmail",
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if(response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }
  resetForm(){
    this.setState({subject: "", email: "", message: ""})
  }

  render() {
    return(
      <div className="MailerApp">
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" className="form-control" value={this.state.subject} onChange={this.onSubjectChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email Addresses</label>
            <input type="email" multiple name="emails"  true className="form-control" aria-describedby="emailHelp" 
            value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder = 'recipient1, recipient2...' />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          
        </form>
      </div>
    );
  }

  onSubjectChange(event) {
    this.setState({subject: event.target.value})
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
  }

  onMessageChange(event) {
    this.setState({message: event.target.value})
  }
}

export default Mailer;