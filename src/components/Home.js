import React from "react";
import { Tabs, Button } from 'antd';
import {GEO_OPTIONS} from "../constants";

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component{
    state = {
        loadingGeoLocation: false,
    }
    componentDidMount() {
        this.setState({loadingGeoLocation: true})
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
        }
    }

    onSuccessLoadGeoLocation = (position) =>{
        console.log(position);
        this.setState({loadingGeoLocation: false})
    }

    onFailedLoadGeoLocation = () =>{
        this.setState({loadingGeoLocation: false})
    }
    render(){
        return(

                <Tabs tabBarExtraContent={operations} className = "main-tabs">
                    <TabPane tab="Posts" key="1">
                        {this.state.loadingGeoLocation ?
                            <span>loading geo location</span> : null
                        }
                    </TabPane>
                    <TabPane tab="Map" key="2">Content of tab 2</TabPane>
                </Tabs>

        )
    }
}