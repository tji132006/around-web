import React from "react";
import { Tabs, Button } from 'antd';
import {GEO_OPTIONS} from "../constants";
import { Spin, Alert } from 'antd';

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
        this.setState({loadingGeoLocation: false, error: ''})
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