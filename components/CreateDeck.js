import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { saveDeckTitle } from '../utils/api'

function CreateDeck({ route, navigation }) {

    const [newDeckTitle, setNewDeckTitle] = useState('')

    useEffect(() => { }, [newDeckTitle])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardShouldPersistTaps={'never'}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <TextInput
                    style={styles.input}
                    placeholder='Title'
                    placeholderTextColor='rgb(150, 150, 180)'
                    defaultValue={''}
                    onChangeText={text => setNewDeckTitle(text)}
                />
                <TouchableOpacity
                    onPress={() => {
                        saveDeckTitle({newDeckTitle})
                        navigation.navigate('Decks')
                    }}
                >
                    <Text style={styles.button}>CREATE</Text>
                </TouchableOpacity>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    input: {
        borderWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'transparent',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgb(230, 230, 230)'
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(10, 125, 240)',
        height: 50,
        padding: 8,
        textAlign: 'center',
        letterSpacing: 1,
    },
    buttonDisabled: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'lightgray',
        height: 50,
        padding: 8,
        textAlign: 'center',
        letterSpacing: 1,
    },
  })
  

export default CreateDeck