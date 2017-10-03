import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav     from './Nav.jsx';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      messages: []
    };
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
        currentUser: [{name: "Bob"}]
      }
    );
  }

  componentDidMount() {
    this.load();
/*    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);*/
  }

  onNewPost(content) {
    ChatBar.post('/messages', { content }).then(() => this.load());
  }

  render() {
    return (
      <div>
      <Nav/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar currentUser = {this.state.currentUser.name}/>
      </div>
    )
  }
}

export default App;

