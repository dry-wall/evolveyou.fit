// js/workouts.js
const db = firebase.firestore();
const workoutForm = document.getElementById('workout-form');
const workoutList = document.getElementById('workout-list');

workoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  if (user) {
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    db.collection('users').doc(user.uid).collection('workouts').add({
      exercise: exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      timestamp: Date.now()
    })
    .then(() => {
      console.log('Workout logged');
      displayWorkouts();
    })
    .catch((error) => console.error('Error logging workout:', error));
  }
});

function displayWorkouts() {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection('users').doc(user.uid).collection('workouts')
      .orderBy('timestamp', 'desc')
      .get()
      .then((querySnapshot) => {
        workoutList.innerHTML = '';
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const li = document.createElement('li');
          li.textContent = `${data.exercise}: ${data.sets} sets, ${data.reps} reps on ${new Date(data.timestamp).toLocaleString()}`;
          workoutList.appendChild(li);
        });
      });
  }
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) displayWorkouts();
  else window.location.href = 'index.html';
});