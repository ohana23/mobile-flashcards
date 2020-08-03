import React from 'react'
import { StyleSheet, Text, TextInput, Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

class NewCard extends React.Component {
    state = {
        questionValue: '',
        answerValue: '',
    }

    handleQuestionChange = (question) => {
        this.setState({ questionValue: question })
    }

    handleAnswerChange = (answer) => {
        this.setState({ answerValue: answer })
    }

    handleSubmit = () => {
        Keyboard.dismiss()
        navigation.navigate('DeckListScreen')
    }

    render() {
        const { questionValue, answerValue } = this.state
        const inputsIncomplete = questionValue === '' || answerValue === ''
        
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
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
                        onPress={this.handleSubmit}
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
        backgroundColor: 'rgb(210, 210, 210)'
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