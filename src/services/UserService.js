import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../main.jsx";

export default class UserService {
  constructor() {}

  async getUserWallets(email) {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return;

    return userDoc.data().wallets;
  }

  async getRefCode(email) {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return;

    return userDoc.data().refCode;
  }

  async updateFirstLogin(email) {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return;

    await updateDoc(doc(db, "users", email), {
      firstLogin: false,
    });
  }

  async isFirstUserLogin(email) {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return;

    return userDoc.data().firstLogin;
  }

  async subscribeOnWallets(email, callback) {
    const userRef = doc(db, "users", email);

    // Set up an onSnapshot listener
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const wallets = doc.data().wallets;
        callback(wallets); // Call the callback with updated wallet data
      } else {
        callback([]); // Handle the case where the document does not exist
      }
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
  }

  async addWalletToWatch(email, wallet) {
    await updateDoc(doc(db, "users", email), {
      wallets: arrayUnion(wallet),
    });
  }
}
