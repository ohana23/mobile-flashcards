import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getDeck } from '../utils/api'

class DeckDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deckList: {},
            numberOfCards: this.props.route.params.numberOfCards
        }
    }

    componentDidMount() {
        const fetchDeck = async () => {
            const response = await getDeck(this.props.route.params.title)

            this.setState({
                deckList: response,
                numberOfCards: response.questions.length
            })
        }

        this.props.navigation.addListener('focus', () => { 
            fetchDeck() 
        })
    }

    render() {
        const { route, navigation } = this.props
        const { deckList, numberOfCards } = this.state
    
        const StartQuizButton = ({ buttonText }) => {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Start Quiz', { 
                        deckList 
                    })}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            )
        }
    
        const AddCardButton = ({ buttonText, deckTitle, numberOfCards }) => {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.push('New Card', { 
                        deckTitle, 
                        numberOfCards
                    })}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{route.params.title}</Text>
                <Text style={styles.subtitle}>{route.params.subtitle}</Text>
                <Text style={styles.subtitle}>
                    {numberOfCards + (numberOfCards !== 1 ? " cards" : " card")}
                </Text>
                <View style={styles.buttonGroup}>
                    <StartQuizButton 
                        buttonText="START QUIZ" 
                    />
                    <AddCardButton 
                        buttonText="ADD A CARD" 
                        deckTitle={route.params.title}
                        numberOfCards={numberOfCards}
                    />
                </View>
    
            </View>
        )
    }

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