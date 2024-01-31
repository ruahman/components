import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Loader } from "@googlemaps/js-api-loader";

const chicago = { lat: 41.87812805175781, lng: -87.63029479980469 };

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

      const map = new google.maps.Map(this.shadowRoot?.getElementById("map")!, {
        center: chicago,
        zoom: 8,
      });

      const marker = new google.maps.Marker({
        position: chicago,
        map: map,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: "<h1>My Home</h1>",
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function addMarker(props: any) {
        const marker = new google.maps.Marker({
          position: props.location,
          map: map,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: props.content,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }

      google.maps.event.addListener(map, "click", (event: any) => {
        addMarker({ location: event.latLng, content: "<h1>My Home</h1>" });
      });

      addMarker({ location: chicago, content: "<h1>My Home</h1>" });
    } catch (error) {
      console.error("Error loading Google Maps API:", error);
    }
  }

  render() {
    return html`<div id="map"></div>`;
  }
}
