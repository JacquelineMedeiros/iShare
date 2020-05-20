import * as firebase from "firebase";
import firebaseConfig from "./config";
require("firebase/firestore");

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  createUser = async (user) => {
    try {
      /*firebase authentication methods with email and passwords 
      parameters user.email and user.password are on class SignUp - method handleSignUp*/
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      //initialize db to firebase collection of users and document of user id (uid)
      let db = this.firestore.collection("users").doc(this.uid);

      //firebase set method - used to add data to a collection specifying a identifier, in this case the user id (uid)
      //here we are adding fullName and email
      db.set({
        fullName: user.fullName,
        email: user.email,
      });
      //catch error and throw alert
    } catch (error) {
      alert("Error: ", error);
    }
  };

  //uploadPhoto async function (takes an uri and filename)
  uploadPhoto = (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      //declare path to firebase storage
      let upload = firebase.storage().ref(filename).put(file);

      //uoload the file
      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          //download url 
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  //async function that adds an item to the inventory collection
  addToInventory = async ({ itemName, expireDate }) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("inventory")
        .add({
          itemName,
          expireDate,
          uid: this.uid,
          timestamp: this.timestamp,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  //add new post async / await function
  addPost = async ({ title, description, expireDate, localUri }) => {
    //create const remoteURI and upload the image to folder photos in the firebase storage using the user id as id
    const remoteUri = await this.uploadPhoto(
      localUri,
      `photos/${this.uid}/${Date.now()}`
    );

    //connects to the collection post on firestore and add the fields 
    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          title,
          description,
          expireDate,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  //function to get user info
  getUserInfo() {
    //sets userRef as collection users in firebase and searchers the for the user id of the current user
    let userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      //then if doc doesn't exist prints it doesn't exist
      //otherwise gets the doc if it exists and return the full name of the user and set the new state. i
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let fullName = doc.data().fullName;
          this.setState({ fullName });
          console.log(fullName);
        }
      })
      //catch error if error occurs and print in the console
      .catch((err) => {
        console.log("Error getting document", err);
      });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }

  
  get firestore() {
    return firebase.firestore();
  }
}

//creates a shared instance Fire
Fire.shared = new Fire();
//export the class so others can use it
export default Fire;
