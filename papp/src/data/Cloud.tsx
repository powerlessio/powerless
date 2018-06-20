// AWS provides the backend support by AWS cloud services
import Amplify, { API } from 'aws-amplify';
import awsmobile from '../aws-exports';

import { AWS } from 'aws-sdk';

// initialize the dynamodb client to use
export class CloudStore {
  // singleton object
  private static store: CloudStore;
  public static getStore() {
    if(!CloudStore.store) {
      CloudStore.store = new CloudStore();
    }

    return CloudStore.store;
  }

  constructor() {
    console.log('init a cloud store...');
    // connect with AWS services
    Amplify.configure(awsmobile);

    // this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    // this.notesTable = `${process.env.MOBILE_HUB_DYNAMIC_PREFIX}-notes`;
    // console.log('notes table: ' + this.notesTable);
  }

  public async saveNote() {
    let newNote = {
      body: {
        "id": 0,
        "title": "My first note!",
        "content": "This is so cool!"
      }
    }
    const path = "/addnote";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put("NotesCrud", path, newNote)
      console.log("response from saving note: " + JSON.stringify(apiResponse));
      // this.setState({apiResponse});
    } catch (e) {
      console.log('error:' + e);
    }
  }
}
