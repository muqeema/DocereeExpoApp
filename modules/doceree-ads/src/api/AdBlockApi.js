import AdBlock from './AdBlockModel';
import Header from '../api/Header.js';
import LibNetwork from './LibNetwork'

export const AdBlockApi = async (adBlockLevel = "", adUnitId = "") => {

    let adBlock;
    try{
        // Your code
        adBlock = new AdBlock("", adBlockLevel, "", adUnitId);
    }
    catch(err){
       // handle rejection
       console.error(err);
    }
    console.log("adBlock: ", adBlock);

    const header = new Header();
    var headerJson = {};
    try {
      headerJson = await header.getHeaders();
      console.log('fetching data:', headerJson);
    } catch (error) {
      console.error('PatientSessionApi Error fetching header:', error);
      headerJson = {};
      throw error;
    }

    const url = `${LibNetwork.getBaseUrl()}${LibNetwork.saveAdBlockInfoPath}`;
    console.log("url:", url);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headerJson,
            body: JSON.stringify(adBlock),
        });
        if (!response.ok) {
            console.log("adblock response: ",response);
            throw new Error('Network response was not ok');
        } else {
            console.log("adblock response: ",response);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
