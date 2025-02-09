import { FirebaseConfig } from "../config";
import { ApiClient } from "./apiClient";

/**
 * Manual configuration firebase
 * ===============================
 * const firebase = new FirebaseConfig({
 *  projectId: 'ebuddy-test',
 *  clientEmail: 'ebuddy-test@gserviceaccount.com',
 *  privateKey: 'PRIVATE KEY',
 * });
 * firebase.init();
 * 
 * Instance configuration firebase
 * ===============================
 * FirebaseConfig.instance.init();
 */
FirebaseConfig.instance.init();

ApiClient.instance.init();
