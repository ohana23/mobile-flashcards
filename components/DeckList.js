import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { getDecks } from '../utils/api'

class DeckList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DATA: [],
        }
    }

    componentDidMount() {
        const fetchDecks = async () => {
            const response = await getDecks()

            this.setState({
                DATA: response
            })
        }
        
        this.props.navigation.addListener('focus', () => { fetchDecks() })
    }

    formatData(decks) {
        let entries = Object.entries(decks)
        var formattedData = []

        for (let i = 0; i < entries.length; i++) {
            let deckEntry = {
                title: entries[i][0],
                numberOfCards: entries[i][1].questions.length,
            }
            
            formattedData.push(deckEntry)
        }

        return formattedData
    }

    render() {
        const { DATA } = this.state
        const { navigation } = this.props

        const DeckItem = ({ title, numberOfCards }) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('Deck Details', {
                    title: title,
                    numberOfCards: numberOfCards,
                })}
            >
                <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>
                            {numberOfCards + (numberOfCards !== 1 ? " cards" : " card")}
                        </Text>
                </View>
            </TouchableOpacity>
        )

        const renderItem = ({ item }) => (
            <DeckItem 
                title={item.title} 
                numberOfCards={item.numberOfCards}
            />
        )

        const AddDeckButton = () => {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Create Deck')}
                >
                    <Text style={styles.button}>CREATE DECK</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.formatData(DATA)}
                    renderItem={renderItem}
                    keyExtractor={item => item.title}
                />
                <AddDeckButton />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
        backgroundColor: 'rgb(10, 125, 240)',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'white'
    },
    button: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgb(10, 125, 240)',
        height: 65,
        textAlign: 'center',
        padding: 22,
        letterSpacing: 1
    }
  })
  

export default DeckList