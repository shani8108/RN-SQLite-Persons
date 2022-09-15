import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Init, AddNewPersons, SelectAllPersons, SearchPerson } from './DBPerson';


export default function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState(0);
  const [search, setSearch] = useState('');
  const [listOfPersons, setListOfPersons] = useState([]);


  useEffect(() => {
    Init().then(() => {
      console.log("DB create good");
    }).catch(() => {
      console.log("DB create failed");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Persons List!</Text>
      <StatusBar style="auto" />

      <View>
        <TextInput placeholder='enter name:' onChangeText={(txtName) => {
          setName(txtName);
        }}></TextInput>
        <TextInput placeholder='enter address:' onChangeText={(txtaddress) => {
          setAddress(txtaddress);
        }}></TextInput>
        <TextInput placeholder='enter age:' onChangeText={(txtage) => {
          setAge(txtage);
        }}></TextInput>
        <Button title='Insert' onPress={() => {
          //"nachman", "hashlosha 10", 23
          AddNewPersons(name, address, age).then((result) => {
            console.log(result);
            console.log("sucsess insert to db");
          }).catch((err) => {
            console.log(err);
          });

          SelectAllPersons().then((result) => {
            console.log(result.rows._array);
            setListOfPersons(result.rows._array);
          }).catch((err) => {
            console.log(err);
          });
        }}>
        </Button>
      </View>
      <View>
        <TextInput placeholder='search by name:' onChangeText={(txtsearch) => {
          setSearch(txtsearch);
        }}></TextInput>
        <Button title='Search' onPress={() => {
          SearchPerson(search).then((result) => {
            console.log(result.rows._array);
            setListOfPersons(result.rows._array);
          }).catch((err) => {
            console.log(err);
          });
        }}>
        </Button>
      </View>
      <ScrollView>
        {listOfPersons.map((x) => {
          return (<View key={x.ID}>
            <Text>{x.ID} : {x.Name} : {x.Address} : {x.Age}</Text>
          </View>)
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
});
