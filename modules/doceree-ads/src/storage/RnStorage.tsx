
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Patient } from '../utils/builders/PatientBuilder.js'

const expirationTime = 30 * 60 * 1000; // 30 minutes in milliseconds
const timestampKey = "timestamp"
const patientKey = 'patientData'

export const clearAsyncStorage = () => {
    AsyncStorage.clear().then(() => console.log('Cleared'));
}

export const clearItemAsyncStorage = async (key: String) => {
    AsyncStorage.removeItem(key).then(() => console.log('Cleared Item ', key));
}

export const saveItem = async (key: String, value: String) => {
    AsyncStorage.setItem(key, value);
}

export const saveData = async (key: String, value: Patient) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('Data stored successfully');
    } catch (error) {
        console.error(error);
    }
}

export const getItem = async (key: String) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            const jsonObject = JSON.parse(value);
            return jsonObject
        } else {
            // Value does not exist
            console.log('Value does not exist');
        }
    } catch (error) {
        // Error retrieving data
        console.error(error);
    }
}

export const saveTimestamp = async() => {
    try {
        const currentTime = new Date().getTime();
        await AsyncStorage.setItem(timestampKey, JSON.stringify(currentTime));
        console.log('Timestamp saved successfully');
    } catch (error) {
        console.error('Error Timestamp data:', error);
    }
}
    
export const isExpired = async() => {
    const timestampData = await AsyncStorage.getItem(timestampKey);
    if (timestampData !== null) {
        const timestamp = JSON.parse(timestampData);
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - timestamp;
        if (timeDifference <= expirationTime) {
            return false;
        } else {
            // If data has expired, remove it from AsyncStorage and return null
            await AsyncStorage.removeItem(timestampKey);
            return true;
        }
    } else {
        return true;
    }
}

export const savePatinetData = async (value) => {
    const expired = await isExpired();
    if (expired) {
        console.log('savePatinetData session expired!');
        await AsyncStorage.removeItem(patientKey);
        return
    }
    await saveData(patientKey, value)
};

export const getPatientData = async () => {
    const expired = await isExpired();
    if (expired) {
        console.log('getPatientData session expired!');
        await AsyncStorage.removeItem(patientKey);
        return
    }
    return await getItem(patientKey)
};