import React, {Component} from 'react';
import ChatBar            from './ChatBar.jsx';
import MessageList        from './MessageList.jsx';
import Nav                from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  load() {
    console.log('Loadding...')
      this.setState({
        messages: [{
          id: '1',
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: '2',
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }],
        currentUser: {name: "Bob"}
      }
    );
  }

  componentDidMount() {
    this.load();
  }

  onNewMessage(content) {
    if(content){
    const messages = this.state.messages.concat(content)
    console.log(content);
    this.setState({messages: messages})
    }
  }


  render() {
    return (
      <div>
      <Nav/>
      <MessageList messages   = {this.state.messages}/>
      <ChatBar  onNewMessage  = {this.onNewMessage}
                currentUser   = {this.state.currentUser.name}/>
      </div>
    )
  }
}

export default App;

