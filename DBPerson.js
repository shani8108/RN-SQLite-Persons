import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase("Persons.db");

export function Init() {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((tx => {
            //create one time table

            tx.executeSql('CREATE TABLE IF NOT EXISTS Persons (ID INTEGER PRIMARY KEY NOT NULL,Name TEXT NOT NULL,Address TEXT NOT NULL,Age INTEGER NOT NULL )'
                , [], () => {
                    console.log("Sucsess from create table Persons")
                    resolve();
                }, (_, err) => {
                    console.log("error from create table Persons")
                    console.log(err);
                    reject();
                })
        }));
    });
    return prom;
}

export function AddNewPersons(name, address, age) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table

            conn.executeSql('INSERT INTO Persons (Name,Address,Age) VALUES (?,?,?)'
                , [name, address, age], (_, result) => {
                    console.log("Sucsess from insert to table Persons")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from insert to table Persons")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}

export function SelectAllPersons() {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table

            conn.executeSql('SELECT * FROM Persons'
                , [], (_, result) => {
                    console.log("Sucsess from select all Persons")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from select all Persons")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}

export function SearchPerson(searchPrm) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table
            let str = 'SELECT * FROM Persons WHERE Name Like "%' + searchPrm + '%"';
            console.log(str);
            conn.executeSql(str
                , [], (_, result) => {
                    console.log("Sucsess from search all Persons")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from search all Persons")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}