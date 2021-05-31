import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      pref:this.props.prefFromRegister,
      selectOptions : [],
      course_id: "",
      course_name: ''
    }
  }

 async getOptions(){
    const res = await axios.get('/api/courses/')
    const data = res.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.Course_name

    }))

    this.setState({selectOptions: options})

  }

  handleChange(e){
    this.setState({course_id:e.value, course_name:e.label})
    this.props.sendToRegister(this.state.pref, e.value) //send current preference and course_id to register.js
  }

  componentDidMount(){
      this.getOptions()
  }

  render() {
    // console.log(this.state.selectOptions)
    return (
      <div>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
    {/* <p>You have selected <strong>{this.state.course_name}</strong> whose id is <strong>{this.state.course_id}</strong></p> */}
      </div>
    )
  }
}