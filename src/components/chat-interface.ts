import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("chat-interface")
class ChatInterface extends LitElement {
  @property({ type: Array })
  messages: Array<{ role: string; content: string; timestap: string }> = [];

  @property({ type: String })
  currentMessage: string = "";

  @property({ type: String })
  username: string = "user";

  @property({ type: String })
  Gpt: string = "bot";

  @property({ type: String })
  GptMessage: string = "";

  constructor() {
    super();
    const savedMessages = localStorage.getItem("chat");
    console.log(savedMessages);
    this.messages = savedMessages ? JSON.parse(savedMessages) : [];
  }

  render() {
    return html`
    <div class="hero-container">
        <div class= "hero-background continer">
          <h2 class='hero-title'> scaynet</h2>
          <h4 class='hero-sub_title'> Let Me Make Your Content </h4>
          <p class='hero-paragraph'> The new tool for your CMS page, let me help you and everything will be fine</p>
          <a><button class="hero-button">try it</button></a>
        </div>
      </div>
      <div class="chat-container">
        <div class="messages">
          ${this.messages.map((message) => {
            if (message.role === "user") {
              return html`
                <div class="message">
                  <span class="user">${message.role}:</span> ${message.content}
                </div>
              `;
            } else if (message.role === "bot") {
              return html`
                <div class="messageGpt">
                  ${message.content}<span class="Gpt"> :${message.role}</span>
                </div>
              `;
            }
          })}
        </div>

        <div class="input-container">
          <input
            type="text"
            .value=${this.currentMessage}
            @input=${this._onInput}
            placeholder="Type a message..."
          />
          <button @click=${this._sendMessage}>Send</button>
        </div>
      </div>
    `;
  }

  private _onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.currentMessage = input.value;
  }

  async fetchData(historyMessages: Array <Object> ) {
    console.log("estoy dentro del fetch");
    const theMesage = {messages : historyMessages};
    try {
      const response = await fetch("https://localhost:44352/Chatbot/Chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify( theMesage ),
      });

      if (!response) {
        throw new Error("Error to send the message");
      }
      const jsonData : any = await response.text();

      this.messages = [
        ...this.messages,
        {
          role: this.Gpt,
          content: jsonData,
          timestap: new Date().toISOString().slice(0, 19),
        },
      ];
      localStorage.clear();
      localStorage.setItem("chat", JSON.stringify(this.messages));
      
    } catch (error: any) {
      this.messages = [
        ...this.messages,
        {
          role: this.Gpt,
          content: error.message,
          timestap: new Date().toISOString().slice(0, 19),
        },
      ];
    }
  }

  private _sendMessage() {
    this.messages = [
      ...this.messages,
      {
        role: this.username,
        content: this.currentMessage,
        timestap: new Date().toISOString().slice(0, 19),
      },
    ];
    this.fetchData(this.messages);
    localStorage.clear();
    localStorage.setItem("chat", JSON.stringify(this.messages));
    this.currentMessage = "";
  }

  static styles = css`
    :host {
      color:rgba(255, 255, 255, 0.87);
      display:flex;
      width:100%;
      font-family: Arial, sans-serif;
      justify-content: center;
    }

    .hero-container{
      width:100%;
      background: rgb(1,0,36);
      background: linear-gradient(90deg, rgba(1,0,36,1) 3%, rgba(9,109,121,1) 24%, rgba(65,9,121,1) 72%);
      position:absolute;
      display:flex;
      top:0px;
      justify-content: center;
      text-align: center;
      padding:2rem;
    }

    .hero-title{
      text-transform:uppercase;
      color:white;
      font-size:2rem;
      margin:10px;
      font-family:sans-serif;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    .chat-container {
      justify-content:center;
      margin:10px;
      margin-top:200px;
      width: 95%;
      max-width: 100%;
      padding: 10px;
      background-color:#383737;
    }

    .messages {
      height: 500px;
      overflow-y: auto;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }

    .message {
      padding: 5px 0;
    }
    .messageGpt {
      padding: 5px 0;
      margin-right:20px;
      display: flex;
      justify-content: flex-end;
    }

    .messageGpt .Gpt {
      font-weight: bold;
    }

    .message .user {
      font-weight: bold;
    }

    .input-container {
      display: flex;
    }

    input[type="text"] {
      border:none;
      flex: 1;
      padding: 5px;
      background-color:#cacaca;
      color:#292929;
    }

    button {
      padding: 5px 10px;
      border: none;
      background-color: #68acf5;
      color: black;
      cursor: pointer;
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
      transform: scale(1.1)
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-interface": ChatInterface;
  }
}
