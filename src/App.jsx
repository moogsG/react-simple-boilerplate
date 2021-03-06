import React, {Component} from 'react';
import ChatBar            from './ChatBar.jsx';
import MessageList        from './MessageList.jsx';
import Nav                from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: '',
      userCount: ''
    };

    this.onNewMessage = this.onNewMessage.bind(this);
  }

/*DidMount
**********
*Switch to check data type and render
*/
  componentDidMount() {
    this.connection = new WebSocket('ws:localhost:3001');

    this.connection.onmessage = event => {
      let data = JSON.parse(event.data);

      switch(data.type) {
        case "incomingCount":
          this.setState({userCount: data.users});
        break;
        case "incomingImg":
        case "incomingMessage":
          let messages = this.state.messages.concat(data);
          this.setState({messages: messages});
        break;
        case "incomingNotification":
          data.notification = (data.usernameOld + ' changed their name to ' + data.username + '.');
          messages = this.state.messages.concat(data);

          this.setState({
            messages: messages,
            username: data.username
          });

        break;
        default:
          //error handling here
      }
    }
    console.log('Connected to server');

  }

/*NewMessage
*Sends message to server
*/
  onNewMessage(content) {
    this.connection.send(JSON.stringify(content));
  }

  render() {
    return (
      <div>
        <Nav userCount = {this.state.userCount}/>
        <MessageList messages = {this.state.messages}/>
        <ChatBar
          onNewMessage = {this.onNewMessage}
          username = {this.state.username}
        />
      </div>
    )
  }
}

export default App;
