import React, { Component } from "react";
import Editor from "./Editor";

export default class Snippet extends Component {
  state = {
    code: "",
    lang: ""
  };

  // helpers cuz lazy
  setLang = (lang) => {
    localStorage.setItem('data',this.state.code);
  }

  //First check if we have saved code in local storage
  getCode() {

  }

  componentDidMount() {
    this.setState({
      lang: 'python',
      code: this.getCode()
    })
  }

  componentDidUpdate(prevProps, prevState) {
      localStorage.setItem('data', this.state.code);
    }

  render() {
    const { code, lang } = this.state;
    return (
      <div className="playground">

        <div className="playground-content">
          {/* editors */}
          {/* TODO: add support for html and css */}
          {/* <Editor language="html" code={html} updateCode={this.setHtml} />
              <Editor language="css" code={css} updateCode={this.setCss} /> */}
          <Editor language={lang} code={code} />

          {/* browser will run all of our code in an iframe */}

          {/* console only shows the output of history */}
        </div>
      </div>
    );
  }
}
