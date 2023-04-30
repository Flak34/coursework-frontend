import React, {Component} from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css"


mapboxgl.accessToken = 'pk.eyJ1IjoiZmxhazM0IiwiYSI6ImNsZ2pkZ2Q2aTAyaGMzbXFzZGlhd3RiYjUifQ.TO3uwKnqXIivm25EPPdaFQ';


class MapComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            lng: 37.629204,
            lat: 55.753732,
            zoom: 9
        }

        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false
        });

        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true,
            showAccuracyCircle: false
        }));

        const marker = new mapboxgl.Marker()
        .setLngLat([37.629204, 55.753732])
        .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")) // add popup
        .addTo(map);

    }

  
    render() { 
        return (  
            <div ref={this.mapContainer} className="map-container"/>
        );
    }

}
 
export default MapComponent;