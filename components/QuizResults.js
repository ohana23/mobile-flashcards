import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class QuizResults extends React.Component {
    
    render() {
        const { correctAnswers, totalQuestions, handleRestart, navigation } = this.props
        const score = correctAnswers / totalQuestions

        // Remove current day's notification if a user reaches the Results of a quiz.
        // Set a local notification for the day after.
        clearLocalNotification()
            .then(setLocalNotification)

        return (
            <View style={score >= 0.9 ? [styles.container, styles.backgroundColorSuccess] : [styles.container, styles.backgroundColorFailure]}>
                <Text style={styles.text}>Results</Text>
                
                <Text style={styles.score}>
                    {correctAnswers} out of {totalQuestions} correct
                </Text>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            handleRestart()
                        }}
                    >
                        <Text style={styles.buttonText}>RESTART QUIZ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.buttonText}>BACK TO DECK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundColorSuccess: {
        backgroundColor: '#28A745'
    },
    backgroundColorFailure: {
        backgroundColor: '#DC3545'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
    },
    score: {
        fontSize: 30,
        color: 'white'
    },
    button: {
        height: 50,
        padding: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
    },
    buttonGroup: {
        marginTop: 100,
    }
  })
  

export default function(props) {
    const navigation = useNavigation()
    return <QuizResults {...props} navigation={navigation} />
}