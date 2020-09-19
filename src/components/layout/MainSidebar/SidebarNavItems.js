import React from "react";
import { Nav } from "shards-react";
import { useHistory } from 'react-router-dom';
import SidebarNavItem from "./SidebarNavItem";
import getNavItems from "/Users/nwamba/Documents/snippet/src/data/sidebar-nav-items.js"
import { withRouter } from "react-router";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      navItems: []
    };
  }

  componentDidMount() {
    this.setState ({
      navItems: [
        {
          title: "YAY",
          to: "",
          htmlBefore: '',
          htmlAfter: ""
        },
        {
          title: "YAYS",
          to: "",
          htmlBefore: '',
          htmlAfter: ""
        }
      ]

    });
    //const history = useHistory();
  }

  onChange = () => {

  }


  render() {
    //const { navItems: items } = this.state.navItems;
    //const history = useHistory();

    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {this.state.navItems.map((item, idx) => {
            let isActive = item.title=="YAS"  ? true : false
            return(<SidebarNavItem key={idx} item={item} active={isActive} onClick={() =>console.log("Hi")}/>)
          })}
        </Nav>
      </div>
    )
  }
}

export default withRouter(SidebarNavItems);
