// Initialize Firebase
var config = {
  apiKey: "AIzaSyCLlSq3BeYxSc5jZs8lXCw67HVsK1Eb0FA",
  authDomain: "train-schedule-32d23.firebaseapp.com",
  databaseURL: "https://train-schedule-32d23.firebaseio.com",
  projectId: "train-schedule-32d23",
  storageBucket: "train-schedule-32d23.appspot.com",
  messagingSenderId: "548165680424"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

var trainName = '';
var destination = '';
var frequency = '';
var arrivalTime = '';

$('#add-train').on('click', function() {
  // Don't refresh the page!
  event.preventDefault();

  trainName = $('#name-input').val().trim();
  destination = $('#dest-input').val().trim();
  frequency = $('#freq-input').val().trim();
  arrivalTime = $('#time-input').val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    arrivalTime: arrivalTime
  });

  database.ref().on("child_added", function(snapshot) {

    var newRow = $('<tr>');

    var newNameCol = $('<td>');
    newNameCol.append(snapshot.val().trainName);

    var newDestCol = $('<td>');
    newDestCol.append(snapshot.val().destination);

    var newFreqCol = $('<td>');
    newFreqCol.append(snapshot.val().frequency);

    var newArrivalTimeCol = $('<td>');
    newArrivalTimeCol.append(snapshot.val().arrivalTime);

    var newTimeRemainCol = $('<td>')
    newTimeRemainCol.append('N/A');

    newRow.append(newNameCol);
    newRow.append(newDestCol);
    newRow.append(newFreqCol);
    newRow.append(newArrivalTimeCol);
    newRow.append(newTimeRemainCol);

    $('#train-data').append(newRow);
    
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
});
