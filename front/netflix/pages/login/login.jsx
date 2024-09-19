import React, {useState, useEffect } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import styles from "./styles";
import axios from "axios";
// import { useNavigation } from "@react-navigation/native"; //importação parea navegar entre as telas
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}){
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    // const navigate = useNavigation(); //instancia do useNavigation para navegar entre as telas
    // const [mensagem, setMensagem] = useState('');

    useEffect( () => {
        AsyncStorage.setItem("token", token)
          .then(
              () => {
                if(token != null){
                  console.log("Token Login: ", token)
                }
              }
          ).catch(
            (error) =>{
              console.error("Erro ao pegar o token", error)
            }
          )
    }, [token])

    const logar = async () => {
        try{
            const response = await axios.post(
                " http://127.0.0.1:8000/api/token/",
                {
                    //o lado esquedo é o backEnd e o lado direito é frontEnd
                    username: user,
                    password: password
                }
            )
            console.log(response.data.access)
            setToken(response.data.access)
            navigation.navigate('Home'); //nome que usa na instancia . metodo utilizado para a navegação e o nome da pagina igual esta no routers
        }catch(error){
            console.error(error)
            alert("Usuario não identificado, por favor tente novamente!!");
            setUser("");
            setPassword("");
        }

        
        
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>Username</Text>
                <TextInput
                    style ={styles.caixa}
                    value={user}
                    onChangeText={(e) => setUser(e)}
                    // placeholder="USERNAME"
                />
            </View>
            <View style={styles.div}>
                <Text>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style ={styles.caixa}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    // placeholder="PASSWORD"
                />
            </View>
            <View>
                <Pressable style={styles.btn} onPress={logar}>
                    <Text style={{ fontWeight: "bold" }}>LOGAR</Text>
                </Pressable>
            </View>
        </View>
    )
}