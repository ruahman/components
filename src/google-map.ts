import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("google-map")
export class GoogleMapsElement extends LitElement {
  static styles = css`
    #map {
      height: 400px;
    }
  `;

  @property({ type: String })
  apiKey: string = "api-key";

  constructor() {
    super();
  }

  firstUpdated() {
    this.loadMap();
  }

  async loadMap() {
    try {
      const url = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=console.debug&libraries=maps,marker&v=beta`;
      await import(url);

      const _map = new google.maps.Map(this.shadowRoot.getElementById("map"), {
        center: { lat: 41.87812805175781, lng: -87.63029479980469 },
        zoom: 8,
      });
    } catch (error) {
      console.error("Error loading Google Maps API:", error);
    }
  }

  render() {
    return html`<div id="map"></div>`;
  }
}