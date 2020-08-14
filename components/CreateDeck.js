import React from 'react'
import { StyleSheet, Text, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import { saveDeckTitle } from '../utils/api'

class CreateDeck extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deckTitle: ''
        }
    }

    handleDeckTitleChange = (deckTitleValue) => {
        this.setState({ deckTitle: deckTitleValue })
    }

    handleSubmit = (deckTitle, navigation) => {
        saveDeckTitle(deckTitle)
        navigation.navigate('Deck Details', {
            title: deckTitle,
            numberOfCards: 0
        })
    }

    render() {
        const { deckTitle } = this.state
        const { navigation } = this.props

        return (
            <KeyboardAvoidingView
                behavior={"padding"}
                style={styles.container}
                keyboardShouldPersistTaps={'never'}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <TextInput
                        style={styles.input}
                        placeholder='Title'
                        placeholderTextColor='rgb(150, 150, 180)'
                        value={deckTitle}
                        onChangeText={deckTitleValue => this.handleDeckTitleChange(deckTitleValue)}
                    />
                    <TouchableOpacity
                        disabled={deckTitle === '' ? true : false}
                        onPress={() => this.handleSubmit(deckTitle, navigation)}
                    >
                        <Text style={deckTitle === '' ? styles.buttonDisabled : styles.button}>CREATE</Text>
                    </TouchableOpacity>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
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