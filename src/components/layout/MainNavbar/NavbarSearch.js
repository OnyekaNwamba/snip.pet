import React from "react";
import {
  Form,
  InputGroup,
  FormInput
} from "shards-react";
import { withRouter } from "react-router";

class NavbarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  componentDidMount() {
    this.setState ({
      title: new URLSearchParams(window.location.search).get('snip')
    })
  }

  //TODO: Fix bug => Renaming snips with spaces creates errors
  //TODO: No duplicate names
  //TODO: No empty name
  renameSnippet = (e) => {
    const snippets = JSON.parse(localStorage.getItem('snippets'))
    const title = new URLSearchParams(window.location.search).get('snip')
    for(let i=0; i<snippets.length; i++) {
      if(snippets[i].title === title) {
        snippets[i].title = e
        break
      }
    }
    this.props.history.push('?snip='+e)
    localStorage.setItem('snippets', JSON.stringify(snippets))
  }

  render() {

    return(
      <Form className="w-100" size="lg">
        <InputGroup seamless>
          <FormInput
            defaultValue={new URLSearchParams(window.location.search).get('snip')}
            style={{width:"100%", height:"100%", fontSize:"30px", fontWeight:"bold"}}
            onChange={(event) => this.renameSnippet(event.target.value)}
          />
        </InputGroup>
      </Form>
    )
  }
}

export default withRouter(NavbarSearch)

