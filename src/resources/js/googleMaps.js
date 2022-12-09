import initGoogleMap from "./initGoogleMap.js";
import { debounce } from "./helpers.js";

export default ({ apiKey, zoom }) => ({
    apiKey: apiKey,
    zoom: zoom,

    coordinates: [],
    markers: [],
    google: null,
    map: null,
    listenerHandler: null,
    openInfoWindow: false,

    async init() {
        this.google = await initGoogleMap(this.apiKey);

        this.initMap();

        this.listenerHandler = this.google.maps.event.addDomListener(
            window,
            "resize",
            debounce(() => this.handleRezise(), 250)
        );
    },

    initMap() {
        this.setCoordinates();

        this.map = this.createMap();

        this.markers = this.createMarkers();

        if (this.coordinates.length > 1) {
            this.fitAllMarkers();
        }
    },

    setCoordinates() {
        const markers = Array.from(
            this.$el.querySelectorAll(".googleMaps__marker")
        );

        this.coordinates = markers.map(function (marker) {
            return {
                lat: Number(marker.dataset.lat),
                lng: Number(marker.dataset.lng),
                icon: marker.dataset.icon,
                iconWidth: Number(marker.dataset.iconWidth),
                iconHeight: Number(marker.dataset.iconHeight),
                infoWindow: marker.querySelector(".infoWindow")?.innerHTML,
            };
        });
    },

    createMap() {
        return new this.google.maps.Map(this.$el, {
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            center: this.coordinates[0],
            zoom: this.zoom,
        });
    },

    createMarkers() {
        return this.coordinates.map((coordinate) => {
            const marker = new this.google.maps.Marker({
                position: coordinate,
                animation: this.google.maps.Animation.DROP,
                map: this.map,
                icon: this.getIcon(coordinate),
            });

            if (coordinate.infoWindow) {
                this.initInfoWindow(marker, coordinate.infoWindow);
            }

            return marker;
        });
    },

    initInfoWindow(marker, content) {
        const infoWindow = new google.maps.InfoWindow({
            content: content,
        });

        marker.addListener("click", () => {
            if (this.openInfoWindow) {
                this.openInfoWindow.close();
            }

            this.openInfoWindow = infoWindow;

            infoWindow.open({
                anchor: marker,
                map: this.map,
                shouldFocus: false,
            });
        });

        return marker;
    },

    getIcon(coordinate) {
        const iconSize = this.getIconSize(coordinate);

        return {
            url: coordinate.icon,
            size: iconSize,
            scaledSize: iconSize,
        };
    },

    getIconSize(coordinate) {
        const screenWidth = window.innerWidth;
        let multiplier = 1;

        if (screenWidth < 600) {
            multiplier = 0.8;
        } else if (screenWidth < 1030) {
            multiplier = 0.9;
        }

        return new this.google.maps.Size(
            coordinate.iconWidth * multiplier,
            coordinate.iconHeight * multiplier
        );
    },

    fitAllMarkers() {
        const bounds = new this.google.maps.LatLngBounds();

        this.markers.forEach((marker) => {
            bounds.extend(marker.position);
        });

        this.map.fitBounds(bounds);
    },

    handleRezise() {
        this.resizeMarkers();

        if (this.coordinates.length > 1) {
            this.fitAllMarkers();
        } else {
            this.centerMap();
        }
    },

    centerMap() {
        this.map.panTo(this.coordinates[0]);
    },

    resizeMarkers() {
        const icon = this.getIcon();

        this.markers.forEach((marker) => {
            marker.setIcon(icon);
        });
    },
});
