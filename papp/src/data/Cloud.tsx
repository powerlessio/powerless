// AWS provides the backend support by AWS cloud services
import Amplify, { API } from 'aws-amplify';
import awsmobile from '../aws-exports';

export interface INote {
  userId: string;
  noteId: string;
  noteTitle: string;
  noteContent: string;
}
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
  }

  /**
  * Save a note object for current user into backend
  */
  public async saveNote(note: INote) {
    let newNote = {
      body: {
        "noteTitle": "My first note!",
        "noteContent": "This is so cool!"
      }
    }
    const api = "Notes";
    const path = "/items";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.post(api, path, newNote)
      console.log("response from saving note: " + JSON.stringify(apiResponse));
      // this.setState({apiResponse});
    } catch (e) {
      console.log('error:' + e);
    }
  }


  /**
  * Get all notes for current user
  */
  public async getNotes() {
    const api = "Notes";
    const path = "/items";

    // fetch all notes of current user
    try {
      const response = await API.get(api, path);
      console.log('Response: '+JSON.stringify(response));
      return response;
    } catch(e) {
      console.log('Failed to fetch notes: ' + e);
      return "Failed to fetch notes.";
    }
  }
}
