import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '../constants/api';

const Waste = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibl1, setModalVisible1] = useState(false);
    const [modalVisibleSelect, setModalVisibleSelect] = useState(false);
    const [value, setValue] = useState('');
    const [quantity, setQuantity] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [produce, setProduce] = useState({});
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const handleUpdateWasted = async (trans_id) => {
        setLoading(true);
        const payload = {
            price: parseInt(value),
            quantity: parseInt(quantity),
            trans_id
        }
        const token = await SecureStore.getItemAsync('token');

        axios.patch(`${API_URL}/coop/update_transaction`, payload, {
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

    const handleDeleteWasted = async (trans_id) => {
        setLoading(true);
        const token = await SecureStore.getItemAsync('token');

        axios.delete(`${API_URL}/coop/delete_transaction/?trans_id=${trans_id}`, {
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


    const handleAddWasted = async () => {
        setLoading(true);
        const payload = {
            produce_id: produce?.id,
            value: parseInt(value),
            quantity: parseInt(quantity)
        }
        const token = await SecureStore.getItemAsync('token');

        axios.post(`${API_URL}/coop/add_wasted`, payload, {
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
            }}>Waste</Text>
        </View>
        <View style={{
            width: '90%',
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
            alignSelf: 'center'
        }}>
            <Text style={{ fontWeight: 'bold', color: '#64b5c1' , marginTop: 10,}}>All Produce Wasted</Text>
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
                data={route.params.wasted}
                renderItem={({item, index}) => {
                    return(
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center',alignSelf: 'center', height: 50, backgroundColor: index % 2 === 0 ? '#fff' : '#FFD992', padding: 5, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%'}}>
                                <Text style={{ fontSize: 18, }}>{item?.produce?.name}</Text>
                                <Text>{item?.quantity} Kg</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '20%' }}>
                                <TouchableOpacity onPress={() => {
                                    setValue(item.amount);
                                    setQuantity(item.quantity);
                                    setTransactionId(item._id)
                                    setModalVisible1(true)
                                    console.log(item);
                                }}>
                                    <AntDesign name="edit" size={24} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    handleDeleteWasted(item._id);
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
                    <Text style={{ fontSize: 18}}>Add Wasted Produce</Text>
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
                        <TextInput placeholder='Value in Money' onChangeText={(val) => setValue(val)} style={{
                             width: '100%',
                             backgroundColor: '#F6F5F7',
                             height: 50,
                             borderRadius: 10,
                             alignSelf: 'center',
                             padding: 10,
                             marginTop: 20,
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
                        <TouchableOpacity onPress={handleAddWasted} style={{
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
            visible={modalVisibl1}
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
                    <Text style={{ fontSize: 18}}>Update Sold</Text>
                    <View style={{
                        width: '100%',
                        marginTop: 30
                    }}>
                        <TextInput placeholder='Price' value={value} onChangeText={(val) => setValue(val)} style={{
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
                        <TouchableOpacity onPress={() => {
                            handleUpdateWasted(transactionId);
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

export default Waste

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