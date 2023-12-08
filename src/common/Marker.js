import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "../styles/MarkerStyle.css"


function handleClick() {

    let prevFocused = document.querySelector('.focused');
    if(prevFocused) {
        prevFocused.classList.remove('focused');
    }

    this.classList.add('focused');
   
    this.setCurrentCar(this.car);
}

const Marker = (car, setCurrentCar) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.car = car;
    el.setCurrentCar = setCurrentCar;

    el.addEventListener('click', handleClick);

    let marker = new mapboxgl.Marker({element: el}).setLngLat([car.lng, car.lat]);
    return marker;
};

export default Marker;