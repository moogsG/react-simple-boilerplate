import React, {Component} from 'react';

class ChatBar extends Component {
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('msg')
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className='chatbar-username' placeholder='Your Name ( Optional)' defaultValue={this.props.currentUser}/>
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={this._handleKeyPress}/>
      </footer>
    )
  }
}
export default ChatBar;