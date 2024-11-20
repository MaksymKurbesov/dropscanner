import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../main.jsx";
import { generateCode } from "../helpers/helpers.js";

export default class AuthService {
  constructor() {}

  async registerWithEmailAndPassword(email, password) {
    const trimmedEmail = email.trim();

    try {
      await createUserWithEmailAndPassword(auth, trimmedEmail, password);

      await setDoc(doc(db, "users", email), {
        email: trimmedEmail,
        refCode: generateCode(),
        firstTime: true,
        wallets: [],
      });
    } catch (err) {
      console.error(err);



      if (err.code === "auth/email-already-in-use") {
	      throw new Error(`Sorry, but this email address is already taken.`);
      }

      if (err.code === "auth/invalid-email") {
	      throw new Error(`You have entered an incorrect email address.`);
      }

      if (err.code === "auth/weak-password") {
	      throw new Error(`You have specified a password that is too light.`);
      }

      if (
        err.code === "auth/operation-not-allowed" ||
        err.code === "auth/invalid-argument"
      ) {
	      throw new Error(`You have entered the wrong data. Try again.`);
      }

      return err.code;
    }
  }

  async logInWithEmailAndPassword(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err.code);

      const invalidCredential =
        err.code === "auth/invalid-credential" ||
        err.code === "auth/invalid-email";

      if (invalidCredential) {
        throw new Error(`Invalid email address or password`);
        // return `Неверный email адрес или пароль`;
      }

      if (err.code === "auth/wrong-password")
        throw new Error(`Invalid email address or password`);
        // return `Неверный email адрес или пароль`;
      if (err.code === "auth/user-not-found")
        throw new Error(`This user does not exist`);
        // return `Такого пользователя не существует`;
      if (err.code === "auth/too-many-requests")
        throw new Error(`Requests are too frequent. Wait approximately 5 minutes.`);
    }
  }

  logout() {
    signOut(auth);
  }
}
