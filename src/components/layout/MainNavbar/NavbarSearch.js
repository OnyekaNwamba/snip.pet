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

  //TODO: No duplicate names
  //TODO: No empty name

  render() {

    return(
      <Form size="lg">
        <InputGroup>
          <FormInput
            value={new URLSearchParams(window.location.search).get('snip')}
            style={{width:"1350px", height:"100%", fontSize:"30px", fontWeight:"bold"}}
          />
        </InputGroup>
      </Form>
    )
  }
}

export default withRouter(NavbarSearch)

