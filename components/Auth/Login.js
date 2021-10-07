import React, { Component } from 'react'
import { View, Image, Text, TextInput, AsyncStorage, TouchableOpacity, StatusBar } from 'react-native'

import { StackActions } from '@react-navigation/native'
import Loading from 'react-native-loading-spinner-overlay'
import axios from 'axios'
import konfigurasi from '../../config'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: null,
            password: null
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            if(data){
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        })
    }

    login(){
        axios.post(konfigurasi.server + 'auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(data => {
            if(data.status == 200){
                AsyncStorage.setItem('token', data.headers.token)
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                )
            }
        }).catch(e => {
            alert('salah')
        })
    }


    render(){
        return(
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <StatusBar hidden={true}/>
                <View style={{ marginTop: 55, alignItems: 'center' }}>
                    <Image source={require('../../assets/illustrations/read.png')} style={{ width: 180, height: 180 }} />

                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Upgrade Your</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Literation Skills!</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 45 }}>
                    <View >
                        <TextInput placeholder="Email" style={{ padding: 8, borderRadius: 5, backgroundColor: '#ededed', width: 250, marginBottom: 5 }}  onChangeText={(val) => this.setState({ email: val })}/>
                        <TextInput placeholder="Password" style={{ padding: 8, borderRadius: 5, backgroundColor: '#ededed', width: 250, marginTop: 10 }} secureTextEntry={true} onChangeText={(val) => this.setState({ password: val })} />
                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#0b0f24', marginTop: 10, padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.login()}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Masuk</Text>
                    </TouchableOpacity>
                    
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'grey' }}>Belum punya akun ? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ color: '#0B0F24', fontWeight: 'bold' }}>Daftar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
