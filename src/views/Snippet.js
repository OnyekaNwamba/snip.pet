import React, { Component } from "react";
import Editor from "./Editor";

export default class Snippet extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      lang: "",
      code:  localStorage.getItem('data') || "",
    };
  }

  componentDidMount() {
    this.setState({
      lang: 'python',
      code: localStorage.getItem('data') || ""
    })
  }

  componentDidUpdate(prevProps, prevState) {
      localStorage.setItem('data', localStorage.getItem('data'));
    }

  render() {
    return (
      <div className="playground">
        <div className="playground-content">
          <Editor language={this.state.lang} code={this.state.code} />
        </div>
      </div>
    );
  }
}
