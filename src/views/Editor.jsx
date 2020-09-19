import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { FormSelect, Row } from 'shards-react';
import { Helmet } from "react-helmet";
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
      snippets: [],
      snippet: {
        title: "Demo",
        code: "",
      }
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

  componentDidMount() {
    this.setState({
      value: this.props.code,
      snippets: JSON.parse(localStorage.getItem('snippets')) || [{
        title: "Demo",
        code: "Hello World",
        lang: this.state.mode
      }]
    })
    console.log("HISTORY: "+ this.props.history)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code)
      this.setState({ value: this.props.code });
  }

  handleChange = (editor, data, value) => {
    let temp = this.state.snippet;
    temp.code = value
    temp.lang =  this.state.mode
    this.setState({
      value: value,
      snippet: temp,
      lang: temp.lang
    });
    if(this.state.snippets.length==0) {
      this.state.snippets.push(this.state.snippet)
    }

    for(let i=0; i<this.state.snippets.length; i++) {
      if(this.state.snippets[i].title==="Demo") {
        this.state.snippets[i] = temp;
      }
    }
    localStorage.setItem('snippets', JSON.stringify(this.state.snippets))
  };

  onChangeHandler(e) {
    this.setState({
      mode: e.target.value,
      value: this.state.value,
      lang: this.state.mode
    })
  }

  saveCode() {

    if(this.state.snippets.length==0) {
      this.state.snippets.push(this.state.snippet)
    }

    for(let i=0; i<this.state.snippets.length; i++) {
      if(this.state.snippets[i].title==="Demo") {
        this.state.snippets[i].code = this.state.value;
        this.state.snippets[i].lang = this.state.mode;
      }
    }
    localStorage.setItem('snippets', JSON.stringify(this.state.snippets))
  }

  render() {
    const options = { lineNumbers: true, mode: this.state.mode, theme: 'ayu-mirage' };

    console.log(JSON.stringify(this.props.params))

    return (
      <div className="playground-editor">


      <Row className={"m-4"}>
        <FormSelect 
        value={this.state.mode} 
        onChange={(e) => {
          this.setState({mode: e.target.value})
          for(let i=0; i<this.state.snippets.length; i++) {
            if(this.state.snippets[i].title==="Demo") {
              this.state.snippets[i].code = this.state.value;
              this.state.snippets[i].lang = e.target.value;
            }
          }
          localStorage.setItem('snippets', JSON.stringify(this.state.snippets))
        }}>
          {
            this.languages.map((language, index) => {
              return(<option key={index} value={this.modes[index]}>{language}</option>)
            })
          }
        </FormSelect>
      </Row>
      <CodeMirror
          className={"ml-4"}
          value={this.state.value}
          onBeforeChange={this.handleChange}
          onChange={this.saveCode.bind(this)}
          options={options}
          height={"100%"}
        />
      </div>
    );
  }
}
