import fs from "fs";
import path from "path";
import firebaseAdmin, { ServiceAccount } from "firebase-admin";

export type FirebaseConfigCert = {
  [key: string]: any;
}

export class FirebaseConfig {
  private static _instance: FirebaseConfig;
  public static get instance() {
    if (!FirebaseConfig._instance) {
      FirebaseConfig._instance = new FirebaseConfig();
    }
    return FirebaseConfig._instance;
  }

  private isReadyResolve: any;
  public isReady = new Promise((resolve) => {
    this.isReadyResolve = resolve;
  });

  public options: FirebaseConfigCert;
  public db: any;

  constructor(overrideOptions?: any) {
    this.options = Object.assign({
      projectId: 'ebuddy-test',
      clientEmail: 'ebuddy-test@gserviceaccount.com',
      privateKey: '=== PRIVATE KEY ===',
    }, overrideOptions || {});

    const pathServiceAccountKey = path.join(__dirname, './serviceAccountKey.json');
    if (fs.existsSync(pathServiceAccountKey)) {
      const serviceAccountRawData = fs.readFileSync(pathServiceAccountKey, "utf8");
      const serviceAccountJsonData = JSON.parse(serviceAccountRawData);
      this.options = Object.assign(this.options, {
        projectId: serviceAccountJsonData.project_id,
        clientEmail: serviceAccountJsonData.client_email,
        privateKey: serviceAccountJsonData.private_key,
      })
    }

    this.initAdmin(this.options).then(() => {
      this.db = firebaseAdmin.firestore();
    });

    this.isReadyResolve();
  }

  public async init() {
    console.debug("Firebase Config init");
    await this.isReady;
    console.debug("Firebase Config ready");
  }

  public async initAdmin(serviceAccountPathOrObject: string | ServiceAccount) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccountPathOrObject),
    });
  }
}
