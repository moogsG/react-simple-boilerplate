import React, {Component} from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">ChattyAPP</a>
        <h3 className="userCount">Users: {this.props.userCount} </h3>
      </nav>
    )
  }
}
export default Nav;