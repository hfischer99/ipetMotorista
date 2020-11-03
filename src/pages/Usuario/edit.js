import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TextInputMask } from 'react-native-masked-text'
import { StackActions, NavigationActions } from 'react-navigation'



const SignInScreen = ({ props }) => {


    const [data, setData] = React.useState({
        nome: '',
        dt_nascimento: '',
        telefone: '',
        email: '',
        check_textInputChangeEmail: false,
        check_textInputChangeNome: false,
        check_textInputChangeDT: false,
        check_textInputChangeTel: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        dados: ''
    });


    useEffect(() => {
        fetch('http://www.ipet.kinghost.net/v1/account/RetornaDados', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Id": 4,

            })
        })

            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responsejson", responseJson)
                setData({
                    ...data,
                    dados: responseJson
                })
               

            }
            )
            .catch((error) => { console.log("erro fetch", error) });
      });


    const textInputChangeDtNascimento = (val) => {
        if (val.length >= 9) {
            setData({
                ...data,
                dt_nascimento: val,
                check_textInputChangeDT: true
            });
        } else {
            setData({
                ...data,
                dt_nascimento: val,
                check_textInputChangeDT: false
            });
        }
    }

    const textInputChangeTelefone = (val) => {
        if (val.length >= 13) {
            setData({
                ...data,
                telefone: val,
                check_textInputChangeTel: true
            });
        } else {
            setData({
                ...data,
                telefone: val,
                check_textInputChangeTel: false
            });
        }
    }

    const textInputChangeNome = (val) => {
        if (val.length > 3) {
            setData({
                ...data,
                nome: val,
                check_textInputChangeNome: true
            });
        } else {
            setData({
                ...data,
                nome: val,
                check_textInputChangeNome: false
            });
        }
    }



    const registro = () => {
        fetch('http://www.ipet.kinghost.net/v1/account/Adicionar', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Nome": data.nome,
                "CPF": data.cpf,
                "Data_nascimento": data.dt_nascimento,
                "Email": data.dt_nascimento,
                "Telefone": data.telefone,
                "Tipo_usuario": "1",
                "Password": data.password,
                "Role": "cliente"

            })
        })

            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responsejson", responseJson)
                if (responseJson == "CPF JÁ CADASTRADO") {
                    setData({
                        ...data,
                        cpf: "teste",
                        check_textInputChangeCPF: false
                    });

                    Alert.alert(
                        'Registro',
                        'O CPF INFORMADO JÁ EXISTE EM NOSSA BASE.',
                        [
                            { text: 'Ok', onPress: () => { console.log("continua cadastro") } },
                            { text: 'Resetar senha', onPress: () => console.log('Vai para tela de reset de senha') },
                        ],
                        { cancelable: false }
                    )
                } else {
                    Alert.alert(
                        'Registro',
                        'Usuario cadastrado.',
                        [
                            { text: 'teste ir para proxima tela', onPress: () => navigation.dispatch(resetAction) },

                        ],
                        { cancelable: false }
                    )
                }

            }
            )
            .catch((error) => { console.log("erro fetch", error) });

        console.log({ ...data })
    };







    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#836FFF' barStyle="light-content" />

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {

                    }]}>Nome Completo</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInput
                            placeholder="Seu nome completo"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeNome(val)}
                        />
                        {data.check_textInputChangeNome ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>


                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Data de Nascimento</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/AAAA'
                            }}
                            value={data.dt_nascimento}
                            placeholder="Formato DD/MM/AAAA"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeDtNascimento(val)}
                        />
                        {data.check_textInputChangeDT ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Telefone</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            value={data.telefone}
                            placeholder="Seu Telefone"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeTelefone(val)}
                        />
                        {data.check_textInputChangeTel ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>


                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { registro() }}
                        >
                            <LinearGradient
                                colors={['#836FFF', '#bdb3fc']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Editar</Text>
                            </LinearGradient>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#836FFF'


    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingTop: 150
        
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#836FFF',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});