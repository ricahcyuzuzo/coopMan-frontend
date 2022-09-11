import { ActivityIndicator, ActivityIndicatorBase, Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../constants/api';
import * as SecureStorage from 'expo-secure-store';

const AddNew = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('')
    const [pesticide, setPesticide] = useState('');
    const [fertilizer, setFertilizer] = useState('');
    const [produceId, setProduceId] = useState('');
    const [loading, setLoading] = useState(false);


    const addNewProduce = async () => {
        setLoading(true);
        const payload = {
            name: name,
            quantity: parseInt(quantity),
            pesticide: pesticide,
            fertilizer: fertilizer
        };

        const token = await SecureStorage.getItemAsync('token');

        axios.post(`${API_URL}/coop/add_produce`, payload, { 
            headers: {
                Authorization: token,
            }
        }).then((res) => {
            setLoading(false);
            setName('');
            setQuantity('');
            setPesticide('');
            setFertilizer('');
            navigation.goBack();
            Alert.alert('Coperative management', 'Produce is added successful');
        }).catch((err) => {
            setLoading(false);
            console.log(err.response.data)
        })
    }

    const UpdateProduce = async (produce_id) => {
        setLoading(true);
        const payload = {
            name: name,
            quantity: parseInt(quantity),
            pesticide: pesticide,
            fertilizer: fertilizer,
            produce_id
        };

        const token = await SecureStorage.getItemAsync('token');

        axios.patch(`${API_URL}/coop/update_produce`, payload, { 
            headers: {
                Authorization: token,
            }
        }).then((res) => {
            setLoading(false);
            navigation.goBack();
            Alert.alert('Coperative management', 'Produce is Updated successful');
        }).catch((err) => {
            setLoading(false);
            console.log(err.response.data)
        })
    }


    const DeleteProduce = async (produce_id) => {
        setLoading(true);
        const token = await SecureStorage.getItemAsync('token');

        axios.delete(`${API_URL}/coop/delete_produce/?produce_id=${produce_id}`, { 
            headers: {
                Authorization: token,
            }
        }).then((res) => {
            setLoading(false);
            navigation.goBack();
            Alert.alert('Coperative management', 'Produce is Deleted successful');
        }).catch((err) => {
            setLoading(false);
            console.log(err.response.data)
        })
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
            }}>Produce</Text>
        </View>
        <View style={{
            width: '90%',
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
            alignSelf: 'center'
        }}>
            <Text style={{ fontWeight: 'bold', color: '#64b5c1' , marginTop: 10,}}>All Produce</Text>
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
                data={route.params.produce}
                renderItem={({item, index}) => {
                    return(
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center',alignSelf: 'center', height: 50, backgroundColor: index % 2 === 0 ? '#fff' : '#64b5c1', padding: 5, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%'}}>
                                <Text style={{ fontSize: 18, }}>{item?.name}</Text>
                                <Text style={{ marginTop: 5}}>{item?.quantity}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '20%' }}>
                                <TouchableOpacity onPress={() => {
                                    setName(item.name);
                                    setQuantity(item.quantity);
                                    setFertilizer(item.fertilizer);
                                    setPesticide(item.pesticide);
                                    setProduceId(item._id);
                                    setModalVisible1(true)
                                }}>
                                    <AntDesign name="edit" size={24} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    DeleteProduce(item._id);
                                }}>
                                    <AntDesign name="delete" size={24} color="#a12" />
                                </TouchableOpacity>
                            </View>
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
                    <Text style={{ fontSize: 18}}>Add Produce</Text>
                    <View style={{
                        width: '100%',
                        marginTop: 30
                    }}>
                        <TextInput placeholder='Name' onChangeText={(val) => setName(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10
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
                        <TextInput placeholder='Pesticide' onChangeText={(val) => setPesticide(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 20,
                        }} />
                        <TextInput placeholder='Fertilizer' onChangeText={(val) => setFertilizer(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 20,
                        }} />
                        <TouchableOpacity onPress={addNewProduce} style={{
                            width: '100%',
                            borderRadius: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            backgroundColor: '#64C5B1'
                        }}>
                            {loading ? <ActivityIndicator size='small' color='#fff' /> : <Text style={{ color: '#fff'}}>Add</Text>}
                            
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        <Modal 
            visible={modalVisible1}
            onRequestClose={() => setModalVisible1(false)}
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
                    <TouchableOpacity onPress={() => setModalVisible1(false)} style={{
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
                    <Text style={{ fontSize: 18}}>Update Produce</Text>
                    <View style={{
                        width: '100%',
                        marginTop: 30
                    }}>
                        <TextInput placeholder='Name' value={name} onChangeText={(val) => setName(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10
                        }} />
                        <TextInput placeholder='Quantity' value={quantity} onChangeText={(val) => setQuantity(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 20,
                        }} />
                        <TextInput placeholder='Pesticide' value={pesticide} onChangeText={(val) => setPesticide(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 20,
                        }} />
                        <TextInput placeholder='Fertilizer' value={fertilizer} onChangeText={(val) => setFertilizer(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 20,
                        }} />
                        <TouchableOpacity onPress={() => {
                            UpdateProduce(produceId);
                        }} style={{
                            width: '100%',
                            borderRadius: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            backgroundColor: '#64C5B1'
                        }}>
                            {loading ? <ActivityIndicator size='small' color='#fff' /> : <Text style={{ color: '#fff'}}>Update</Text>}
                            
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default AddNew

const styles = StyleSheet.create({})