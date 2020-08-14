import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DeckList from './components/DeckList.js'
import DeckDetails from './components/DeckDetails.js'
import NewCard from './components/NewCard.js'
import CreateDeck from './components/CreateDeck.js'
import Quiz from './components/Quiz.js'
import { NavigationContainer } from '@react-navigation/native'
import { storeData, clearAppData } from './utils/api'

const Stack = createStackNavigator();

function DeckListScreen({ route, navigation }) {
  return (
    <DeckList navigation={navigation} route={route} />
  )
}

function NewCardScreen({ route, navigation }) {
  return (
    <NewCard navigation={navigation} route={route} />
  )
}

function App() {
  storeData()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Decks" component={DeckListScreen} />
        <Stack.Screen name="Deck Details" component={DeckDetails} />
        <Stack.Screen name="Create Deck" component={CreateDeck} />
        <Stack.Screen name="New Card" component={NewCardScreen} />
        <Stack.Screen name="Start Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App