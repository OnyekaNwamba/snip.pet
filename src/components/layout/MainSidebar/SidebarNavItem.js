import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { NavItem, NavLink } from "shards-react";

class SidebarNavItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const onClickHandler = () => {
      const current = this.props.location.pathname + '?snip=' + this.props.item.title;
      console.log(current)
      this.props.history.replace(`/reload`);
      setTimeout(() => {
        this.props.history.replace(current);
      });
    }

    return (
      <NavItem>
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
