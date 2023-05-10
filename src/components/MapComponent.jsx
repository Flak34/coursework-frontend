import React, {Component} from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css"
import Marker from "../common/Marker";
import ActiveMarker from "../common/ActiveMarker";
import CarsharingService from "../services/carsharing-service";

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

        CarsharingService.getZone(this.props.zoneId).then((response) => {
            map.on('load', () => {
                // Add a data source containing GeoJSON data.
                map.addSource('maine', {
                'type': 'geojson',
                'data': {
                'type': 'Feature',
                'geometry': {
                'type': 'Polygon',
                // These coordinates outline Maine.
                'coordinates': [
                    response.data.coordinates
                ]}}});
                 
                // Add a new layer to visualize the polygon.
                map.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': 'maine', // reference the data source
                'layout': {},
                'paint': {
                'fill-color': '#0080ff', // blue color fill
                'fill-opacity': 0.5
                }
                });
                // Add a black outline around the polygon.
                map.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'maine',
                'layout': {},
                'paint': {
                'line-color': '#000',
                'line-width': 3
                }
                });
            });
        })

        


        if(!this.props.driveStarted) {
            CarsharingService.getFreeCars().then((response) => {
                response.data.map(
                    car => {
                        let marker = Marker(car, this.props.setCurrentCar);
                        marker.addTo(map);
                })
            })
        }
        else {
            let marker = ActiveMarker(this.props.currentCar, this.props.moveCar);
            marker.addTo(map);
        }
        
    }
  
    render() { 
        return (  
            <div ref={this.mapContainer} style={{height: "100%"}}/>
        );
    }

}
 
export default React.memo(MapComponent);