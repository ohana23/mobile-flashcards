import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getDeck } from '../utils/api'

function DeckDetails({ route, navigation }) {

    const [deckList, setDeckList] = useState();

    useEffect(() => {
        getDeck(route.params.title, setDeckList).questions
    }, [])

    const StartQuizButton = ({ title }) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Start Quiz', { deckList })}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        )
    }

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.title}</Text>
            <Text style={styles.subtitle}>{route.params.subtitle}</Text>

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