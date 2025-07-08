// import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../constant/strings';

export class HcpBuilder {

    #hcp: HCP
    #hcpId: String
    #hashedHcpId: String
    #firstName: String
    #lastName: String
    #specialization: String

    #organisation: String
    #zipCode: String
    #city: String
    #gender: String
    #email: String

    #mobile: String
    #hashedEmail: String
    #dob: String
    #wl: String
    #state: String
    #country:String

  public setHcpId(hcpId: String){
    this.#hcpId = hcpId;
  }

  public setHashedHcpId(hashedHcpId: String){
      this.#hashedHcpId = hashedHcpId;
  }

  public setFirstName(firstName: String){
  this.#firstName = firstName;
  }

  public setLastName(lastName: String){
  this.#lastName = lastName;
  }

  public setSpecialization(specialization: String){
  this.#specialization = specialization;
  }

  public setOrganisation(organisation: String){
  this.#organisation = organisation;
  }

  public setZipCode(zipCode: String){
  this.#zipCode = zipCode;
  }

  public setCity(city: String){
  this.#city = city;
  }

  public setGender(gender: String){
  this.#gender = gender;
  }

  public setEmail(email: String){
  this.#email = email;
  }

  public setMobile(mobile: String){
  this.#mobile = mobile;
  }

  public setHashedEmail(hashedEmail: String){
  this.#hashedEmail = hashedEmail;
  }

  public setDob(dob: String){
  this.#dob = dob;
  }

  public setWl(wl: String){
  this.#wl = wl;
  }

  public setState(state: String){
  this.#state = state;
  }

  public setCountry(country: String){
  this.#country = country;
  }

  public build(){

    if(this.#hcpId != null && this.#hashedHcpId != null && this.#firstName != null && this.#specialization != null
          && this.#organisation != null && this.#zipCode != null && this.#email != null) {
         this.#hcp = new HcpBuilder.HCP();
         this.#hcp.hcpId = this.#hcpId;
         this.#hcp.hashedHcpId = this.#hashedHcpId;
         this.#hcp.firstName = this.#firstName;
         this.#hcp.lastName = this.#lastName;
         this.#hcp.specialization = this.#specialization;
         this.#hcp.organisation = this.#organisation;
         this.#hcp.zipCode = this.#zipCode;
         this.#hcp.city = this.#city;
         this.#hcp.gender = this.#gender;
         this.#hcp.email = this.#email;
         this.#hcp.mobile = this.#mobile;
         this.#hcp.dob = this.#dob;
         this.#hcp.wl = this.#wl;
         this.#hcp.state = this.#state;
         this.#hcp.country = this.#country;
         this.#hcp.hashedEmail = this.#hashedEmail;
         console.log("HCP Created");
         AsyncStorage.setItem(strings.CONSTANT.HcpData, JSON.stringify(this.#hcp));
         return this.#hcp;
    }

    console.log("HCP Creation Failed");
    return null;
  }


  static HCP = class {

    hcpId: String
    hashedHcpId: String
    firstName: String
    lastName: String
    specialization: String

    organisation: String
    zipCode: String
    city: String
    gender: String
    email: String

    mobile: String
    hashedEmail: String
    dob: String
    wl: String
    state: String
    country:String


  }

}