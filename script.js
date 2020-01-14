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
var userRef = database.ref("patients/")

var users = [];
//Get realtime data
database.ref("patients/").on('value', function (snapshot) {
    var tableRef = document.getElementById("patientTable");
    tableRef.innerHTML = "";

    // console.log(snapshot.val())
    if (!snapshot.val())
        return;

    patients = Object.values(snapshot.val());
    var j = 0;
    for (key in snapshot.val()) {
        patients[j++].key = key
    }
    console.log(patients);

    for (var i = 0; i < patients.length; i++) {
        tableRef.innerHTML += `
            <table class="ptTable">
            <tr>
                <th width=120>Name: </th>
                <td>${patients[i].name}</td>
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
                <button onclick="deletePatient('${patients[i].key}')" class="btn btn-sm btn-danger">Delete Record</button>
                </td>
            </tr>
            </table>
            `
    }
});

//Add Patient Function
function addPatient() {
    var patientRef = document.getElementById('patientForm');
    var gender;
    var ele = document.getElementsByName('gender'); 
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
                gender = ele[i].value; 
            } 

    // Getting a unique key to push new record
    var newPatientKey = firebase.database().ref().child('patients').push().key;

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
}

//Get Patient Function
function getPatient(patientKey) {
  var name = document.getElementById("name");
  var age = document.getElementById("age");
  var gender;
    var ele = document.getElementsByName('gender'); 
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
                gender = ele[i].value; 
            }
  var disease = document.getElementById("disease");
  var medication = document.getElementById("medication");
  var aptDate = document.getElementById("aptDate");
  var charges = document.getElementById("charges");
  var contact = document.getElementById("contact");
  
  var sendPatientData = document.getElementById("sendPatient");
  let editData = database.ref("patients/" + patientKey + "/").once("value", data => {
    dbData = data.val();
    name.value = dbData.name;
    age.value = dbData.age;
    gender.value = dbData.gender;
    disease.value = dbData.disease;
    medication.value = dbData.medication;
    aptDate.value = dbData.aptDate;
    charges.value = dbData.charges;
    contact.value = dbData.contact;
    
  });
  let key = patientKey;
  sendPatientData.onclick = function() {
    updatePatient(patientKey, name, age, gender, disease, medication, aptDate, charges, contact);
  };
  sendPtaientData.innerHTML = "Update Record";
}

//Update Patient Function
  function updatePatient(patientKey, name, age, gender, disease, medication, aptDate, charges, contact) {
    var sendPatientData = document.getElementById("sendPatient");
    var gender;
    var ele = document.getElementsByName('gender'); 
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
                gender = ele[i].value; 
            }

  database.ref("patients/" + patientKey).update({
    name: name.value,
    age: age.value,
    gender: gender.value,
    disease: disease.value,
    medication: medication.value,
    aptDate: aptDate.value,
    charges: charges.value,
    contact: contact.value
  });
  name.value = "";
  age.value = "";
  gender.value = "";
  disease.value = "";
  medication.value = "";
  aptDate.value = "";
  charges.value = "";
  contact.value = "";
  
  sendPatientData.innerHTML = "Add Record";
}

//Delete Patient Function
function deletePatient(patientKey) {
    database.ref("patients/" + patientKey).remove()
}