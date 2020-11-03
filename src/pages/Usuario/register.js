import React from 'react';
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



const SignInScreen = ({props}) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn'})],
      })

    const [data, setData] = React.useState({
        nome: '',
        cpf: '',
        dt_nascimento: '',
        telefone: '',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChangeEmail: false,
        check_textInputChangeNome: false,
        check_textInputChangeCPF: false,
        check_textInputChangeDT: false,
        check_textInputChangeTel: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChangeEmaIL = (val) => {
        if( val.length > 5 ) {
            setData({
                ...data,
                email: val,
                check_textInputChangeEmail: true
            });
        } else {
            setData({
                ...data,
            email: val,
                check_textInputChangeEmail: false
            });
        }
    }

    const textInputChangeCpf = (val) => {
        if( val.length == 14) {
            setData({
                ...data,
                cpf: val,
                check_textInputChangeCPF: true
            });
        } else {
            setData({
                ...data,
                cpf: val,
                check_textInputChangeCPF: false
            });
        }
    }

    const textInputChangeDtNascimento = (val) => {
        if( val.length >= 9 ) {
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
        if( val.length >= 13 ) {
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
        if( val.length > 3 ) {
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

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const registro = () => {
        fetch('http://www.ipet.kinghost.net/v1/account/Adicionar',{
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
                "Role" : "cliente"

            })
          })
           
           .then((response) => response.json())
           .then((responseJson) => {
             console.log("responsejson",responseJson)
             if(responseJson == "CPF JÁ CADASTRADO"){
                setData({
                    ...data,
                    cpf: "teste",
                    check_textInputChangeCPF: false
                });

                Alert.alert(
                    'Registro',
                    'O CPF INFORMADO JÁ EXISTE EM NOSSA BASE.',
                    [
                      {text: 'Ok', onPress: () => {console.log("continua cadastro")}},                
                      {text: 'Resetar senha', onPress: () => console.log('Vai para tela de reset de senha')},
                    ],
                    { cancelable: false }
                  )
             } else {
                Alert.alert(
                    'Registro',
                    'Usuario cadastrado.',
                    [
                      {text: 'teste ir para proxima tela', onPress: () => navigation.dispatch(resetAction)},                
                      
                    ],
                    { cancelable: false }
                  )
             }
            
           }
           )
           .catch((error) => {console.log("erro fetch",error)});
     
           console.log({...data})
         };
 
        
        
    

    let handleOnChange = ( email ) => {

        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) ) {
            console.log("correto");
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        }
        else {
            console.log("Email is Not Correct");
        }
    
    }
    


    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#836FFF' barStyle="light-content"/>

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
            }]}>CPF</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInputMask
                    type={'cpf'}
                    value = {data.cpf} 
                    placeholder="Seu CPF"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeCpf(val)}
                />
                {data.check_textInputChangeCPF ? 
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
  value = {data.telefone}
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




            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>E-mail</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    placeholder="Seu e-mail"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeEmaIL(val)}
                />
                {data.check_textInputChangeEmail ? 
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
            }]}>Senha</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    placeholder="Sua Senha"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirme sua senha</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirme sua senha"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {registro()}}
                >
                <LinearGradient
                    colors={['#836FFF', '#bdb3fc']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Registrar</Text>
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
        //paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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