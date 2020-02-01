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

// Get a reference to the database service
var database = firebase.database();
var userRef = database.ref("patients/");

var users = [];
//Get realtime data
database.ref("patients/").on("value", function(snapshot) {
  var tableRef = document.getElementById("patientTable");
  tableRef.innerHTML = "";

  // console.log(snapshot.val())
  if (!snapshot.val()) return;

  patients = Object.values(snapshot.val());
  var j = 0;
  for (key in snapshot.val()) {
    patients[j++].key = key;
  }
  console.log(patients);

  for (var i = 0; i < patients.length; i++) {
    tableRef.innerHTML += `
            <table class="ptTable">
            <tr>
                <th width=120>Name: </th>
                <td><b>${patients[i].name}</b></td>
            </tr>
            <tr>
                <th>Age: </th>
                <td>${patients[i].age}</td>
            </tr>
            <tr>
                <th>Gender: </th>
                <td>${patients[i].gender}</td>
            </tr>
            <tr>
                <th>Disease: </th>
                <td>${patients[i].disease}</td>
            </tr>
            <tr>
                <th>Medication: </th>
                <td>${patients[i].medication}</td>
            </tr>
            <tr>
                <th>Appt. Date: </th>
                <td>${patients[i].aptDate}</td>
            </tr>
            <tr>
                <th>Fee: </th>
                <td>${patients[i].charges}</td>
            </tr>
            <tr>
                <th>Contact Details: </th>
                <td>${patients[i].contact}</td>
            </tr>
            <tr>
                <td>
                </td>
                <td>
                <button onclick="getPatient('${patients[i].key}')" data-toggle="modal"
                data-target="#addPatient" class="btn btn-sm btn-warning">Edit Record</button>  
                <button onclick="deletePatient('${patients[i].key}')" data-toggle="modal" data-target="#delPt" class="btn btn-sm btn-danger">Delete Record</button>
                </td>
            </tr>
            </table>
            `;
  }
});

//Add Patient Function
function addPatient() {
// get form ref
  var patientRef = document.getElementById("patientForm");
// Get gender info
  var gender;
  var ele = document.getElementsByName("gender");
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) gender = ele[i].value;
  }
  // // Getting a unique key to push new record
  var newPatientKey = firebase
    .database()
    .ref()
    .child("patients")
    .push().key;
// Push Data in DB
  database.ref("patients/" + newPatientKey).set({
    name: patientRef.name.value,
    age: patientRef.age.value,
    gender: gender,
    disease: patientRef.disease.value,
    medication: patientRef.medication.value,
    aptDate: patientRef.aptDate.value,
    charges: patientRef.charges.value,
    contact: patientRef.contact.value
  });
// reset the from after push data in DB
  patientRef.name.value = "";
  patientRef.age.value = "";
  patientRef.disease.value = "";
  patientRef.medication.value = "";
  patientRef.aptDate.value = "";
  patientRef.charges.value = "";
  patientRef.contact.value = "";
  for (i = 0; i < patientRef.gender.length; i++) {
    if (patientRef.gender[i].checked) patientRef.gender[i].checked = false;
  }
}

//Get Patient Function
function getPatient(patientKey) {
  var name = document.getElementById("name");
  var age = document.getElementById("age");
  var gender;
  var disease = document.getElementById("disease");
  var medication = document.getElementById("medication");
  var aptDate = document.getElementById("aptDate");
  var charges = document.getElementById("charges");
  var contact = document.getElementById("contact");
// GET button Reffrence
  var sendPatientData = document.getElementById("sendPatient");
  var resetModel = document.getElementById("closeModal");
// Get the Data from DB
    database
    .ref("patients/" + patientKey + "/")
    .once("value", data => {
      dbData = data.val();
      name.value = dbData.name;
      age.value = dbData.age;
      if (dbData.gender === "Female") {
        gender = document.getElementById("female").checked = true;
      } else {
        gender = document.getElementById("male").checked = true;
      }
      disease.value = dbData.disease;
      medication.value = dbData.medication;
      aptDate.value = dbData.aptDate;
      charges.value = dbData.charges;
      contact.value = dbData.contact;
    });
// set function for Button
  sendPatientData.onclick = function() {
    updatePatient(
      patientKey,
      name,
      age,
      disease,
      medication,
      aptDate,
      charges,
      contact,
      sendPatientData
    );
  };
  // set function for Button
  resetModel.onclick = function() {
    reset(
      name,
      age,
      disease,
      medication,
      aptDate,
      charges,
      contact,
      sendPatientData
    );
  };
  sendPatientData.innerHTML = "Update Record";
}

//Update Patient Function
function updatePatient(patientKey,name,age,disease,medication,aptDate,charges,contact,sendPatientData) {

// check data for Gender  
  var gender;
  var ele = document.getElementsByName("gender");
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) gender = ele[i].value;
  }
// Update the Value in DB
  database.ref("patients/" + patientKey).update({
    name: name.value,
    age: age.value,
    gender: gender,
    disease: disease.value,
    medication: medication.value,
    aptDate: aptDate.value,
    charges: charges.value,
    contact: contact.value
  });
  //   Reset Input Value after update
  name.value = "";
  age.value = "";
  disease.value = "";
  medication.value = "";
  aptDate.value = "";
  charges.value = "";
  contact.value = "";
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) ele[i].checked = false;
  }
  //   Reset Button Name After work
  sendPatientData.innerHTML = "Add Record";
  sendPatientData.onclick = function() {addPatient()};
}

// Reset Modal
function reset(
name,
age,
disease,
medication,
aptDate,
charges,
contact,
sendPatientData
){
var ele = document.getElementsByName("gender");
for (i = 0; i < ele.length; i++) {
  if (ele[i].checked) ele[i].checked = false;
}
name.value = "";
age.value = "";
ele.value = "";
disease.value = "";
medication.value = "";
aptDate.value = "";
charges.value = "";
contact.value = "";
//   Reset Button Name After work
sendPatientData.innerHTML = "Add Record";
sendPatientData.onclick = function() {addPatient()};
}

//Delete Patient Function
function deletePatient(patientKey) {
  var delPt = document.getElementById('del');
  delPt.onclick = function(){
  database.ref("patients/" + patientKey).remove();
  }
}

// Search Patient Function

 function searchName() {
  // Declare variables
  var input, filter, div, table;
  input = document.getElementById('searchByName');
  filter = input.value.toUpperCase();
  div = document.getElementById("patientTable");
  table = div.getElementsByTagName('table');

  // Loop through all the tables, and hide those who don't match the search query
  for (i = 0; i < table.length; i++) {
 
    if (table[i].innerText.toUpperCase().indexOf(filter) > -1) {
      table[i].style.display = "";
    } else {
      table[i].style.display = "none";
    }
  }
}

function serachByDate() {
  // Declare variables
  var input, filter, div, table;
  input = document.getElementById('searchDate');
  filter = input.value.toUpperCase();
  div = document.getElementById("patientTable");
  table = div.getElementsByTagName('table');
  
  // Loop through all the tables and hide those who don't match the search query
  for (i = 0; i < table.length; i++) {
   
    if (table[i].innerText.toUpperCase().indexOf(filter) > -1) {
      table[i].style.display = "";
    } else {
      table[i].style.display = "none";
    }
  }
}
