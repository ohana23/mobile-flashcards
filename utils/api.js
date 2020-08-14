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
            console.log("item is null")
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
export async function saveDeckTitle(title) {
    console.log("SAVE DECK TITLE")
    console.log(title)
    console.log(JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
    try {
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title,
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
        console.log(title)
        console.log(deck)

        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        )

        const deck2 = await getDeck(title)
        console.log(deck2)
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