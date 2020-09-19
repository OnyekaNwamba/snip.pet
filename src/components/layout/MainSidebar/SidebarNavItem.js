import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { NavItem, NavLink } from "shards-react";

class SidebarNavItem extends React.Component {
  render() {
    const onClickHandler = () => {
      this.props.history.push('?snip='+this.props.item.title)
      console.log(this.props.history)
      window.location.reload()
    }

    return (
      <NavItem active={this.props.active}>
        <NavLink href="#" onClick={ onClickHandler }>
          {this.props.item.title && <span>{this.props.item.title}</span>}
        </NavLink>
      </NavItem>
    )
  }
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default withRouter(SidebarNavItem);
