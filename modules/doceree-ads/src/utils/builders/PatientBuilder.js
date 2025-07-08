// Define a Builder class for creating Patient objects
import PatientData from '../../../src/models/PatientData.js'

export class Patient {
    sessionId: String
      age: String
      gender: String
      prescription: []
      labTest: []
      diagnosis: []
      pharmacy: []
      prescriptionHistory: []
      labTestHistory: []
      diagnosisHistory: []
      pharmacyHistory: []
      temperature: {}
      bp: String
      pulse: String
      respiration: String
      insurance: String
      insuranceType: []
      insuranceName: []


}

    // Method to convert user object to JSON
    export const toJson = (patient) => {
        const patientData = new PatientData()
        params = {
            [patientData.patient.sessionId]: patient.sessionId,
            [patientData.patient.age]: patient.age,
            [patientData.patient.gender]: patient.gender,
            [patientData.patient.prescription]: patient.prescription,
            [patientData.patient.labTest]: patient.labTest,
            [patientData.patient.diagnosis]: patient.diagnosis,
            [patientData.patient.pharmacy]: patient.pharmacy,
            [patientData.patient.prescriptionHistory]: patient.prescriptionHistory,
            [patientData.patient.labTestHistory]: patient.labTestHistory,
            [patientData.patient.diagnosisHistory]: patient.diagnosisHistory,
            [patientData.patient.pharmacyHistory]: patient.pharmacyHistory,
            [patientData.patient.temperature]: patient.temperature,
            [patientData.patient.bp]: patient.bp,
            [patientData.patient.pulse]: patient.pulse,
            [patientData.patient.respiration]: patient.respiration,
            [patientData.patient.insurance]: patient.insurance,
            [patientData.patient.insuranceType]: patient.insuranceType,
            [patientData.patient.insuranceName]: patient.insuranceName,
        }
        return removeObjectProperties(params)
    }
    const removeObjectProperties = (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] === null || obj[key] === '') {
            delete obj[key];
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
          }
        }
      }
      return obj;
    };

export class PatientBuilder {
  constructor() {
    // Initialize default properties
    this.patient = {
        sessionId: '',
      age: '',
      gender: '',
      prescription: [],
      labTest: [],
      diagnosis: [],
      pharmacy: [],
      prescriptionHistory: [],
      labTestHistory: [],
      diagnosisHistory: [],
      pharmacyHistory: [],
      temperature: {},
      bp: '',
      pulse: '',
      respiration: '',
      insurance: '',
      insuranceType: [],
      insuranceName: [],
    };
  }

    add(key: String, value: Object) {
        if (key == "sessionId") {
            this.patient.sessionId = value;
        } else if (key == "age") {
            this.patient.age = value;
        } else if (key == "gender") {
            this.patient.gender = value;
        } else if (key == "insurance" && (value == "1" || value == 1) || (value == "0" || value == 0)) {
            this.patient.insurance = value;
        } else if (key == "insuranceType" && Array.isArray(value)) {
            this.patient.insuranceType = value;
        } else if (key =="insuranceName" && Array.isArray(value)) {
            this.patient.insuranceName = value;
        } else if (key =="temperature" && this.isKeyValueObject(value)) {
            this.patient.temperature = value;
        } else if (key =="bp" && typeof value === "string") {
            this.patient.bp = value;
        } else if (key =="pulse" && typeof value === "string") {
            this.patient.pulse = value;
        } else if (key =="respiration" && typeof value === "string") {
            this.patient.respiration = value;
        } else if (key =="labTest" && Array.isArray(value)) {
            this.patient.labTest = value;
        } else if (key =="diagnosis" && Array.isArray(value)) {
            this.patient.diagnosis = value;
        } else if (key =="prescription" && Array.isArray(value)) {
            this.patient.prescription = value;
        } else if (key =="pharmacy" && Array.isArray(value)) {
            this.patient.pharmacy = value;
        } else if (key == "labTestHistory" && Array.isArray(value)) {
            this.patient.labTestHistory = value;
        } else if (key == "diagnosisHistory" && Array.isArray(value)) {
            this.patient.diagnosisHistory = value;
        } else if (key == "prescriptionHistory" &&  Array.isArray(value)) {
            console.log("prescriptionHistory 123: ", value)
            this.patient.prescriptionHistory = value;
        } else if (key == "pharmacyHistory" && Array.isArray(value)) {
            this.patient.pharmacyHistory = value;
        }
        return this; // Return this for method chaining
    }

    isKeyValueObject = (obj) => {
        // Check if obj is a key-value object
        return typeof obj === 'object' && !Array.isArray(obj);
    };

  // Build the patient object with the configured properties
    build() {
        const patient = new Patient()
        patient.sessionId = this.patient.sessionId
        patient.age = this.patient.age
        patient.gender = this.patient.gender
        patient.prescription = this.patient.prescription
        patient.labTest = this.patient.labTest
        patient.diagnosis = this.patient.diagnosis
        patient.pharmacy = this.patient.pharmacy
        patient.prescriptionHistory = this.patient.prescriptionHistory
        patient.labTestHistory = this.patient.labTestHistory
        patient.diagnosisHistory = this.patient.diagnosisHistory
        patient.pharmacyHistory = this.patient.pharmacyHistory
        patient.temperature = this.patient.temperature
        patient.bp = this.patient.bp
        patient.pulse = this.patient.pulse
        patient.respiration = this.patient.respiration
        patient.insurance = this.patient.insurance
        patient.insuranceType = this.patient.insuranceType
        patient.insuranceName = this.patient.insuranceName
//
//        patient.toJson()
        return patient;
    }
}