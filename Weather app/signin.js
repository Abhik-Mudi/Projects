import { initializeApp } from "firebase.app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase.auth";


const firebaseConfig = {
  
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); 

  const signInButton = document.getElementById("signin");
  const logoutButton = document.getElementById("logout");
  const submit = document.getElementById("submit");
  const searchButton = document.getElementById("search-btn"); 
 
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user.email);
      signInButton.style.display = "none";
      logoutButton.style.display = "block";
      searchButton.disabled=false;
    } else {
      console.log("No user logged in.");
      signInButton.style.display = "block";
      logoutButton.style.display = "none";
      searchButton.disabled=true;

    }
  });

  
  if (submit) {
    submit.addEventListener("click", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Login Successful");
          console.log("Logged in:", userCredential.user.email);
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  } else {
    console.error("Submit button not found!");
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      console.log("Logout button clicked"); 
      signOut(auth)
        .then(() => {
          alert("Logged out successfully!");
          console.log("User logged out");
          window.location.href = "signin.html"; 
        })
        .catch((error) => {
          console.error("Logout error:", error.message);
          alert(error.message);
        });
    });
  } else {
    console.error("Logout button not found!");
  }

})

