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