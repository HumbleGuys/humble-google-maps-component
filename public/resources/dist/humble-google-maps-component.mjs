const s = "gmapsCallback";
let a = !1, l, c;
const r = new Promise((o, i) => {
  l = o, c = i;
});
function h(o) {
  if (a)
    return r;
  a = !0, window[s] = () => l(window.google);
  const i = document.createElement("script");
  return i.async = !0, i.defer = !0, i.src = `https://maps.googleapis.com/maps/api/js?key=${o}&callback=${s}`, i.onerror = c, document.querySelector("head").appendChild(i), r;
}
const d = (o, i) => {
  let e;
  return function(...t) {
    clearTimeout(e), e = setTimeout(
      () => o.apply(this, t),
      i
    );
  };
}, p = ({ apiKey: o, zoom: i }) => ({
  apiKey: o,
  zoom: i,
  coordinates: [],
  markers: [],
  google: null,
  map: null,
  listenerHandler: null,
  openInfoWindow: !1,
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
      var n;
      return {
        lat: Number(t.dataset.lat),
        lng: Number(t.dataset.lng),
        icon: t.dataset.icon,
        iconWidth: Number(t.dataset.iconWidth),
        iconHeight: Number(t.dataset.iconHeight),
        infoWindow: (n = t.querySelector(".infoWindow")) == null ? void 0 : n.innerHTML
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
    return this.coordinates.map((e) => {
      const t = new this.google.maps.Marker({
        position: e,
        animation: this.google.maps.Animation.DROP,
        map: this.map,
        icon: this.getIcon(e)
      });
      return e.infoWindow && this.initInfoWindow(t, e.infoWindow), t;
    });
  },
  initInfoWindow(e, t) {
    const n = new google.maps.InfoWindow({
      content: t
    });
    return e.addListener("click", () => {
      this.openInfoWindow && this.openInfoWindow.close(), this.openInfoWindow = n, n.open({
        anchor: e,
        map: this.map,
        shouldFocus: !1
      });
    }), e;
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
    let n = 1;
    return t < 600 ? n = 0.8 : t < 1030 && (n = 0.9), new this.google.maps.Size(
      e.iconWidth * n,
      e.iconHeight * n
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
  window.Alpine.data("googleMaps", p);
});
