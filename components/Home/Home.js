import React, { Component } from 'react'
import { View, FlatList, ScrollView, ImageBackground, TextInput, Text, Image, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import konfigurasi from '../../config'

export default class Navigasi extends Component{
    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            if(data == null){
                this.props.navigation.dispatch(
                    StackActions.replace('Login')
                )
            }
        })

    }
    render(){
        let Tabs = createBottomTabNavigator();
        return(
            <Tabs.Navigator style={{ backgroundColor: 'white' }} tabBarOptions={{
                activeTintColor: 'white',
                style: {
                    backgroundColor: 'black',
                    padding: 5,
                    borderRadius: 20,
                    marginBottom: 25,
                    width: 300,
                    marginLeft: 25,
                    marginRight: 25,
                    alignItems: 'center',
                    position: 'absolute',
                    color: 'white'
                }
            }} screenOptions={({ route }) => ({

                tabBarIcon: ({ focus, color, size }) => {
                    let icons;

                    if(route.name == 'Home'){
                        icons = 'home-outline'
                    }else if(route.name == 'Subscribe'){
                        icons = 'card-outline'
                    }else if(route.name == 'Discover'){
                        icons = 'library-outline'
                    }

                    return <Icons name={icons} size={30} color="white" />
                }
            })}>
                <Tabs.Screen name="Home" component={Home} />
                <Tabs.Screen name="Discover" component={Discover}/>
                <Tabs.Screen name="Subscribe" component={Subscribe}/>
            </Tabs.Navigator>
        )
    }
}

class Discover extends Component{
    constructor(props){
        super(props)

        this.state = {
            books: []
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'book/getall', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ books: this.state.books.concat(res.data) })
            })
        })
    }

    renderBooks = ({ item }) => {
        return(
            <TouchableOpacity style={{ padding: 28 }}>
                <ImageBackground source={{ uri: konfigurasi.ssl + item.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                    <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text>
                </ImageBackground>
                <Text>{item.title}</Text>
                { item.subscribe ? <Text style={{ fontWeight: 'bold', color: 'gold' }}>Premium</Text> : <Text></Text>}
            </TouchableOpacity>

        )
    }

    render(){
        return(
            <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column' }}>
                <StatusBar hidden={true}/>
                
                <View style={{ padding: 15 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Discover Some Books !</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                        <FlatList 
                            data={this.state.books}
                            numColumns={2}
                            renderItem={this.renderBooks}
                        />
                    </View>

                </View>
            </View>
        )
    }
}

class Subscribe extends Component{
    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <StatusBar hidden={true}/>

                <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: 'https://66.media.tumblr.com/6bedfc893119e2d7d446d37a81401219/tumblr_oretdiqVEU1rmk83fo1_500.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} />

                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>Wellcome Back</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fajar Firdaus</Text>
                        </View>
                    </View>

                    <View style={{ marginRight: 30 }}>
                        <Icons name='notifications-outline' size={30} />
                    </View>
                </View>

                <View style={{ marginTop: 25, alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'black', padding: 15, width: 300, elevation: 25, borderRadius: 15 }}>
                        <Text style={{ color: 'white', marginLeft: 15 }}>Minimum Payment</Text>
                        <Text style={{ color: 'white', marginLeft: 15, marginTop: 15 }}>**** ****** **** 1234</Text>

                        <View style={{ marginLeft: 15, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Rp.50.000</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                <View>
                                    <Text style={{ color: 'white' }}>1 Months</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/payment/gopay.png')} style={{ width: 50, height: 20, marginRight: 10, backgroundColor: 'white' }} />
                                    <Image source={require('../../assets/payment/dana.png')} style={{ width: 50, height: 20, marginRight: 10 }} />
                                    <Image source={require('../../assets/payment/ovo.png')} style={{ width: 50, height: 20 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 30, marginLeft: 25 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>List Pricing</Text>
                    <View style={{ flexDirection: 'column', marginTop: 20 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'black', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="cash-outline" size={30} color='white' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Expert Librarian</Text>
                                <Text style={{ color: 'grey' }}>Get Access for 1 years</Text>
                            </View>
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Rp.1.000.000</Text>
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
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Rp.200.000</Text>
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
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Rp.50.000</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: 'Civilions',
            search: null,
            updated: [],
            liked: [],
            profile: null
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(data => {
            axios.post(konfigurasi.server + 'auth/profile', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                const x = res.data[0]
                this.setState({
                    name: x.name
                })
            })

            axios.post(konfigurasi.server + 'book/most-updated', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ updated: this.state.updated.concat(res.data) })
            })

            axios.post(konfigurasi.server + 'book/most-liked', {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ liked: this.state.liked.concat(res.data) })
            })

            axios.post(konfigurasi.server + "auth/profile", {
                token: data,
                secret: konfigurasi.secret
            }).then(res => {
                this.setState({ profile: res.data[0].photo })
            })
        })
    }

    search(){
        this.props.navigation.navigate('Search', { search: this.state.search })
    }

    books(title){
        this.props.navigation.navigate('Overview', { title: title })
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', backgroundColor: 'white', paddingBottom: 105 }}>
                <StatusBar hidden={true}/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 25, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            {this.state.profile == null ? <Image source={{ uri: konfigurasi.server + 'profile/default.jpg' }} style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} /> : <Image source={{ uri: this.state.profile[0].photo }} style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: 'black' }} />}
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>Wellcome Back</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.state.name}</Text>
                        </View>
                    </View>
                    

                    <View style={{ marginTop: 30, marginRight: 30 }}>
                        <TouchableOpacity>
                            <Icons name='notifications-outline' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginTop: 25, marginLeft: 15 }}>
                    <View>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>What Books Do</Text>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>you like to read ?</Text>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#ededed', width: 270, padding: 10, borderRadius: 10, alignItems: 'center' }}>
                                <Icons name="search-outline" size={20} color="black" />
                                <TextInput placeholder="Search" style={{ width: 200, marginLeft: 10 }} onChangeText={(val) => this.setState({ search: val })} />
                            </View>
                            <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, marginLeft: 8 }} onPress={() => this.search()}>
                                <Icons name='search-outline' size={25} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 25 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', alignItems: 'center' }}>Most Updated <Icons name="time-outline" size={20} /></Text>
                        <ScrollView horizontal={true} contentContainerStyle={{ marginTop: 7 }} showsHorizontalScrollIndicator={false}>
                            {this.state.updated.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5 }}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                        {x.subscribe ? 
                                            <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text> : <View></View>}
                                    </ImageBackground>
                                </TouchableOpacity>
                            })}

                       </ScrollView>
                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 25 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', alignItems: 'center' }}>Most Liked <Icons name='heart-outline' size={20} /></Text>
                        <ScrollView horizontal={true} contentContainerStyle={{ marginTop: 7 }} showsHorizontalScrollIndicator={false}>
                            {this.state.liked.map((x, y) => {
                                return <TouchableOpacity style={{ padding: 5 }} onPress={() => this.books(x.title)}>
                                    <ImageBackground source={{ uri: 'http://' + x.cover }} style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end', }}>
                                        {x.subscribe ? 
                                            <Text style={{ color: 'green', fontWeight: 'bold', marginRight: 10, marginTop: 5, }}>$</Text> : <View></View>}
                                    </ImageBackground>
                                </TouchableOpacity>
                            })}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
