import React from "react";
import {NavItem, NavLink, Nav, Tooltip, Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup} from "shards-react";
import { withRouter } from "react-router";

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      deleteTip: false,
      renameTip: false,
      createTip: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDeleteTip = this.toggleDeleteTip.bind(this);
    this.toggleRenameTip = this.toggleRenameTip.bind(this);
    this.toggleCreateTip = this.toggleCreateTip.bind(this);

  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  toggleDeleteTip() {
    this.setState({
      deleteTip: !this.state.deleteTip
    });
  }

  toggleRenameTip() {
    this.setState({
      renameTip: !this.state.renameTip
    });
  }

  toggleCreateTip() {
    this.setState({
      createTip: !this.state.createTip
    });
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

    const deleteSnippet = () => {
      const snippets = JSON.parse(localStorage.getItem('snippets'))
      const title = new URLSearchParams(window.location.search).get('snip')
      for(let i=0; i<snippets.length; i++) {
        if(snippets[i].title === title) {
          snippets.splice(i,1)
          break
        }
      }
      localStorage.setItem('snippets', JSON.stringify(snippets))
      this.props.history.push('?snip='+snippets[0].title)
      window.location.reload();
    }

    return (
      <div>
        <Modal open={this.state.open}>
          <ModalHeader>Delete Snip</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {new URLSearchParams(window.location.search).get('snip')}?
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggle}>Cancel</Button>
            <Button theme="danger" onClick={deleteSnippet}>Delete</Button>
          </ModalFooter>
        </Modal>
        <Nav className="w-100">
          <NavItem id="CreateSnip">
            <NavLink
              className="nav-link-icon"
              href="#"
              onClick={createSnippet}
            >
              <i className="material-icons">note_add</i>

            </NavLink>
          </NavItem>
          <NavItem id="DeleteSnip">
            <NavLink
              className="nav-link-icon"
              href="#"
              onClick={this.toggle}
            >
              <i className="far fa-trash-alt" style={{color:'red'}}/>
            </NavLink>
          </NavItem>

          <NavItem id="RenameSnip">
            <NavLink
              className="nav-link-icon"
              href="#"
              onClick={this.toggle}
            >
              <i className="far fa-edit"/>
            </NavLink>
          </NavItem>
        </Nav>
        <Tooltip
          open={this.state.renameTip}
          target="#RenameSnip"
          toggle={this.toggleRenameTip}
        >
          Rename snip
        </Tooltip>
        <Tooltip
          open={this.state.deleteTip}
          target="#DeleteSnip"
          toggle={this.toggleDeleteTip}
        >
          Delete snip
        </Tooltip>
        <Tooltip
          open={this.state.createTip}
          target="#CreateSnip"
          toggle={this.toggleCreateTip}
        >
          Create new snip
        </Tooltip>
      </div>
    );
  }
}
export default withRouter(Notifications)
