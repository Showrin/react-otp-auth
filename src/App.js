import { useState } from "react";
import "./App.css";
import firebase from "./config/firebase";
import highlightSyntax from "./lib/highlightSyntax";
import "./lib/highlightSyntax.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  const phoneNumberChangeHandler = (event) =>
    setPhoneNumber(event.target.value);

  const onVerifyButtonClickHandler = () => {
    let recaptcha;

    try {
      recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    } catch (error) {
      setError((preError) =>
        preError
          ? preError + "\n" + JSON.stringify(error, undefined, 4)
          : JSON.stringify(error, undefined, 4)
      );
    }

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptcha)
      .then((res) => {
        const otp = prompt("Enter the OTP");

        if (otp == null) return;

        res
          .confirm(otp)
          .then((result) => {
            setVerificationResult(result.user);
          })
          .catch((error) => {
            setError((preError) =>
              preError
                ? preError + "\n" + JSON.stringify(error, undefined, 4)
                : JSON.stringify(error, undefined, 4)
            );
          });
      })
      .catch((error) => {
        setError((preError) =>
          preError
            ? preError + "\n" + JSON.stringify(error, undefined, 4)
            : JSON.stringify(error, undefined, 4)
        );
      });
  };

  return (
    <div className="App">
      <h1 className="App-header"> React OTP auth app</h1>
      <label>
        <div className="input-label">
          {" "}
          Please, enter your phone number with country code (ex: +880)
        </div>
        <input
          className="input-field"
          value={phoneNumber}
          onChange={phoneNumberChangeHandler}
        />
      </label>
      <div id="recaptcha" className="recaptcha-field" />
      <button className="submit-button" onClick={onVerifyButtonClickHandler}>
        Verify Phone Number
      </button>
      <div className="verification-result">
        {error && (
          <pre className="error">
            <h2># Errors ----</h2>
            {error}
          </pre>
        )}
        <pre
          dangerouslySetInnerHTML={{
            __html: `<h2 class="result"># Result ----</h2>${highlightSyntax(
              JSON.stringify(verificationResult, undefined, 4)
            )}`,
          }}
        />
      </div>
    </div>
  );
}

export default App;
