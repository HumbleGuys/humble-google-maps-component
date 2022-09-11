const n = "gmapsCallback";
let r = !1, l, c;
const a = new Promise((s, i) => {
  l = s, c = i;
});
function h(s) {
  if (r)
    return a;
  r = !0, window[n] = () => l(window.google);
  const i = document.createElement("script");
  return i.async = !0, i.defer = !0, i.src = `https://maps.googleapis.com/maps/api/js?key=${s}&callback=${n}`, i.onerror = c, document.querySelector("head").appendChild(i), a;
}
const d = (s, i) => {
  let e;
  return function(...t) {
    clearTimeout(e), e = setTimeout(
      () => s.apply(this, t),
      i
    );
  };
}, m = ({ apiKey: s, zoom: i }) => ({
  apiKey: s,
  zoom: i,
  coordinates: [],
  markers: [],
  google: null,
  map: null,
  listenerHandler: null,
  async init() {
    this.google = await h(this.apiKey), this.initMap(), this.listenerHandler = this.google.maps.event.addDomListener(
      window,
      "resize",
      d(() => this.handleRezise(), 250)
    );
  },
  initMap() {
    this.setCoordinates(), this.map = this.createMap(), this.markers = this.createMarkers(), this.coordinates.length > 1 && this.fitAllMarkers();
  },
  setCoordinates() {
    const e = Array.from(
      this.$el.querySelectorAll(".googleMaps__marker")
    );
    this.coordinates = e.map(function(t) {
      return {
        lat: Number(t.dataset.lat),
        lng: Number(t.dataset.lng),
        icon: t.dataset.icon,
        iconWidth: Number(t.dataset.iconWidth),
        iconHeight: Number(t.dataset.iconHeight)
      };
    });
  },
  createMap() {
    return new this.google.maps.Map(this.$el, {
      mapTypeControl: !1,
      streetViewControl: !1,
      fullscreenControl: !1,
      zoomControl: !1,
      center: this.coordinates[0],
      zoom: this.zoom
    });
  },
  createMarkers() {
    return this.coordinates.map((e) => new this.google.maps.Marker({
      position: e,
      animation: this.google.maps.Animation.DROP,
      map: this.map,
      icon: this.getIcon(e)
    }));
  },
  getIcon(e) {
    const t = this.getIconSize(e);
    return {
      url: e.icon,
      size: t,
      scaledSize: t
    };
  },
  getIconSize(e) {
    const t = window.innerWidth;
    let o = 1;
    return t < 600 ? o = 0.8 : t < 1030 && (o = 0.9), new this.google.maps.Size(
      e.iconWidth * o,
      e.iconHeight * o
    );
  },
  fitAllMarkers() {
    const e = new this.google.maps.LatLngBounds();
    this.markers.forEach((t) => {
      e.extend(t.position);
    }), this.map.fitBounds(e);
  },
  handleRezise() {
    this.resizeMarkers(), this.coordinates.length > 1 ? this.fitAllMarkers() : this.centerMap();
  },
  centerMap() {
    this.map.panTo(this.coordinates[0]);
  },
  resizeMarkers() {
    const e = this.getIcon();
    this.markers.forEach((t) => {
      t.setIcon(e);
    });
  }
});
document.addEventListener("alpine:init", () => {
  window.Alpine.data("googleMaps", m);
});
