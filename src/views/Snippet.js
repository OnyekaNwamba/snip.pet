import React, { Component } from "react";
import Editor from "./Editor";

export default class Snippet extends Component {
  constructor(props) {
    super(props);

    const firstTime = {
      title: "Demo",
      code: "#Welcome to Snip.pet!\n" + 
            "#Here you can save quick code snippets with color coding and syntax highlighting\n" +
            "\n" +
            "#NOTE: Snip.pet makes use of you local storage to save code snippets. Deleting history may deleted your saved snippets",
      lang: "python",
        
    }

    const getSnippet = (snippets,title) =>  {
      for(let i=0; i<snippets.length; i++) {
        if(snippets[i].title===title) {
          return snippets[i]
        }
      }
    }
    const snippets = JSON.parse(localStorage.getItem('snippets')) || [firstTime];
    const snippet = getSnippet(snippets,"Demo")
    this.state = { 
      lang: snippet.lang,
      title: snippet.title,
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

    const firstTime = {
      title: "Demo",
      code: "#Welcome to Snip.pet!\n" + 
            "#Here you can save quick code snippets with color coding and syntax highlighting\n" +
            "\n" +
            "#NOTE: Snip.pet makes use of you local storage to save code snippets.\n#     Deleting history may deleted your saved snippets",
      lang: "python",
        
    }

    const snippets = JSON.parse(localStorage.getItem('snippets')) || [firstTime];
    const snippet = this.getSnippet(snippets,"Demo")

    this.setState({
      lang: 'python',
      code: snippet.code,
      snippets: snippets
    })
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
