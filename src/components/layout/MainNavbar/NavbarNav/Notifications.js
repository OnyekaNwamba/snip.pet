import React from "react";
import {
  NavItem,
  NavLink,
  Nav,
  Tooltip,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ButtonGroup,
  InputGroup,
  FormInput,
  Alert
} from "shards-react";
import { withRouter } from "react-router";

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openRename: false,
      visibleAlert: false,
      deleteTip: false,
      renameTip: false,
      createTip: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleRename = this.toggleRename.bind(this);
    this.toggleDeleteTip = this.toggleDeleteTip.bind(this);
    this.toggleRenameTip = this.toggleRenameTip.bind(this);
    this.toggleCreateTip = this.toggleCreateTip.bind(this);
    this.deleteSnippet = this.deleteSnippet.bind(this);
    this.createSnippet = this.createSnippet.bind(this);
    //this.renameSnippet = this.renameSnippet.bind(this);

  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  toggleRename() {
    this.setState({
      openRename: !this.state.open
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

  deleteSnippet = () => {
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

  createSnippet = () => {
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

  renameSnippet = () => {
    const snippets = JSON.parse(localStorage.getItem('snippets'))
    const duplicates = this.findDuplicates(snippets, this.state.newName)
    if(duplicates) {
      this.setState({
        visibleAlert: true
      })
    } else {
      this.setState({
        visibleAlert: false
      })
      const title = this.props.newName
      for(let i=0; i<snippets.length; i++) {
        if(snippets[i].title === title) {
          snippets[i].title = this.props.newName
          break
        }
      }
      this.props.history.push('?snip='+this.state.newName)
      localStorage.setItem('snippets', JSON.stringify(snippets))
      window.location.reload();
    }
  }

  //If duplicate, overwrite snippet
  findDuplicates = (arr, newName) => {
    let sorted_arr = arr.slice().sort();
    for (let i = 0; i < sorted_arr.length ; i++) {
      if (newName === sorted_arr[i].title) {
        return true
      }
    }
   return false
  }

  render() {

    return (
      <div>
        <Modal open={this.state.open}>
          <ModalHeader>Delete Snip</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {new URLSearchParams(window.location.search).get('snip')}?
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggle}>Cancel</Button>
            <Button theme="danger" onClick={this.deleteSnippet}>Delete</Button>
          </ModalFooter>
        </Modal>
        <Modal open={this.state.openRename}>
          <ModalHeader>Rename Snip</ModalHeader>
          <ModalBody>
            <Alert theme="danger" open={this.state.visibleAlert}>
              Name {this.state.newName} already exists!
            </Alert>
            Rename <b>{new URLSearchParams(window.location.search).get('snip')}</b>?
            <Form size="lg">
              <InputGroup>
                <FormInput
                  onBeforeChange={(event) => (this.setState({newName: event.target.value}), console.log(this.state.newName))}
                  onChange={(event) => (this.setState({newName: event.target.value}, () => console.log(this.state)))}
                />
              </InputGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => this.toggleRename}>Cancel</Button>
            <Button theme="danger" onClick={() => this.renameSnippet()}>Rename</Button>
          </ModalFooter>
        </Modal>
        <Nav className="w-100">
          <NavItem id="CreateSnip">
            <NavLink
              className="nav-link-icon"
              href="#"
              onClick={this.createSnippet}
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
              onClick={this.toggleRename}
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
