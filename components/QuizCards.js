import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class QuizCards extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>QuizCards</Text>
                
                {/* PROGRESS COMPONENT */}
                {/* CARD COMPONENT QUESTION/ANSWER */}
                {/* BUTTON to guess incorrectly */}
                {/* BUTTON to flip card */}
                {/* BUTTON to guess correctly */}

                {/* IF no cards left, navigate to QuizResults */}

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
    text: {
        color: 'white',
    },
  })
  

export default QuizCards