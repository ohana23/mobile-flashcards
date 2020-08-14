import React from 'react'
import { StyleSheet, Text, TextInput, Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { addCardToDeck } from '../utils/api'

class NewCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionValue: '',
            answerValue: ''
        }
    }

    handleQuestionChange = (question) => {
        this.setState({ questionValue: question })
    }

    handleAnswerChange = (answer) => {
        this.setState({ answerValue: answer })
    }

    handleSubmit = (questionValue, answerValue) => {
        const { deckTitle } = this.props.route.params

        Keyboard.dismiss()

        // Create a card object.
        const card = {
            question: questionValue,
            answer: answerValue
        }

        // Use AsyncStorage to add that card to its respective deck.
        const postThisCardToThisDeck = async () => {
            await addCardToDeck(deckTitle, card)
        }
        postThisCardToThisDeck()

        // Back navigate to this deck's details.
        this.props.navigation.goBack()
    }

    render() {
        const { questionValue, answerValue } = this.state
        const inputsIncomplete = questionValue === '' || answerValue === ''
        
        return (
            <KeyboardAvoidingView
                behavior={"padding"}
                style={styles.container}
                keyboardShouldPersistTaps={'never'}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <TextInput
                        style={styles.input}
                        placeholder="Question"
                        multiline = {true}
                        placeholderTextColor="rgb(150, 150, 180)"
                        value={questionValue}
                        onChangeText={question => this.handleQuestionChange(question)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Answer"
                        multiline={true}
                        placeholderTextColor="rgb(150, 150, 180)"
                        value={answerValue}
                        onChangeText={answer => this.handleAnswerChange(answer)}
                    />
                    <TouchableOpacity
                        disabled={inputsIncomplete}
                        onPress={() => this.handleSubmit(questionValue, answerValue)}
                    >
                        <Text style={inputsIncomplete ? styles.buttonDisabled : styles.button}>SUBMIT</Text>
                        <View style={{height: 60}}></View>
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
        height: 100,
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
  

export default NewCard