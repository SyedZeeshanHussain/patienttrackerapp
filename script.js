 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyC9DvNlVxvB72lHe36gUWv2K-TNuE0dAcM",
  authDomain: "patient-tracker-1350c.firebaseapp.com",
  databaseURL: "https://patient-tracker-1350c.firebaseio.com",
  projectId: "patient-tracker-1350c",
  storageBucket: "patient-tracker-1350c.appspot.com",
  messagingSenderId: "35405842865",
  appId: "1:35405842865:web:da025a8de956dab7d79590"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('patients');

// Listen for form submit
document.getElementById('patientForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var age = getInputVal('age');
  var male = getInputVal('male');
  var female = getInputVal('female');
  var disease = getInputVal('disease');
  var medication = getInputVal('medication');
  var aptDate = getInputVal('aptDate');
  var charges = getInputVal('charges');
  var contact = getInputVal('contact');

  // Save message
  saveMessage(name, age, male, female, disease, medication, aptDate, charges, contact);

    // Clear form
  document.getElementById('patientForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, age, male, female, disease, medication, aptDate, charges, contact){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    age:age,
    male:male,
    female:female,
    disease:disease,
    medication:medication,
    aptDate:aptDate,
    charges:charges,
    contact:contact,
  });
}