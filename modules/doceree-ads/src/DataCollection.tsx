import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  View} from 'react-native';

import { HcpBuilder } from './models/HcpBuilder';
import {ImageAssets} from './assets/ImageAssets';
import { DocereeAds } from './DocereeAds';
import { PatientSession } from './PatientSession.js';



export function DataCollection({navigation}){

  const [rxtext, onRxChange] = React.useState('RxValue');
  const [dxtext, onDxChange] = React.useState('DxValue');
  const [commentText, onCommentChange] = React.useState('CommentText');

  // initializeHcp();
  return (<SafeAreaView>
    <TextInput  style={styles.input}
      value={rxtext}
      onChangeText={onRxChange}/>

    <TextInput  style={styles.input}
      value={dxtext}
      onChangeText={onDxChange}/>

    <TextInput  style={styles.input}
      value={commentText}
      onChangeText={onCommentChange}/>

    <View style={styles.horizontal}>
      <TouchableOpacity onPress={() => sendCollection(DocereeAds.CONSTANT.eventLike, "click_star")}>
        <Image style={styles.imgStyle} source={ImageAssets.icStar}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendCollection(DocereeAds.CONSTANT.eventShare, "click_share")}>
        <Image style={styles.imgStyle} source={ImageAssets.icShare}/>
      </TouchableOpacity>
    </View>
    <View style={styles.button}>
    <Button
      title="Press me"
      onPress={() => sendCollection()} />
    </View>
    <View style={styles.horizontal}>
    <Button
      title="Start Session"
      onPress={() => startSession()} />
    <Button
      title="End Session"
      onPress={() => endSession()} />
    </View>
  </SafeAreaView>);

  function startSession(){
    //  Alert.alert('Start Session');
     new PatientSession().startSession()
     // initializeHcp();
  }

    function endSession(){
       new PatientSession().endSession()
    }


  function sendCollection(eventKey, eventValue) {
    event = {};
    if(commentText != null && commentText.length > 0){
      event[DocereeAds.CONSTANT.eventComment] = commentText;
    }
    if(eventKey !== null && eventKey !== undefined && eventValue !== null && eventValue !== undefined)
      event[eventKey] = eventValue;

    DocereeAds.Data.CollectDataStatus = true;
    docereeAds = new DocereeAds();
    docereeAds.sendData(
      new Array(1).fill(rxtext),
      new Array(1).fill(dxtext),
      new Array(1).fill(commentText),
      event);
  }

  function initializeHcp(){
    var hcpBuilder = new HcpBuilder();
    hcpBuilder.setHcpId("54321");
    hcpBuilder.setHashedHcpId(getHashedString("5432112"));
    hcpBuilder.setFirstName("John");
    hcpBuilder.setLastName("Doe");
    hcpBuilder.setEmail("doceree@yopmail.com");
    hcpBuilder.setSpecialization("Anesthesiology"); // Anesthesiology //Psychiatry
    hcpBuilder.setOrganisation("XYZ-organisation");
    hcpBuilder.setCity("New Delhi");
    hcpBuilder.setState("Delhi");
    hcpBuilder.setCountry("INDIA");
    hcpBuilder.setZipCode("110024");
    hcpBuilder.setGender("Male");
    hcpBuilder.setHashedEmail(getHashedString("doceree@yopmail.com"));
    var hcp = hcpBuilder.build();
    console.log("HCP : ", JSON.stringify(hcp));
  }

  function getHashedString(str: String): String{
    return str;
  }

}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 12
  },
  imgStyle: {
    height: 20,
    width: 20,
    margin: 12
  },
  horizontal: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    margin: 6
  }
});