import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("hero-element")
export class HeroElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Click on the Vite and Lit logos to learn more";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

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
    `;
  }

  // private _onClick() {
  //   this.count++;
  // }

  static styles = css`

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

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "hero-element": HeroElement;
  }
}
