import { Server } from '@/utils/config';
import { Account, Client as Appwrite, Databases } from 'appwrite';

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);

    const account = new Account(appwrite);
    const database = new Databases(appwrite, Server.database);

    api.sdk = { account, database };
    return appwrite;
  },

  getAccount: () => {
    return api.provider().account.createAnonymousSession();
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, 'unique()', data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(collectionId);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
