import { decks } from './_DATA'
import AsyncStorage from '@react-native-community/async-storage'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:deck'
export const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

// Get all decks stored in AsyncStorage.
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

// Store initial decks data to AsyncStorage.
export async function storeData() {
    try {
        await AsyncStorage.setItem(
            DECKS_STORAGE_KEY,
            JSON.stringify(decks)
        )

    } catch (error) {
        console.log(error)
    }
}

// Get a specific deck.
export async function getDeck(id) {
    try {
        const allDecks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
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

// Delete all AsyncStorage data.
export async function clearAppData() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error(error);
    }
}

// * untested *
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// * untested *
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(21)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleNotificationAsync({
                                content: {
                                    title: 'Study',
                                    body: "Complete at least one quiz today!",
                                    ios: {
                                        sound: true
                                    }
                                },
                                trigger: {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            })

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}