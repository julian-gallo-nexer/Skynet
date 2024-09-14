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
        <div class="hero-background continer">
          <h2 class="hero-title">scaynet</h2>
          <h4 class="hero-sub_title">Let Me Make Your Content</h4>
          <p class="hero-paragraph">
            The new tool for your CMS page, let me help you and everything will
            be fine.
          </p>
          <a><button class="hero-button">try it</button></a>
        </div>
      </div>
      <div class="chat-container">
        <div class="chat-header">Live chat</div>
        <div class="messages">
          ${this.messages.map((message) => {
            if (message.role === "user") {
              return html`
                <div class="message-content">
                  <span class="user">${message.role}</span>
                  <div class="message">
                    <p>${message.content}</p>
                  </div>
                </div>
              `;
            } else if (message.role === "bot") {
              return html`
                <div class="messageGpt-content">
                  <span class="Gpt"> ${message.role}</span>
                  <div class="messageGpt">
                    <p>${message.content}</p>
                  </div>
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

  async fetchData(historyMessages: Array<Object>) {
    const theMesage = { messages: historyMessages };
    try {
      const response = await fetch(
        "https://localhost:44352/Chatbot/Chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer kIzNHctDI-RawTkWQ8t7JmEk0ogN4XTmrRu0MFcvx1E",
          },
          body: JSON.stringify(theMesage),
        }
      );

      if (!response) {
        throw new Error("Error to send the message");
      }
      const jsonData: any = await response.text();

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
      height: 100%;
      color: black;
      display: flex;
      width: 100%;
      font-family: Arial, sans-serif;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
    }

    .hero-container {
      width: 100%;
      display: flex;
      top: 0px;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      color: #1f1f1f;
      background: linear-gradient(
        45deg,
        #ff552a,
        #eeba92,
        #ff7eb9,
        #f7e096,
        #a8edea,
        #2575fc,
        #6a11cb,
        #b92b27
      );
      background-size: 200% 200%;
      animation: gradientAnimation 8s ease-in-out infinite;
    }

    @keyframes gradientAnimation {
      0% {
        background-position: 0% 50%;
      }
      25% {
        background-position: 50% 100%;
      }
      50% {
        background-position: 100% 50%;
      }
      75% {
        background-position: 50% 0%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .hero-title {
      text-transform: uppercase;
      font-size: 2rem;
      margin: 10px;
      font-family: sans-serif;
    }

    .hero-button {
      width: 40%;
      height: 35%;
      background: rgba(255, 255, 255, 0.31);
      border-radius: 3px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(9.2px);
      -webkit-backdrop-filter: blur(9.2px);
      border: 0;
    }

    .hero-button :hover {
      cursor: none;
      transform: scale(1.1);
    }

    a {
      font-weight: 500;
      text-decoration: inherit;
    }

    .chat-container {
      justify-content: center;
      margin: 10px;
      margin-top: 1rem;
      max-width: 100%;
      padding: 10px;
      width: 90%;
      margin: 1rem auto;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .chat-header {
      background-color: #f3f4f6;
      padding: 1rem;
      font-weight: bold;
      color: black;
      margin-bottom: 10px;
    }

    .messages {
      min-height: 100px;
      height: auto;
      max-height: 500px;
      overflow-y: auto;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
      /* padding-inline: 10px; */
    }

    .message-content{
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      width: max-content;
      max-width: 80%;
      display: flex;
      flex-direction: column;
      margin-left: auto;
    }
    .message {
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      width: max-content;
      max-width: 80%;
      background-color: #3b82f6;
      color: white;
      display: flex;
      margin-left: auto;

      p {
        margin: 0;
      }
    }

    .messageGpt-content{
      align-self: flex-start;
    }
    .messageGpt {
      background-color: #f3f4f6;
      align-self: flex-start;
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      max-width: 80%;
      width: max-content;
      display: flex;

      p {
        margin: 0;
      }
    }
    .Gpt {
      font-weight: bold;
      align-self: center;
      margin-inline: 10px
      
    }
    
    .user {
      font-weight: bold;
      text-align:end;
      margin-inline: 10px
    }

    .input-container {
      display: flex;
    }

    input[type="text"] {
      flex-grow: 1;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      margin-right: 0.5rem;
    }

    button {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: bold;
      transition: transform 0.3s ease, background-color 0.3s ease;
      border: 0;
    }

    button:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-interface": ChatInterface;
  }
}
