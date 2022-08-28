import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { API_URL } from '../constants/api';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [secured, setSecured] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = () => {
        setLoading(true);
        const payload = {
            cooperative: name,
            email: username,
            password,
        };

        axios.post(`${API_URL}/auth/user`, payload)
            .then(res => {
                setLoading(false);
                navigation.navigate('Login');
            }).catch(err => {
                setLoading(false);
                console.log(err);
                setError(err.response.data.message);
            });
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Register to Prod Man</Text>
        </View>
        <View style={styles.content}>
            <View style={styles.username}>
                <TextInput
                    placeholder='Coop name'
                    onChangeText={(val) => setName(val)} 
                    style={[styles.usernameText, { marginBottom: 20 }]} 
                />
            </View>

            <View style={styles.username}>
                <TextInput
                    placeholder='Email'
                    onChangeText={(val) => setUsername(val)} 
                    style={styles.usernameText} 
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>

            <View style={styles.password}>
                <TextInput
                    placeholder='Password' 
                    onChangeText={(val) => setPassword(val)} 
                    style={styles.passwordText} 
                    secureTextEntry={secured} />
            </View>

            <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
                {loading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={styles.loginButtonText}>Register</Text>}
            </TouchableOpacity>
            <View style={styles.suggestToRegister}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.registerText}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    </View>
  )
}

export default Register

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
        alignSelf: 'center',
        marginTop: 10
    }

})