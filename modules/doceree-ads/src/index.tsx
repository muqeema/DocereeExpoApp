export { DataCollection } from './DataCollection';
export { DocereeAds } from './DocereeAds';
export { PatientBuilder } from './utils/builders/PatientBuilder.js'
export { PatientSession } from './PatientSession.js'
export { DocereeAdView } from './screens/DocereeAdView';
export { HcpBuilder } from '../src/models/HcpBuilder';

export function multiply(a: number, b: number): Promise<number> {
  console.log("Test pass");
  return Promise.resolve(a * b);
}
