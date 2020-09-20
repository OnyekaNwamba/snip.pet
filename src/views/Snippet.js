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
      isUntitled: false,
      duplicateNumber: 0,
        
    }

    const snippets = JSON.parse(localStorage.getItem('snippets')) || [firstTime];
    const snippet = this.getSnippet(snippets,new URLSearchParams(window.location.search).get('snip'))
    this.state = { 
      lang: snippet.lang,
      title: snippet.title,
      snippets: snippets,
      isUntitled: false
    };
  }

  getSnippet = (snippets,title) =>  {

    for(let i=0; i<snippets.length; i++) {
      if(snippets[i].title===title) {
        return snippets[i]
      }
    }

    const newSnip = {
      title: title,
      code: "",
      lang: 'python',
      isUntitled: true,
      duplicateNumber: 0
    }
    snippets.push(newSnip)
    localStorage.setItem('snippets', JSON.stringify(snippets));
    return newSnip

  }

  findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    let results;
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1].title === sorted_arr[i].title) {
        results = i;
      }
    }
    if(results!=null) {
      arr[results+1].title = arr[results+1].title + "(1)"
      //console.log()
      localStorage.setItem('snippets', JSON.stringify(arr))
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
      duplicateNumber: 0
        
    }

    const snippets = JSON.parse(localStorage.getItem('snippets')) || [firstTime];
    const snippet = this.getSnippet(snippets,new URLSearchParams(window.location.search).get('snip'))

    this.setState({
      lang: 'python',
      code: snippet.code,
      snippets: snippets
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.findDuplicates(JSON.parse(localStorage.getItem('snippets')))
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
