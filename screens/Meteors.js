import React, { Component } from 'react';
import { Text, View,Alert } from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            meteor={}
        }
    }
    getMeteors=()=>{
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=1m9Q5EcdaNcFwlMPAGxl9uIYNvS8VF6wilE1VeYZ").then(response=>{
            this.setState({meteor:response.data.near_earth_objects})
        }).catch=(err)=>{
            Alert.alert(err.message);
        }
    }
    componentDidMount(){
        this.getMeteors();
    }
    render() {
        if(Object.keys(this.state.meteor).length === 0){
            return(
                <View style={{flex:1,justifyContent:"center"}}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else{
            let meteorArray = Object.keys(this.state.meteor).map(meteor_date =>{
                return this.state.meteor[meteor_date]

            })
            let meteors = [].concat.apply([],meteorArray)
            meteors.forEach(function(element){
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2;
                let threatScore = (diameter/element.close_approach_data[1].kilometers)*1000000000 ;
                element.threat_score = threatScore;

           
        })
        return(
            <View>
                <Text>Meteor screen...</Text>
            </View>
        )
    }
}
}