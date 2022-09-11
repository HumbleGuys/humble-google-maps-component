import "./css/index.css";

import googleMaps from "./js/googleMaps";

document.addEventListener("alpine:init", () => {
    window.Alpine.data("googleMaps", googleMaps);
});
