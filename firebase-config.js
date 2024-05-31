<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBrpPX5-annrrWYDlhElbXesYXbPZnygWI",
    authDomain: "pandora-7ee8f.firebaseapp.com",
    projectId: "pandora-7ee8f",
    storageBucket: "pandora-7ee8f.appspot.com",
    messagingSenderId: "672020386424",
    appId: "1:672020386424:web:42fb910797206a598b538d",
    measurementId: "G-8S7GGGVZJ6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>