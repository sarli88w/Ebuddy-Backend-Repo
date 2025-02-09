import { FirebaseConfig } from "../config";
import { ApiClient } from "./apiClient";
import { Routes } from "../routes";

/**
 * Manual configuration firebase
 * ===============================
 * new FirebaseConfig({
 *  projectId: 'ebuddy-test',
 *  clientEmail: 'ebuddy-test@gserviceaccount.com',
 *  privateKey: 'PRIVATE KEY',
 * }).init();
 * 
 * Instance configuration firebase
 * ===============================
 * FirebaseConfig.instance.init();
 */
FirebaseConfig.instance.init();

new ApiClient({ routes: Routes }).init();
