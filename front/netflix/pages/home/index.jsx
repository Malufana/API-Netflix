import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, TextInput, Pressable, Image} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [id, setID] = useState("");
  const [filmeG, setFilmeG] = useState("");
  const [generoG, setGeneroG] = useState("");
  const [anoG, setAnoG] = useState("");
  const [classifG, setClassifG] = useState("");
  const [idiomaG, setIdiomaG] = useState("");

  const [filme, setFilme] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [classif, setClassif] = useState("");
  const [idioma, setIdioma] = useState("");

  const [token, setToken] = useState("");

  useEffect( () => {
    AsyncStorage.getItem("token")
      .then(
        (value) => {
          if(token != null){
            setToken(value);
            console.log("Token Home: ", value);
          }
        }
      ).catch(
        (error) =>{
          console.error("Erro ao pegar o token", error);
        }
      )
  }, [])


  //LISTAR FILMES
  const capturar = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/filme/" + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseGenero = await axios.get("http://127.0.0.1:8000/api/genero/" + response.data.genero,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });

      const responseClassificacao = await axios.get("http://127.0.0.1:8000/api/classificacao/" + response.data.classific,{
        headers: {
          Authorization: `Bearer ${token}`
        }

      });
      // console.log(token);

      console.log(response.data);
      setFilmeG(response.data.titulo);
      setGeneroG(responseGenero.data.genero);
      setAnoG(response.data.ano);
      setClassifG(responseClassificacao.data.classific);
      setIdiomaG(response.data.idioma);

    } catch {
      console.log(Error);
    }
  };

  //CRIAR FILMES
  const enviar = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/listarfilmes", {
          // Antes dos dois pontos são os elementos do Back
          // Depois dos dois pontos, são os elementos do Front
          titulo: filme,
          genero: genero,
          ano: ano,
          classific: classif,
          idioma: idioma,
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      console.log("Dados inseridos com sucesso...");
      alert("Dados inseridos com Sucesso!");
      setFilme("");
      setGenero("");
      setAno("");
      setClassif("");
      setIdioma("");
    } catch (error) {
      console.log("Erro ao inserir os dados...");
    }
  };

  //ATUALIZAR FILMES
  const atualizar = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/filme/" + id,
        {
          titulo: filmeG,
          genero: generoG,
          ano: anoG,
          classific: classifG,
          idioma: idiomaG
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      console.log("Alterado com sucesso");
      alert("Alterado com sucesso!");
      setFilmeG("");
      setGeneroG("");
      setAnoG("");
      setClassifG("");
      setIdiomaG("");
    } catch (error) {
      console.log("Erro ao atualizar", error);
    }
  };

  //DELETAR FILMES
  const deletar = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/filme/" + id, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      console.log("Deletado com sucesso");
      alert("Deletado com sucesso!");
      setFilmeG("");
      setGeneroG("");
      setAnoG("");
      setClassifG("");
      setIdiomaG("");
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  };

  //LIMPAR OS CAMPOS
  const limpar = async () => {
    setID("");
    setFilmeG("");
    setGeneroG("");
    setAnoG("");
    setClassifG("");
    setIdiomaG("");
    
    setFilme("");
    setGenero("");
    setAno("");
    setClassif("");
    setIdioma("");
    console.log("Campos limpados com sucesso!");
  };

  return (
    <View style={styles.container}>
      {/* GET */}
      <View style={styles.stGet}>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 25 }}>
          GET
        </Text>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>ID:</Text>
          <TextInput
            value={id}
            onChangeText={(e) => {
              setID(e);
            }}
            style={styles.caixaId}
          />
          <Pressable style={styles.btn} onPress={capturar}>
            <Text style={{ fontWeight: "bold" }}>PEGAR</Text>
          </Pressable>

          <Pressable style={styles.btnAtualizar} onPress={atualizar}>
            <Text style={{ fontWeight: "bold" }}>ATUALIZAR</Text>
          </Pressable>

          <Pressable style={styles.btnDelete} onPress={deletar}>
            <Text style={{ fontWeight: "bold" }}>DELETAR</Text>
          </Pressable>

          <Pressable style={styles.btnLimpar} onPress={limpar}>
            <Text style={{ fontWeight: "bold" }}>LIMPAR</Text>
          </Pressable>
        </View>

        <Text>Filme</Text>
        <TextInput
          value={filmeG}
          style={styles.caixaGet}
          onChangeText={(e) => setFilmeG(e)}
        />

        <Text>Gênero</Text>
        <TextInput
          value={generoG}
          style={styles.caixaGet}
          onChangeText={(e) => setGeneroG(e)}
        />

        <Text>Ano</Text>
        <TextInput
          value={anoG}
          style={styles.caixaGet}
          onChangeText={(e) => setAnoG(e)}
        />

        <Text>Idioma</Text>
        <TextInput
          value={idiomaG}
          style={styles.caixaGet}
          onChangeText={(e) => setIdiomaG(e)}
        />

        <Text>Classificação</Text>
        <TextInput
          value={classifG}
          style={styles.caixaGet}
          onChangeText={(e) => setClassifG(e)}
        />
      </View>

      {/* POST */}
      <View style={styles.stPost}>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 25 }}>
          POST
        </Text>
        <View style={styles.ladoLado}>
          <View style={styles.box}>
            <Text>Filme</Text>
            <TextInput
              value={filme}
              onChangeText={(e) => {
                setFilme(e);
              }}
              style={styles.caixaPost}
            />

            <Text>Gênero</Text>
            <TextInput
              value={genero}
              onChangeText={(e) => {
                setGenero(e);
              }}
              style={styles.caixaPost}
            />

            <Text>Ano</Text>
            <TextInput
              value={ano}
              onChangeText={(e) => {
                setAno(e);
              }}
              style={styles.caixaPost}
            />

            <Text>Idioma</Text>
            <TextInput
              value={idioma}
              onChangeText={(e) => {
                setIdioma(e);
              }}
              style={styles.caixaPost}
            />

            <Text>Classificação</Text>
            <TextInput
              value={classif}
              onChangeText={(e) => {
                setClassif(e);
              }}
              style={styles.caixaPost}
            />
          </View>
          <View style={styles.box}>
            <Pressable style={styles.imagemBotao}>
              <Image style={styles.imagem}></Image>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.btnPost} onPress={enviar}>
          <Text style={{ fontWeight: "bold" }}>POSTAR</Text>
        </Pressable>

        

      </View>
    </View>
  );
}
