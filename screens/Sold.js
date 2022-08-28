import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../constants/api';
import * as SecureStore from 'expo-secure-store';
import DropDownPicker from 'react-native-dropdown-picker';

const Sold = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSelect, setModalVisibleSelect] = useState(false);

    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [produce, setProduce] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        getData();
    }, [])
    const handleAddSold = async () => {
        setLoading(true);
        const payload = {
            price: parseInt(price),
            quantity: parseInt(quantity)
        }
        const token = await SecureStore.getItemAsync('token');

        axios.post(`${API_URL}/coop/sell_produce?produce_id=${produce?.id}`, payload, {
            headers:{
                Authorization: token
            }
        }).then(res => {
            setLoading(false);
            navigation.goBack();
        }).catch((err) => {
            setLoading(false);
            console.log(err.response.data);
        })
    }

    const getData = () => {
        const data = [];
        route.params.produce.forEach(item => {
            const obj = {
                label: item.name,
                value: item._id
            }

            data.push(obj);
        });
        setItems(data);
        setProduce({
            name: data[0].label,
            id: data[0].value
        });
        console.log(data)
    }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
        <View style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center'
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                marginTop: 50,
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#64b5c1',
                justifyContent:  'center',
                alignItems: 'center',
                
            }}>
                <Feather name='chevron-left' size={24} color='#64b5c1' />
            </TouchableOpacity>
            <Text  style={{
                fontSize: 19,
                marginTop: 60,
                color: '#64b5c1',
                fontWeight: 'bold'
            }}>Sold</Text>
        </View>
        <View style={{
            width: '90%',
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
            alignSelf: 'center'
        }}>
            <Text style={{ fontWeight: 'bold', color: '#64b5c1' , marginTop: 10,}}>All Produce sold</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{
               width: 40, 
               height: 40,
               justifyContent: 'center',
               alignItems: 'center',
               borderWidth: 1,
               borderColor: '#64b5c1',
               borderRadius: 20,
            }}>
                <Ionicons name='add' size={24} color='#64b5c1' />
            </TouchableOpacity>
        </View>
        <View>
            <FlatList
                data={route.params.sold}
                renderItem={({item, index}) => {
                    return(
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center',alignSelf: 'center', height: 50, backgroundColor: index % 2 === 0 ? '#fff' : '#FFD992', padding: 5, borderRadius: 10 }}>
                            <Text style={{ fontSize: 18, }}>{item?.produce?.name}</Text>
                            <Text>{item?.produce?.quantity}</Text>
                        </View>
                    )
                }}
            />
        </View>
        <Modal 
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            transparent={true}

        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <View style={{
                     width: '90%',
                     minHeight: 330,
                     alignSelf: 'center',
                     margin: 20,
                     backgroundColor: 'white',
                     borderRadius: 20,
                     padding: 35,
                     alignItems: 'center',
                     shadowColor: '#000',
                     shadowOffset: {
                       width: 0,
                       height: 2,
                     },
                     shadowOpacity: 0.25,
                     shadowRadius: 4,
                     elevation: 5,
                }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 40,
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#a12',
                        borderRadius: 20,
                    }}>
                        <Ionicons name='close' color='#a12' size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18}}>Add Sold Produce</Text>
                    <View style={{
                        width: '100%',
                        marginTop: 30
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            borderColor: '#c4c4c4',
                            padding: 10,
                            borderRadius: 10,
                        }} onPress={() => setModalVisibleSelect(!modalVisibleSelect)}>
                            <Text>{produce?.name}</Text>
                            <Ionicons name='chevron-down' size={24} />
                        </TouchableOpacity>
                        {
                            modalVisibleSelect ? <View style={styles.dropdown}>
                            <ScrollView>
                            {
                                items.map((item, index) => {
                                    return (    
                                        <TouchableOpacity onPress={() => {
                                            setProduce({
                                                name: item.label,
                                                id: item.value
                                            });
                                            setModalVisibleSelect(false);
                                        }} style={{
                                            width: '90%',
                                            alignSelf: 'center',
                                            height: 40,
                                            justifyContent: 'center',
                                            borderColor: '#c4c4c4',
                                            borderTopWidth: 0.5,
                                            borderBottomWidth: 0.5,
                                        }} key={index}>
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }  
                            </ScrollView>
                        </View> : null
                        }
                        <TextInput placeholder='Price' onChangeText={(val) => setPrice(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 30,
                        }} />
                        <TextInput placeholder='Quantity' onChangeText={(val) => setQuantity(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 20,
                        }} />
                        <TouchableOpacity onPress={handleAddSold} style={{
                            width: '100%',
                            borderRadius: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            backgroundColor: '#64C5B1'
                        }}>
                            { loading ? <ActivityIndicator size='small' color='#fff'  /> : <Text style={{ color: '#fff'}}>Add</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        
    </View>
  )
}

export default Sold

const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        minHeight: 50,
        maxHeight: 300,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c4c4c4',
        marginTop: 10
    }
})