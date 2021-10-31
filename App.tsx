import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Button, Provider as PaperProvider } from "react-native-paper";

//Definindo PROPs para o valor input e seu Use State

interface Valor_input {
  valor: string;
  onChangeValor: Dispatch<SetStateAction<string>>;
  button_ok: boolean;
  onChangeButton: Dispatch<SetStateAction<boolean>>;
}

//------------- Segmento da tela com o ScrollView  ---------------------//
function Tela_Scrow({ valor, onChangeValor, button_ok, onChangeButton }: Valor_input) {

  const [array, setArray] = useState([]);
  const [id, setid] = useState(1);


  useEffect(() => {

    var vogal, consoante;
    var qtd_vogal = 0;
    var qtd_consoante = 0;

    if (button_ok == true && valor != '') {

      setid(id + 1);
      vogal = valor.match(/[aeiouáàâãäéèêëíïóôõöú]/gi);

      if (vogal != null) {
        qtd_vogal = vogal.length;
      }

      consoante = valor.match(/[bcdfghjklmnpqrstvwxyzç]/gi);

      if (consoante != null) {
        qtd_consoante = consoante.length;
      }

      array.push({ 'name': valor, 'id': id, 'code': qtd_vogal + 'v ' + qtd_consoante + 'c' });
      setArray(array);
      onChangeValor('');
    }

  }, [button_ok]);

  onChangeButton(false);


  const item = array.map((item, index) => (
    <View key={item.id} style={styles.item}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.code}</Text>
    </View>
  ))

  return (
    <View style={styles.container_list}>
      <View style={styles.header}>
        <Text style={styles.texto}>ID</Text>
        <Text style={styles.texto}>TEXTO</Text>
        <Text style={styles.texto}>CODE</Text>
      </View>
      <ScrollView>
        {item}
      </ScrollView>
    </View>
  );
}


//-------------  Segmento de tela para input de texto ---------------------//
function Input({ valor, onChangeValor }: Valor_input) {

  return (
    <View style={styles.container_input}>
      <Text style={styles.texto}>Informe uma frase:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeValor}
        value={valor}
      />

    </View>
  );
}

//------------- Segmento de tela para Botão ---------------------//
function Botao({ button_ok, onChangeButton }: Valor_input) {

  const handleButtonPress = () => {
    onChangeButton(true);
  };

  return (
    <View style={styles.container_botao}>
      <Button icon="cursor-pointer" mode="contained" onPress={handleButtonPress}>
        Confirmar
        </Button>
    </View>
  );
}

// --------------------------------------------------------------------//
//                            Executar APP
// --------------------------------------------------------------------//

export default function App() {
  const [valor, onChangeValor] = React.useState<string>('')
  const [button_ok, onChangeButton] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      <Tela_Scrow valor={valor} onChangeValor={onChangeValor} button_ok={button_ok} onChangeButton={onChangeButton} />
      <Input valor={valor} onChangeValor={onChangeValor} button_ok={button_ok} onChangeButton={onChangeButton} />
      <Botao valor={valor} onChangeValor={onChangeValor} button_ok={button_ok} onChangeButton={onChangeButton} />
      <StatusBar style="auto" />
    </View>
  );
}

// --------------------------------------------------------------------//
//                            STYLES
// --------------------------------------------------------------------//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#f5f9eb',
    padding: 30,
  },
  container_input: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingLeft: 10,
    flex: 0.5,
    borderWidth: 1,
    borderColor: '#20232a',
    marginVertical: '1%',
  },
  container_botao: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 30,
    flex: 0.2,
    borderWidth: 1,
    borderColor: '#20232a',
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold"
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#32cdc3',
  },
  container_list: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
  },
  button: {
    flexDirection: "row",
    backgroundColor: '#E9DBAB',
    alignItems: 'center',
  },
});
