import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Loader } from "@googlemaps/js-api-loader";

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

  async firstUpdated() {
    try {
      const loader = new Loader({
        apiKey: this.apiKey,
        version: "weekly",
        libraries: ["maps", "marker"],
      });

      const google = await loader.load();

      // eslint-disable-next-line
      const map = new google.maps.Map(this.shadowRoot.getElementById("map"), {
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
