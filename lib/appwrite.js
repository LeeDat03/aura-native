import { Account, Client, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.leedat.aura",
  projectId: "6633b7f50013af2f16f3",
  databaseId: "6633b974002ff833609a",
  userCollectionId: "6633b99b003c016361bc",
  videoCollectionId: "6633b9be002d2702f8ff",
  storageId: "6633bb220026223de331",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
