import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'postMessage',
      usernameOld: 'Anon',
      content: ''
    }

    this.onContent = this.onContent.bind(this);
    this.onUser = this.onUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /*onContent
   ***********
   * Sets message to content
   */
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  /*onUser
   ********
   * Sets username
   */
  onUser(event) {
    this.setState({
      type: 'postNotification',
      username: event.target.value
    });
  }

  /*KeyPress Handle
   *****************
   * Sends data to parent on enter
   * Clears message bar afterwords
   */
  handleKeyPress(event) {
    if (event.key === 'Enter' && this.state.content.length > 0) {
      if (this.state.content[0] == '/') {
        let content = this.state.content.split(' ');
        let cmd = content.shift().replace('/', '');
        let msg = content.join(' ');
        switch (cmd) {
          case 'img':
            this.setState({
              type: 'postImg',
              content: ''
              })
            break;
          default:
        }

      }else {
        this.setState({
          type: 'postMessage',
          usernameOld: this.state.username,
          content: ''
        });
      }
        this.props.onNewMessage(this.state);



    }
  }

  render() {
    return (
      <footer className="chatbar"
              onKeyPress={this.handleKeyPress} >

        <input  className='chatbar-username'
                placeholder='Your Name ( Optional)'
                defaultValue={this.state.username }
                onChange={ this.onUser }/>

        <input  className='chatbar-message'
                placeholder='Type a message and hit ENTER'
                onChange={ this.onContent }
                value={ this.state.content }
                />

      </footer>
    )
  }
}
export default ChatBar;
