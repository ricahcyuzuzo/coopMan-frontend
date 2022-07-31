import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';

const produce = [
    {
        name: 'rice',
        quantinty: 2000,
    },
    {
        name: 'Beans',
        quantinty: 2000,
    },
    {
        name: 'Wheat',
        quantinty: 2000,
    },
    {
        name: 'Potatoes',
        quantinty: 2000,
    },{
        name: 'Yam',
        quantinty: 2000,
    },{
        name: 'Tomatoes',
        quantinty: 2000,
    },{
        name: 'Peanuts',
        quantinty: 2000,
    },{
        name: 'Groundnuts',
        quantinty: 2000,
    },{
        name: 'Vegies',
        quantinty: 2000,
    },{
        name: 'Mangoes',
        quantinty: 2000,
    },{
        name: 'Kiwis',
        quantinty: 2000,
    }

];
const Sold = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

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
                data={produce}
                renderItem={({item, index}) => {
                    return(
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center',alignSelf: 'center', height: 50, backgroundColor: index % 2 === 0 ? '#fff' : '#FFD992', padding: 5, borderRadius: 10 }}>
                            <Text style={{ fontSize: 18, }}>{item.name}</Text>
                            <Text>{item.quantinty}</Text>
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
                     height: 330,
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
                        <TouchableOpacity style={{
                            width: '100%',
                            borderRadius: 10,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            backgroundColor: '#64C5B1'
                        }}>
                            <Text style={{ color: '#fff'}}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default Sold

const styles = StyleSheet.create({})