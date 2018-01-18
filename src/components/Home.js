import React from "react";
import { Tabs, Button } from 'antd';
import {API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from "../constants";
import { Spin } from 'antd';
import $ from 'jquery';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component{
    state = {
        loadingGeoLocation: false,
        error: '',
    }
    componentDidMount() {
        this.setState({loadingGeoLocation: true , error: ''})
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );

        } else {
            /* geolocation IS NOT available */
            this.setState({error: 'Your broswer does not support geoLocation'})
        }
    }

    onSuccessLoadGeoLocation = (position) =>{
        console.log(position);
        this.setState({loadingGeoLocation: false, error: ''});
        const {latitude, longitude} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () =>{
        this.setState({loadingGeoLocation: false, error: 'Failed to load geoLocation!'})
    }

    getGalleryPanelContent = () => {
        if(this.state.error){
            return <div>{this.state.error}</div>
        } else if (this.state.loadingGeoLocation){
            return <Spin tip="Loading geo location..." />;
        } else {
            return null;
        }
    }

    loadNearbyPosts = () =>{
        //const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        // root/search?lat=1111&lon=2222
        const lat = 37.7915953;
        const lon = -122.3937977;

        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response) => {
           console.log(response)
        },(error) => {
            console.log(error)
        }).catch((error) => {
            console.log(error)
        });
    }
    render(){
        return(

                <Tabs tabBarExtraContent={operations} className = "main-tabs">
                    <TabPane tab="Posts" key="1">
                        {this.getGalleryPanelContent()}
                    </TabPane>
                    <TabPane tab="Map" key="2">Content of tab 2</TabPane>
                </Tabs>

        )
    }
}