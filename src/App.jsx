import React, {Component} from 'react';
import ChatBar            from './ChatBar.jsx';
import MessageList        from './MessageList.jsx';
import Nav                from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }


  componentDidMount() {
    this.connection = new WebSocket('ws:localhost:3001')
    this.connection.onmessage = evt => {
      let data = JSON.parse(evt.data);
      console.log(evt.data.users)
      console.log(data)
      switch(data.type) {
        case "incommingCount":
          console.log('msg')
          this.setState({userCount: data.users})
          break;
        case "incomingMessage":
          console.log('msg')
          let messages = this.state.messages.concat(data)
          this.setState({messages: messages})
          break;
        case "incomingNotification":
          console.log('changed username');
          data.notification = (data.usernameOld + ' changed their name to ' + data.username + '.');
          messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
        default:
          console.log('didnt hit anything')
        // show an error in the console if the message type is unknown
    }


    }
        console.log('Connected to server')
  }

  onNewMessage(content) {
    //console.log(content);
    this.connection.send(JSON.stringify(content));
  }


  render() {
    return (
      <div>
      <Nav userCount = {this.state.userCount}/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar  onNewMessage = {this.onNewMessage}
                currentUser = {this.state.currentUser.name}/>
      </div>
    )
  }
}

export default App;

