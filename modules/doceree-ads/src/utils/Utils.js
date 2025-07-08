import { Buffer } from 'buffer';
import { getAppInfo } from '../utils/AppInfo.js'

class Utils {
    constructor() {
        // Constructor function
    }
    encodeBase64(str) {
      // Check if the input is a string
      if (typeof str !== 'string') {
        throw new TypeError('The input must be a string.');
      }
    
      // Convert the string to a Buffer
      const buffer = Buffer.from(str, 'utf-8');
    
      // Encode the Buffer as base64
      const encodedString = buffer.toString('base64');
    
      return encodedString;
    }

    async sessionId() {
      const appInfo = await (await getAppInfo()).bundleId
      appInfo.bundleId
      let sessionId = "";
      const seed = "DE";
      const version = "V1";
      let uid = "";
      let num1 = 0;
      const random = Math.random();
      let dateAbs = 0;
      const time = Date.now();
      try {
        const hashGen = (s) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)).toString(), '');
        try {
          dateAbs = Math.abs(new Date((Math.floor(Math.random() * 999) * 99)).getTime());
          num1 = Math.abs(parseInt(hashGen(await (await getAppInfo()).bundleId)));
          console.log('sessionId', 'num1 1 :', num1);
        } catch (e) {
          console.log('sessionId', 'Error generating UUID 1 :', e);
        }
        const str = (dateAbs + Date.now()).toString();
        const num2 = str.split("").reverse().join('').substring(0, 5);
        const num3 = Math.floor(Math.random() * 99999) * 99;
        uid = ((num1 + parseInt(num2) + num3) + num3).toString();
        console.log('sessionId', 'Generated UID :', uid);
        sessionId = `${seed}.${version}.${uid}.${time}`;
        console.log('sessionId', 'sessionId :', sessionId);
      } catch (e) {
        console.log('sessionId', 'Error generating UUID :', e);
      }
      return sessionId;
    };
    
}
export default Utils;