import React from "react";
import { Nav } from "shards-react";
import SidebarNavItem from "./SidebarNavItem";
import { withRouter } from "react-router";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      navItems: []
    };
  }

  getNavItems = () => {
    if(JSON.parse(localStorage.getItem('snippets'))) {
      return JSON.parse(localStorage.getItem('snippets')).map((snippet) => {
        return {
          title: snippet.title,
          to: "",
          htmlBefore: '',
          htmlAfter: ""
        }
      })
    }
    return []
  }

  componentDidMount() {
    this.setState ({
     navItems: this.getNavItems()
    });
  }

  render() {
    const currentSnip = new URLSearchParams(window.location.search).get('snip')
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {this.state.navItems.map((item, idx) => {
            let isActive = item.title === currentSnip
            return(<SidebarNavItem key={idx} item={item} active={isActive} />)
          })}
        </Nav>
      </div>
    )
  }
}

export default withRouter(SidebarNavItems);
