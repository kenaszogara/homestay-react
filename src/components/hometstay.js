import React, {Component} from 'react';
import "./homestay.css";

class Homestay extends Component{
    handleClick = () => {
        this.props.selectHomestay(this.props.homestay);
        
    }

    render(){
        const title = this.props.homestay.nama + " - Rp." + this.props.homestay.harga + "k";
        const style = {
            backgroundImage: 'url(' + this.props.homestay.fotoUrl + ')'
        };

        return(
            <div className = "homestay p-2 col-xs-5 col-md-4" onClick={this.handleClick}>
                <div className = "homestay-photo" style={style}></div>
                <div className = "homestay-title" > {title} </div>
            </div>
        );
    }
}

export default Homestay;