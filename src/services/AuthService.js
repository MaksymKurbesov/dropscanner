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
        return `Извините, но этот email адрес уже занят. Пожалуйста, выберите другой email адрес для вашей учетной записи.`;
      }

      if (err.code === "auth/invalid-email") {
        return `Вы указали неверный email адрес.`;
      }

      if (err.code === "auth/weak-password") {
        return `Вы указали слишком легкий пароль.`;
      }

      if (
        err.code === "auth/operation-not-allowed" ||
        err.code === "auth/invalid-argument"
      ) {
        return `Вы указали неверные данные. Попробуйте снова.`;
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
        throw new Error(`Неверный email адрес или пароль`);
        // return `Неверный email адрес или пароль`;
      }

      if (err.code === "auth/wrong-password")
        // throw new Error(`Неверный email адрес или пароль`);
        return `Неверный email адрес или пароль`;
      if (err.code === "auth/user-not-found")
        // throw new Error(`Такого пользователя не существует`);
        return `Такого пользователя не существует`;
      if (err.code === "auth/too-many-requests")
        // throw new Error(`Слишком частые запросы. Подождите примерно 5 минут.`);
        return `Слишком частые запросы. Подождите примерно 5 минут.`;

      // alert(err.code);
    }
  }

  logout() {
    signOut(auth);
  }
}
