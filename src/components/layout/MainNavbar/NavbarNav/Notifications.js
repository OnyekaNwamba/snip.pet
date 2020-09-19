import React from "react";
import { NavItem, NavLink } from "shards-react";
import { withRouter } from "react-router";

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  render() {
    const createSnippet = () => {

      let noOfUntitled = 0

      let snippets = JSON.parse(localStorage.getItem('snippets'));

      for(let i=0; i<snippets.length; i++) {
        if(snippets[i].isUntitled) {
          noOfUntitled = noOfUntitled + 1
        }
      }

      let snipTitle = noOfUntitled === 0 ? "Untitled" : "Untitled("+noOfUntitled+")"

      this.props.history.push('?snip='+snipTitle)
      window.location.reload();
    }
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          href="#"
          onClick={createSnippet}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">note_add</i>
          </div>
        </NavLink>
      </NavItem>
    );
  }
}
export default withRouter(Notifications)
