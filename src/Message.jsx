import React, {Component} from 'react';
import stringToColour from '../textColour.js';

  class Message extends Component {
     componentDidMount() {
      this.setState({

      });
     }
    render() {
      let style = {
        color: stringToColour(this.props.username)
      };

      return (
        <div>
          <div className="message system">
            {this.props.notification}
          </div>
          <div className="message">
            <span className="message-username" style={style}>{this.props.username}</span>
            <img
          className="messageImage"
          src={this.props.img}
        />
            <span className="message-content">{this.props.content}</span>
          </div>
        </div>
      )
    }
  }
export default Message;

