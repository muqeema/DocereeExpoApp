
enum ENVIRONMENT {QA, DEV, PRODUCTION};
const mode = ENVIRONMENT.QA;

class LibNetwork {
    static adRequestPath = "/drs/quest";
    static dataCollectionPath = "/curator";
    static patientSessionPath = "/drs/nEvent";
    static saveAdBlockInfoPath= "/drs/saveAdBlockInfo";

    static getBaseUrl() {
        if(mode == ENVIRONMENT.QA){
          return "https://qa-ad-test.doceree.com";
        }else  if(mode == ENVIRONMENT.DEV){
           return "https://dev-bidder.doceree.com";
        }
        return "https://dai.doceree.com";
    }


    static getIdentityUrl() {
        if (mode == ENVIRONMENT.QA) {
            return "https://qa-identity.doceree.com/dop";
        } else if (mode == ENVIRONMENT.DEV) {
            return "https://qa-identity.doceree.com/dop";
        }
        return "https://dai.doceree.com/dop";
    }

}

export default LibNetwork;
