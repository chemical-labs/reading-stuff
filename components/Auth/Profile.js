import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView, AsyncStorage, Text, Image, StatusBar } from 'react-native'

import { StackActions } from '@react-navigation/native'

import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config'

export default class Profile extends Component{
    logout(){
        AsyncStorage.removeItem('token')
        this.props.navigation.dispatch(
            StackActions.replace('Login')
        )
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, flexDirection: 'column', paddingBottom: 15 }}>
                <StatusBar hidden={true} />
                <View style={{ marginTop: 15, alignItems: 'center' }}>
                    <Image source={{ uri: 'https://66.media.tumblr.com/6bedfc893119e2d7d446d37a81401219/tumblr_oretdiqVEU1rmk83fo1_500.jpg' }} style={{ width: 90, height: 90, borderRadius: 100 }} />
                    <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 17 }}>Fajar Firdaus</Text>
                    <Text style={{ color: 'grey' }}>Subscribe 1 Month</Text>
                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={{ color: 'red' }}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <View style={{ padding: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 10, backgroundColor: 'white', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'orange' }}>Upgrade To Premium</Text>
                        <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="cash-outline" size={30} color='white' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Expert Librarian</Text>
                                <Text style={{ color: 'grey' }}>Get Access for 1 years</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="library-outline" size={30} color='white' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Nerd Librarian</Text>
                                <Text style={{ color: 'grey' }}>Get Access for 5 months</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="glasses-outline" size={30} color='white' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Reguler Librarian</Text>
                                <Text style={{ color: 'grey' }}>Get Access for 1 months</Text>
                            </View>

                        </TouchableOpacity>


                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 35, justifyContent: 'flex-start', marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Books For You</Text>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Image source={{ uri: 'https://66.media.tumblr.com/8d38ad4c2544bfb73d75c67e45bff5a4/tumblr_pzha9ms0AL1r9fkryo1_1280.jpg' }} style={{ width: 100, height: 120, borderRadius: 15 }} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        )
    }
}
