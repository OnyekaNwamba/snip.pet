import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import './Editor.scss';
import 'codemirror/mode/python/python';
require('codemirror/mode/css/css');
require('codemirror/mode/javascript/javascript');

export default class Editor extends Component {
  state = { value: this.props.code };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.code !== this.props.code)
      this.setState({ value: this.props.code });
  }

  handleChange = (editor, data, value) => {
    this.setState({ value });
    localStorage.setItem('data',this.state.value);
  };

  render() {
    console.log(this.state)
    const { value } = this.state;
    const options = { lineNumbers: true, mode: this.props.language, theme: 'ayu-mirage' };

    console.log("LANG:" + options.mode);
    return (
      <div className="playground-editor">
        <CodeMirror
          value={value}
          onBeforeChange={this.handleChange}
          onChange={localStorage.setItem('data',this.state.value)}
          options={options}
        />
      </div>
    );
  }
}
