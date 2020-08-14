import { decks } from './_DATA'
import AsyncStorage from '@react-native-community/async-storage'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:deck'

export function getData() {
    return decks
}

export async function getDecks() {
    try {
        const item = await AsyncStorage.getItem(DECKS_STORAGE_KEY)

        if (item === null) {
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
        }

        return item === null 
            ? decks
            : JSON.parse(item)
    } catch (err) {
        console.log(err)
    }
}

export async function storeData() {
    try {
        await AsyncStorage.setItem(
            'MobileFlashcards:deck',
            JSON.stringify(decks)
        )

    } catch (error) {
        console.log(error)
    }
}

// Get a specific deck.
export async function getDeck(id, setDeckList) {
    try {
        const allDecks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)

        if (setDeckList) {
            setDeckList(JSON.parse(allDecks)[id])
        }

        return JSON.parse(allDecks)[id]
    } catch (err) {
        console.log(err)
    }
}

// Save a new deck to the decklist.
export async function saveDeckTitle(deckTitle) {
    try {
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [deckTitle]: {
                    deckTitle,
                    questions: []
                }
            })
        )
    } catch (err) {
        console.log(err)
    }
}

// Add a new card to the specified deck title.
export async function addCardToDeck(title, card) {
    try {
        const deck = await getDeck(title)

        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        )
    } catch (err) {
        console.log(err)
    }
}

// Clear out AsyncStorage data.
export async function clearAppData() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error(error);
    }
  }