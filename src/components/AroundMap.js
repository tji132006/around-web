import React from 'react';
import {POS_KEY} from "../constants"
import {AroundMarker} from "./AroundMarker";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

class AroundMap extends React.Component{
    reloadMarkers = () => {
        const center = this.map.getCenter();
        const location = {lat: center.lat(), lon: center.lng()};
        this.props.loadNearbyPosts(location);
    }
    getMapRef = (map) => {
        this.map = map;
        window.map = map;
    }
    render(){
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return(
            <GoogleMap
                ref = {this.getMapRef}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon }}
                onDragEnd = {this.reloadMarkers}
            >
                {
                    this.props.posts ? this.props.posts.map((post) =>
                        <AroundMarker post = {post} key = {post.url}/>
                    ) : null
                }


            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));