import { useState, useEffect } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { signInWithEmailAndPassword } from 'firebase/auth'
import HorizontalLine from "./../../components/HorizontalLine"
import { useAuthContext } from '../../context/UserAuthContext'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

const LoginScreen = ({navigation}) => {
    const { setUser } = useAuthContext();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const [loading,setLoading] = useState(false);

    const auth = FIREBASE_AUTH

    const [infoFilledCompletely,setInfoFilledCompletely] = useState(false)

    const loginUserHandler = async() => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth,username,password);
            console.log(response);
            if(response._tokenResponse) {
                setUser(response._tokenResponse.email)
            }
            else {
                throw new Error("Error while loggin in");
            }
        }
        catch(error) {
            console.log(error)
            alert("Failed")
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInfoFilledCompletely((username.length > 0) && (password.length > 0));
    },[username,password])

    if(loading) {
        return (
            <ActivityIndicator 
                size="large" 
                color="#fff" 
                style={{
                    backgroundColor: '#121212',
                    flex: 1
                }} 
            />
        )
    }

    return (
        <View style={styles.onBoardingScreenStyle}>
            <View style={styles.topButtonContainer}>
                <Pressable onPress={() => {navigation.goBack()}} style={styles.lightPressableButton}>
                    <Image source={require('../../assets/images/Icons/arrow-left.png')}/>
                </Pressable>
            </View>
            <View style={styles.loginContentStyle}>
                <Text style={styles.textHeaderStyle}>Login</Text>
                <View style={{gap: 48}}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputStyleTitle}>Email</Text>
                        <TextInput 
                            style={styles.inputStyle}
                            placeholder="Enter your Username" 
                            placeholderTextColor="#fff"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputStyleTitle}>Password</Text>
                        <TextInput 
                            style={styles.inputStyle} 
                            placeholder=". . . . . . . ." 
                            placeholderTextColor="#fff" 
                            secureTextEntry={true}  
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>
                <View style={{gap: 24}}>
                    <Pressable style={infoFilledCompletely ? styles.filledPressableButton : styles.disabledPressableButton} disabled={!infoFilledCompletely} onPress={loginUserHandler}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <HorizontalLine text='or'/>
                    <View style={{gap: 32}}>
                        <Pressable style={styles.shallowPressableButton}>
                            <Image source={require('../../assets/images/Icons/google-icon.png')}/>
                            <Text style={styles.buttonTextHollow}>Login with Google</Text>
                        </Pressable>
                        <Pressable style={styles.shallowPressableButton}>
                            <Image source={require('../../assets/images/Icons/apple-icon.png')}/>
                            <Text style={styles.buttonTextHollow}>Login with Apple</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',margin: 24}}>
                    <Text style={{fontSize: 12,lineHeight: 18,fontWeight: '400',color: '#ffffffde'}}>Don't have an account? </Text>
                    <Pressable onPress={() => {navigation.navigate('register-screen')}} style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 12,lineHeight: 18,fontWeight: '400',color: '#fff'}}>
                            Register
                        </Text>
                    </Pressable>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    onBoardingScreenStyle: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginContentStyle: {
        flex: 1,
        width: '86%'
    },
    textHeaderStyle: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 32,
        paddingTop: 12,
        lineHeight: 38.4,
        marginBottom: 24,
    },
    inputContainer: {
        gap: 12,
        height: 48
    },
    inputStyle: {
        borderWidth: 0.8,
        borderColor: '#979797',
        padding: 12,
        borderRadius: 4,
        color: '#fff'
    },
    inputStyleTitle: {
        color: '#ffffffde'
    },
    lightPressableButton: {
        fontSize: 16,
        lineHeight: 24.08,
        fontWeight: '400',
        color: '#ffffff70',
        paddingHorizontal: 8,
        paddingVertical: 12,
        margin: 24,
    },
    filledPressableButton: {
        borderRadius: 4,
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginTop: 64,
        backgroundColor: '#8875ff',
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24.08,
    },
    shallowPressableButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#8875ff',
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topButtonContainer: {
        width: '100%',
    },
    buttonText:{
        alignSelf: 'center',
        color: '#fff',
        lineHeight: 24.08,
        fontSize: 16,
        fontWeight: '400'
    },
    buttonTextHollow:{
        alignSelf: 'center',
        color: '#ffffffde',
        lineHeight: 24.08,
        fontSize: 16,
        fontWeight: '400'
    },
    disabledPressableButton: {
        marginTop: 64,
        borderRadius: 4,
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#8687E780',
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24.08,
    },
})

export default LoginScreen