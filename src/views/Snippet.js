import React, { Component } from "react";
import Editor from "./Editor";

export default class Snippet extends Component {
  constructor(props) {
    super(props);

    const getSnippet = (snippets,title) =>  {
      for(let i=0; i<snippets.length; i++) {
        if(snippets[i].title===title) {
          return snippets[i]
        }
      }
    }
    const snippets = JSON.parse(localStorage.getItem('snippets')) || {};
    const snippet = getSnippet(snippets,"Demo")
    this.state = { 
      lang: snippet ? snippet.lang : "python",
      title: "",
      snippets: snippets
    };
  }

  getSnippet = (snippets,title) =>  {
    for(let i=0; i<snippets.length; i++) {
      if(snippets[i].title===title) {
        return snippets[i]
      }
    }
  }
  

  componentDidMount() {

    const snippets = JSON.parse(localStorage.getItem('snippets'));
    const snippet = this.getSnippet(snippets,"Demo")

    this.setState({
      lang: 'python',
      code: this.getSnippet(snippets,"Demo").code,
      snippets: snippets
    })
    console.log("PROPS")
    console.log(this.getSnippet(snippets,"Demo").code)
  }

  componentDidUpdate(prevProps, prevState) {
      localStorage.setItem('data', "NSK");
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
