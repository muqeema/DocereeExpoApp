import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import { ImageAssets } from '../../assets';
import { DocereeAds, PatientSession } from 'react-native-doceree-ads';

export function DataCollection(): JSX.Element {
  const [rxtext, onRxChange] = React.useState('RxValue');
  const [dxtext, onDxChange] = React.useState('DxValue');
  const [commentText, onCommentChange] = React.useState('CommentText');

  function startSession() {
    new PatientSession().startSession();
  }

  function endSession() {
    new PatientSession().endSession();
  }

  function sendCollection(eventKey?: string, eventValue?: string) {
    const event: Record<string, string> = {};

    if (commentText) {
      event[DocereeAds.CONSTANT.eventComment] = commentText;
    }

    if (eventKey && eventValue) {
      event[eventKey] = eventValue;
    }

    DocereeAds.Data.CollectDataStatus = true;
    const docereeAds = new DocereeAds();
    docereeAds.sendData(
      [rxtext],
      [dxtext],
      [commentText],
      event
    );
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        value={rxtext}
        onChangeText={onRxChange}
        placeholder="Enter Rx"
      />

      <TextInput
        style={styles.input}
        value={dxtext}
        onChangeText={onDxChange}
        placeholder="Enter Dx"
      />

      <TextInput
        style={styles.input}
        value={commentText}
        onChangeText={onCommentChange}
        placeholder="Enter Comment"
      />

      <View style={styles.horizontal}>
        <TouchableOpacity onPress={() => sendCollection(DocereeAds.CONSTANT.eventLike, "click_star")}>
          <Image style={styles.imgStyle} source={ImageAssets.icStar} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendCollection(DocereeAds.CONSTANT.eventShare, "click_share")}>
          <Image style={styles.imgStyle} source={ImageAssets.icShare} />
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <Button title="Press me" onPress={() => sendCollection()} />
      </View>

      <View style={styles.horizontal}>
        <Button title="Start Session" onPress={startSession} />
        <Button title="End Session" onPress={endSession} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 12,
  },
  imgStyle: {
    height: 20,
    width: 20,
    margin: 12,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 6,
  },
});
