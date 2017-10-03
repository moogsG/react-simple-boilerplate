import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
      this.state = {
        //id: '',
        username: '',
        content: ''
      }

    this.onContent = this.onContent.bind(this);
    this.onUser = this.onUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.setState({
      //id: ,
      username: this.props.currentUser
    });
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onUser(event) {
    this.setState({
      username: event.target.value || 'Anonymous'
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onNewMessage(this.state);
    }
  }

  render() {
    return (
      <footer className="chatbar"
              onKeyPress={this.handleKeyPress} >
        <input  className='chatbar-username'
                placeholder='Your Name ( Optional)'
                defaultValue={this.state.username || this.props.currentUser}
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