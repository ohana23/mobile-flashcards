import { decks } from './_DATA'
import AsyncStorage from '@react-native-community/async-storage'
// import { AsyncStorage } from 'react-native'

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

export async function getDeck(id, setDeckList) {
    try {
        const item = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        setDeckList(JSON.parse(item)[id])
        return JSON.parse(item)[id]
    } catch (err) {
        console.log(err)
    }
}

// export async function getDeck(id) {
//     try {
//         const item = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
//         console.log(JSON.parse(item)[id])
//         return JSON.parse(item)[id]
//     } catch (err) {
//         console.log(err)
//     }
// }

export async function saveDeckTitle(title) {
    console.log("SAVE DECK TITLE")
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