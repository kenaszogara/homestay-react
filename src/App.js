import React, {Component} from 'react';
import './App.css';
import Homestay from './components/hometstay';
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      homestays: [],
      selectedHomestay: [],
      searchHomestay: [],
      search: "",
      selected: false
    };
  }

  // Mount JSON file using built-in function
  componentDidMount() {
    fetch("https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json")
    .then(response => response.json())
    .then((data) => {
      this.setState({
        homestays: data,
        searchHomestay: data
      });
    })
  }

  // parse JSON data selectedHomestay, and change select to true
  selectHomestay = (homestay) => {
    this.setState({
      selectedHomestay: homestay,
      select: true
    });

  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      homestays: this.state.searchHomestay.filter((homestay) =>
        new RegExp(event.target.value, "i").exec(homestay.nama))
    })
  }

  render() {
    // Jogjyakarta lat/lng
    let center = {
      lat: -7.797068,
      lng: 110.371754
    };

    // if homestay clicked change the center
    if(this.state.select){
      center = {
        lat: this.state.selectedHomestay.lat,
        lng: this.state.selectedHomestay.lng
      };
    }

    return (
      <div className="app">
        <div className="main container">
          <div className="search">
            <input type="text" placeholder="Search..." value={this.state.search} onChange={this.handleSearch} />
          </div>
          <div className="homestay row p-3">
            {
              /* Parsing JSON file into <Homestay> using map function*/
              this.state.homestays.map((homestay) => {
                return <Homestay key={homestay.id} homestay={homestay} selectHomestay={this.selectHomestay} />
              })
            }
            
          </div>
        </div>
        <div className="map">
          <GoogleMapReact 
            center={center} 
            zoom={15}
          >
          {
            /* Parsing price from JSON file into <GoogleMapReact> */
            this.state.homestays.map((homestay) => {
              return <Marker key={homestay.id} lat={homestay.lat} lng={homestay.lng} text={homestay.harga} selected={homestay === this.state.selectedHomestay} />
            })
          }
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
