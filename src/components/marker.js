import React, {Component} from 'react';
import './marker.css'

class Marker extends Component{
    render(){
        let marker = "marker";
        if(this.props.selected) {
            marker += " selected";
        }
        return(
            <div className={marker} >{this.props.text}</div>
        )
    }
}

export default Marker;