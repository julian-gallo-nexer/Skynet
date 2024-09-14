import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('chat-interface')
class ChatInterface extends LitElement {
  @property({ type: Array })
  messages: Array<{ user: string, text: string }> = [];

  @property({ type: String })
  currentMessage: string = '';

  @property({ type: String })
  username: string = 'User';

  render() {
    return html`
      <div class="chat-container">
        <div class="messages">
          ${this.messages.map(message => html`
            <div class="message">
              <span class="user">${message.user}:</span> ${message.text}
            </div>
          `)}
        </div>

        <div class="input-container">
          <input type="text" .value=${this.currentMessage} @input=${this._onInput} placeholder="Type a message..." />
          <button @click=${this._sendMessage}>Send</button>
        </div>
      </div>
    `;
  }

  private _onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.currentMessage = input.value;
  }

  private _sendMessage() {
    if (this.currentMessage.trim()) {
      this.messages = [...this.messages, { user: this.username, text: this.currentMessage }];
      this.currentMessage = '';
    }
  }

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .chat-container {
      width: 300px;
      max-width: 100%;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
    }

    .messages {
      height: 200px;
      overflow-y: auto;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }

    .message {
      padding: 5px 0;
    }

    .message .user {
      font-weight: bold;
    }

    .input-container {
      display: flex;
    }

    input[type="text"] {
      flex: 1;
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    button {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-interface': ChatInterface;
  }
}
