
import { getPatientData, savePatinetData, clearItemAsyncStorage, saveTimestamp, saveData, getItem } from './storage/RnStorage.tsx'
import { toJson } from './utils/builders/PatientBuilder.js'
import { PatientSessionApi } from './api/PatientSessionApi.tsx'
import Utils from './utils/Utils.js'
import { PatientBuilder } from './utils/builders/PatientBuilder.js'

export class PatientSession {
  static sessionId = null

  async startSession() {
    try {
      // console.log("startSession");

      // Save timestamp
      await saveTimestamp();

      console.log("sessionId:", PatientSession.sessionId);

      // End session if sessionId exists
      if (PatientSession.sessionId != null) {
        // console.log("from here")
        await this.endSession();
      }

      // Generate new sessionId
      PatientSession.sessionId = await new Utils().sessionId();
      // console.log("startSession 123");

      // Call PatientSessionApi
      await PatientSessionApi(PatientSession.sessionId, 1);

      // Save sessionId
      await saveData("sessionId", PatientSession.sessionId)

      // Build patient object
      const patientBuilder = new PatientBuilder();
      patientBuilder.add("sessionId", PatientSession.sessionId);
      const patient = patientBuilder.build();

      // Save patient data
      if (patient != null) {
        await this.savePatientData(patient);
      }

      // Schedule endSession after expiration time
      setTimeout(async () => {

        await this.endSession();
      }, 30 * 60 * 1000);
    } catch (error) {
      console.error("Error in startSession:", error);
    }
  }


  async endSession() {
    console.log("endSession");
    const sessionId = await getItem("sessionId");
    console.log("sessionId:", sessionId)
    if (sessionId !== undefined && sessionId !== null) {
      console.log("endSession here")
      await PatientSessionApi(PatientSession.sessionId, 0);
      await clearItemAsyncStorage('patientData')
      await clearItemAsyncStorage('sessionId')
      PatientSession.sessionId = null
      // console.log("endSession 123")
    }
  }

  savePatientData = async (newValue) => {
    // Check for active session
    const sessionId = await getItem("sessionId");
    console.log("sessionId:", sessionId)
    if (!(sessionId !== undefined && sessionId !== null)) {
      console.log("No session found!")
      return false;
    }

    // console.log("inside newValue: ", newValue)
      const savedValue = await getPatientData();
      if (savedValue !== undefined && savedValue !== null && typeof savedValue === 'object') {
          // Proceed with accessing properties or methods of obj
          // console.log("inside savePatientData: ", savedValue)
          // console.log("value exists: ")
          const mergedObj = this.mergeObjects(savedValue, toJson(newValue))
          await savePatinetData(mergedObj)
          // console.log("after merging savePatientData: ", mergedObj)
          return true
      } else {
          await savePatinetData(toJson(newValue))
          return true
      }
  }

  mergeObjects = (obj1, obj2) => {
    return { ...obj1, ...obj2 };
  }

  getBr = async () => {
    // console.log("Br called");
    let br = '';
    // Fetch patient data
    try {
      const patient = await getPatientData();
      if (patient !== undefined && patient !== null && typeof patient === 'object') {
        const attributes = {
          attributes: patient
        };
        // console.log("PatientSession", JSON.stringify(attributes));
        br = new Utils().encodeBase64(JSON.stringify(attributes));
        // console.log("Encrypted br", br);
        return br;
      } else {
        console.log("PatientSession", "No patient found");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
    return ""
  }

}