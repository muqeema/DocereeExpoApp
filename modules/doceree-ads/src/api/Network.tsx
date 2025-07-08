// import RNAdvertisingId from 'react-native-advertising-id';
import Header from './Header.js';
import { getAppKey } from '../utils/AppInfo.js'
import { PatientSession } from '../PatientSession.js';
import LibNetwork from './LibNetwork';

export const callImpressionUrl =  (url: String) => {
  // console.log('get callImpressionUrl Request ', url);
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
          console.log('impressionApi successfull');
      }
    })
    .then(data => {
      // console.log('Response Data:', data);
      // Process the retrieved data here
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation: ', error);
    });
}

export const callViewability =  (url: String) => {
  // console.log('get callViewability Request ', url);
  fetch(url)
  .then(response => {
    // console.log("Viewability response: ", response);
  })
  .catch(error => {
    console.error("Viewability Error: ", error);
  });
}

export const getAdvertisement = async (hcp: HCP, adUnit: String) => {
  // console.log('get getAdvertisement Request HCP : ', hcp);
  // console.log("Advertisement Patient : ", patient);
  var url = LibNetwork.getBaseUrl() + LibNetwork.adRequestPath;
  // "https://qa-ad-test.doceree.com/drs/quest";
  console.log("Ad URL : ", url);
  const header = new Header();
  var headerJson = {};
  try {
    headerJson = await header.getHeaders();
    console.log('fetching data:', headerJson);
  } catch (error) {
    console.error('Error fetching data:', error);
    headerJson = {};
    throw error;
  }


  var param = {
  "cdt": "TestCDT",
  "br": await new PatientSession().getBr(),
  "adunit": adUnit,
  "privacyConsent": 1,
  "userid": headerJson["doceree-device-id"],
  "appkey": getAppKey()
 };

  if(hcp && hcp.hcpId !== undefined){
    param["hcpid"] = hcp.hcpId
    param["email"] = hcp.email
    param["firstname"] = hcp.firstName
    param["lastname"] = hcp.lastName
    param["gender"] = hcp.gender
    param["zipcode"] = hcp.zipCode
    param["city"] = hcp.city
    param["state"] = hcp.state
    param["hashedhcpid"] = hcp.hashedHcpId
    param["specialization"] = hcp.specialization
  }
  console.log('param :', param);
  // console.log('getApplicationKey :', getAppKey());

  return fetch(url, {
    method: 'POST',
    headers: headerJson,
    body: JSON.stringify(param),
  })
  .then(response => response.json())
  .then(json => {
  // console.log("response: ", JSON.stringify(json));
    return JSON.stringify(json);
  } )
  .catch(error => {
    console.error(error);
  });

}
