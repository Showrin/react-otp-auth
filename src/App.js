import "./App.css";
import firebase from "./config/firebase";

function App() {
  const handleOnClick = () => {
    const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    const number = "+8801521328875";

    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((res) => {
        const otp = prompt("Enter the OTP");

        if (otp == null) return;

        res
          .confirm(otp)
          .then((result) => {
            console.log(result.user, "User");
            document.querySelector("label").textContent =
              result.user.phoneNumber + " is verified.";
          })
          .catch((error) => {
            console.log("Maraaaa");
          });
      });
  };

  return (
    <div className="App">
      <h1 className="App-header"> React OTP auth app</h1>
      <label>Verifyinggggg</label>
      <div id="recaptcha" />
      <button onClick={handleOnClick}>Verify Phone Number</button>
    </div>
  );
}

export default App;
