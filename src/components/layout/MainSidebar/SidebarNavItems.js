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
    return JSON.parse(localStorage.getItem('snippets')).map((snippet) => {
      return {
        title: snippet.title,
        to: "",
        htmlBefore: '',
        htmlAfter: ""
      }
    })
  }

  componentDidMount() {
    this.setState ({
     navItems: this.getNavItems()
    });
   console.log("ITEMS:" + this.state.navItems)
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
