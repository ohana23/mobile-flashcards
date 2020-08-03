import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function DeckDetails({ route, navigation }) {
    const AddCardButton = ({ title }) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('New Card')}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    const StartQuizButton = ({ title }) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Start Quiz', {
                    deckList: [
                        {question: "Please tell what the powerhouse of the cell is is it the mitochondria or is it something even crazier than that", answer: "yea i kinda feel the same way like i'm asking the asame thing is it the mitochondria or what lol"}, 
                        {question: "What is your age?", answer: "4"},
                    ]
                })}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{route.params.title}</Text>
                <Text style={styles.subtitle}>{route.params.subtitle}</Text>
            </View>

            <View style={styles.buttonGroup}>
                <StartQuizButton title="START QUIZ"/>
                <AddCardButton title="ADD A CARD"/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 20,
        marginTop: 5,
        fontSize: 30,
        textAlign: 'center'
    },
    button: {
        height: 50,
        padding: 8,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
    },
    buttonGroup: {
        marginTop: 100,
    }
  })
  

export default DeckDetails