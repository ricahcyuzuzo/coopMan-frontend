import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secured, setSecured] = useState(false)

    const handleLogin = () => {
        navigation.navigate('Home')
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
                    placeholder='Phone number'
                    onChangeText={(val) => setUsername(val)} 
                    style={styles.usernameText} 
                />
            </View>

            <View style={styles.password}>
                <TextInput
                    placeholder='Password' 
                    onChangeText={(val) => setPassword(val)} 
                    style={styles.passwordText} 
                    secureTextEntry={true} />
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.suggestToRegister}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
            </View>
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
    }

})