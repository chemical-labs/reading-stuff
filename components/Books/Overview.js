import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import axios from 'axios'
import konfigurasi from '../../config'
import Icons from 'react-native-vector-icons/Ionicons'

export default class Overview extends Component{
    constructor(props){
        super(props)

        this.state = {
            like: false
        }
    }

    like(){
        this.setState({ like: !this.state.like })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar hidden={true}/>

                <View>
                    <View style={{ backgroundColor: 'black', alignItems: 'center', padding: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                        <Image source={{ uri: 'https://66.media.tumblr.com/e1e80f7e0f1c97aebd6249b92b0dbc3c/tumblr_o67kby3GI51qav174o1_540.jpg' }} style={{ width: 120, height: 120 }} />
                        <Text style={{ color: 'white', marginTop: 15, fontWeight: 'bold' }}>Books of Theory</Text>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 12, marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Books of Theory</Text>
                        <Text style={{ color: 'grey' }}>just some unsolved theory </Text>
                        <Text style={{ color: 'grey' }}>made by hundred of scientist</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 25, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => this.like()}>
                        {this.state.like ? 
                        <Icons name='heart' size={25} color={"black"} />
                        : <Icons name='heart-outline' size={25} color={"black"} />}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'black', width: 200, padding: 5, alignItems: 'center', elevation: 15, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Read This!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginRight: 30 }}>
                        <Icons name='ellipsis-vertical-outline' size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
