import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../constants/api';
import * as SecureStore from 'expo-secure-store';
import AppContext from './Context';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secured, setSecured] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setLoaded } = useContext(AppContext);
    const [error, setError] = useState('');

    const handleLogin = () => {
        setLoading(true);
        const payload = {
            email: username,
            password,
        };

        axios.post(`${API_URL}/auth/login`, payload)
            .then( async res => {
                setError('');
                setLoading(false);
                await SecureStore.setItemAsync('token', res.data.token);
                await SecureStore.setItemAsync('isLoggedIn', 'true');
                setLoaded(true);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
                setError(err.response.data.message);
            });
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Welcome to Prod Man</Text>
            <Text style={styles.simpleText}>Manage your produce realy quick.</Text>
        </View>
        <View style={styles.content}>
            <View style={styles.username}>
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={(val) => setUsername(val)} 
                    style={styles.usernameText} 
                />
            </View>

            <View style={styles.password}>
                <TextInput
                    placeholder='Password' 
                    onChangeText={(val) => setPassword(val)} 
                    style={styles.passwordText} 
                    autoCapitalize='none'
                    secureTextEntry={true} />
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                {loading ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.loginButtonText}>Login</Text>}
            </TouchableOpacity>
            <View style={styles.suggestToRegister}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 200,
    },
    headerText:  {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    simpleText: {
        fontSize: 14,
        textAlign: 'center'
    },
    usernameText: {
        width: '90%',
        backgroundColor: '#F6F5F7',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10
    },
    passwordText: {
        width: '90%',
        backgroundColor: '#F6F5F7',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10,
        marginTop: 20
    },
    content: {
        marginTop: 50
    },
    loginButton: {
        width: '90%',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#64C5B1'
    },
    loginButtonText: {
        color: 'white'
    },
    registerText: {
        color: '#64C5B1'
    },
    suggestToRegister: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 30
    },
    errorText: {
        color: 'red',
        margin: 20,
        textAlign: 'center'
    }

})