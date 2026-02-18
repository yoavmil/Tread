import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import mapboxgl from "mapbox-gl";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

(mapboxgl as any).setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true,
);
