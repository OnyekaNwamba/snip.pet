import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { FormSelect, Row } from 'shards-react'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import './Editor.scss';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/php/php';


export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      value: this.props.code,
      mode: this.props.language, 
    };
  }


  languages = [
    "Python",
    "Javascript",
    "CSS",
    "PHP",
    "C",
    "C++",
    "Java",
    "C#",
    "Objective-C",
    "Scale"
  ]

  modes = [
    "python",
    "javascript",
    "css",
    "php",
    "text/x-csrc",
    "text/x-c++src",
    "text/x-java",
    "text/x-csharp",
    "text/x-objectivec",
    "text/x-scala",
  ]

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code)
      this.setState({ value: this.props.code });
  }

  handleChange = (editor, data, value) => {
    this.setState({ value });
  };

  onChangeHandler(e) {
    this.setState({
      mode: e.target.value
    })
    console.log("HI")
  }

  render() {
    console.log(this.state)
    const { value } = this.state;
    const options = { lineNumbers: true, mode: this.state.mode, theme: 'ayu-mirage' };

    console.log("LANG:" + options.mode);
    return (
      <div className="playground-editor">

      <Row className={"m-4"}>
        <FormSelect id="my" onChange={(e) => this.setState({mode: e.target.value})}>
          {
            this.languages.map((language, index) => {
              return(<option key={index} value={this.modes[index]}>{language}</option>)
            })
          }
        </FormSelect>
      </Row>
      <CodeMirror
          className={"ml-4"}
          value={value}
          onBeforeChange={this.handleChange}
          onChange={localStorage.setItem('data',this.state.value)}
          options={options}
          height={"100%"}
        />
      </div>
    );
  }
}
