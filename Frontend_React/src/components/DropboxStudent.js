import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

export default class DropboxStudent extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      id: "",
      name: ''
    }
  }

 async getOptions(){
    const res = await axios.get('/api/students/');
    const data = res.data;

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.firstName + d.lastName

    }));

    this.setState({selectOptions: options});

  }

  handleChange(e){
   this.setState({id:e.value, name:e.label});
  }

  componentDidMount(){
      this.getOptions();
  }

  render() {
    console.log(this.state.selectOptions)
    return (
      <div>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}