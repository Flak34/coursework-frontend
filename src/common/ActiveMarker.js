import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "../styles/MarkerStyle.css"

function onDragEnd() {
    this.getElement().moveCar(this);
}

const ActiveMarker = (car, moveCar) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.car = car;
    el.moveCar = moveCar;

    let marker = new mapboxgl.Marker({element: el, draggable: true}).setLngLat([car.lng, car.lat]);
    marker.on('dragend', onDragEnd)
    return marker;
}

export default ActiveMarker;