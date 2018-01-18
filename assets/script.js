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

// The current time;
var now = moment();

$('#add-train').on('click', function() {
  // Don't refresh the page!
  event.preventDefault();

  retrieveData();

  $('#train-form')[0].reset();
});

$(document).keyup(function(event) {
  if (event.keyCode === 13) {
    $('#add-train').click()
  }
});

// Display data when value is changed
displayData();

// Update every minute for train times
// setInterval(function() {
//   window.location.reload();
// }, 60000);

function retrieveData() {

  trainName = $('#name-input').val().trim();
  destination = $('#dest-input').val().trim();

  frequency = $('#freq-input').val().trim();
  arrival = $('#time-input').val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    arrival: arrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });

}

function displayData() {

  database.ref().orderByChild('arrival').on('child_added', function(snapshot) {

    var trainData = snapshot.val();

    var newRow = $('<tr>');

    var newNameCol = $('<td>');
    newNameCol.append(trainData.trainName);

    var newDestCol = $('<td>');
    newDestCol.append(trainData.destination);

    var newFreqCol = $('<td>');
    newFreqCol.append(trainData.frequency);

    var newArrivalTimeCol = $('<td>');
    var arrivalTime = trainData.arrival;
    newArrivalTimeCol.append(arrivalTime);

    var newTimeRemainCol = $('<td>');
    arrivalTime = moment(arrivalTime, 'HH:mm');
    var timeRemain = arrivalTime.diff(now, 'minutes');
    newTimeRemainCol.append(timeRemain);

    newRow.append(newNameCol);
    newRow.append(newDestCol);
    newRow.append(newFreqCol);
    newRow.append(newArrivalTimeCol);
    newRow.append(newTimeRemainCol);

    $('#train-data').append(newRow);
  });
}
