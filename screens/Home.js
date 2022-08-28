import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as SecureStorage from 'expo-secure-store';
import AppContext from './Context';
import axios from 'axios';
import { API_URL } from '../constants/api';
import { useFocusEffect } from '@react-navigation/native';


const Home = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});
    const { setLoaded } = useContext(AppContext);
    useFocusEffect(useCallback(() => {
        getData();
    }, []));


    const getData = async () => {
        const token = await SecureStorage.getItemAsync('token');
        console.log(token)
        axios.get(`${API_URL}/coop/trans`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err.response.data);
        })
    }
    const handleLogout = async () => {
        await SecureStorage.setItemAsync('isLoggedIn', 'false');
        setLoaded(false)
    }
    
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContent}>
            <Text style={{ marginTop: 10 }}>Hi, {data?.coopName}</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logout}>
                <Ionicons  name='log-out' color='#64C5B1' size={24}  />
            </TouchableOpacity>
        </View>
        <View style={styles.cards}>
            <TouchableOpacity onPress={() => navigation.navigate('AddNew', { produce: data?.data?.produce })} style={styles.produce}>
                <Text>Produce</Text>
                <Text style={{ fontSize: 18}}>{data?.produceQuantity} Kg</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Sold', { sold: data?.data?.sold, produce: data?.data?.produce })} style={styles.sold}>
                <Text>Sold</Text>
                <Text style={{ fontSize: 18}}>{data?.totalSold} Kg</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Waste', { wasted: data?.data?.wasted, produce: data?.data?.produce })} style={styles.waste}>
                <Text>Wasted</Text>
                <Text style={{ fontSize: 18}}>{data?.totalWasted} Kg</Text>
            </TouchableOpacity>
        </View>
      </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
      }}>
        <Text style={{ color: '#64c5b1', fontSize: 16, fontWeight: 'bold', }}>Produce</Text>
        <View>
            <FlatList
                data={data?.data?.produce.slice(0, 4)}
                renderItem={({item, index}) => {
                    return(
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center',alignSelf: 'center', height: 50, backgroundColor: '#64b5c1', padding: 5, borderRadius: 10, marginTop: 10, }}>
                            <Text style={{ fontSize: 18, }}>{item?.name}</Text>
                            <Text>{item?.quantity}</Text>
                        </View>
                    )
                }}
            />
        </View>
      </View>
      <View style={{
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
      }}>
        <Text style={{ color: '#64c5b1', fontSize: 16, fontWeight: 'bold', }}>Sold</Text>
        <View>
            <FlatList
                data={data?.data?.sold?.slice(0, 4)}
                renderItem={({item, index}) => {
                    return(
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center',alignSelf: 'center', height: 50, backgroundColor: '#ffd992', padding: 5, borderRadius: 10, marginTop: 10, }}>
                            <Text style={{ fontSize: 18, }}>{item?.produce?.name}</Text>
                            <Text>{item?.quantity}</Text>
                        </View>
                    )
                }}
            />
        </View>
      </View>
      <View style={{
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,

        marginBottom: 40,
      }}>
        <Text style={{ color: '#64c5b1', fontSize: 16, fontWeight: 'bold', }}>Wasted</Text>
        <View>
            <FlatList
                data={data?.data?.wasted?.slice(0, 4)}
                renderItem={({item, index}) => {
                    return(
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center',alignSelf: 'center', height: 50, backgroundColor: '#f99898', padding: 5, borderRadius: 10, marginTop: 10, }}>
                            <Text style={{ fontSize: 18, }}>{item?.produce?.name}</Text>
                            <Text>{item?.quantity}</Text>
                        </View>
                    )
                }}
            />
        </View>
      </View>
    </ScrollView>
      {
        modalVisible ? <View style={styles.dropdown}>
        <ScrollView>
        {
            produce.map((item, index) => {
                return (
                    <TouchableOpacity style={{
                        width: '90%',
                        alignSelf: 'center',
                        height: 40,
                        justifyContent: 'center',
                        borderColor: '#c4c4c4',
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                    }} key={index}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
        }  
        </ScrollView>
      </View> : null
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titleContent: {
        marginTop: 50,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    logout: {
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#64c5b1',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3
    },
    cards: {
        width: '90%',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    produce: {
        width: '32%',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#64c5b1',
        padding: 10 
    },
    sold: {
        width: '32%',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#FFD992',
        padding: 10,
    },
    waste: {
        width: '32%',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#F99898',
        padding: 10,
    },
    selectBox: {
        marginTop: 20,
        marginBottom: 30,
        width: '90%',
        borderWidth: 1,
        borderColor: '#c4c4c4',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        alignSelf: 'center'
    },
    dropdown: {
        width: '90%',
        minHeight: 50,
        maxHeight: 300,
        borderRadius: 10,
        shadowColor: "#000",
        paddingTop: 10,
        paddingBottom: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        top: 160,
        alignSelf: 'center',
        backgroundColor: '#fff'
    }

})