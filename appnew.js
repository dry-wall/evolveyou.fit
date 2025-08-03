let workTime = 25 * 60;  // 25 minutes in seconds
let breakTime = 5 * 60;   // 5 minutes in seconds
let timeLeft = workTime;
let isWorkSession = true;
let timerInterval = null;
let sessionRecords = [];

const timerDisplay = document.getElementById('timer-display');
const quoteDisplay = document.getElementById('quote-display');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const sessionList = document.getElementById('session-list');

const db = firebase.firestore();

function logSession(type, duration, timestamp) {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection('users').doc(user.uid).collection('meditation').add({
      type: type, // 'work' or 'break'
      duration: duration,
      timestamp: timestamp
    })
    .then(() => console.log('Session logged to Firestore'))
    .catch((error) => console.error('Error logging session:', error));
  }
}

function displaySessions() {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection('users').doc(user.uid).collection('meditation')
      .orderBy('timestamp', 'desc')
      .get()
      .then((querySnapshot) => {
        const logList = document.getElementById('session-log'); // Add this element to meditate.html
        logList.innerHTML = '';
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const li = document.createElement('li');
          li.textContent = `${data.type} - ${data.duration} mins on ${new Date(data.timestamp).toLocaleString()}`;
          logList.appendChild(li);
        });
      });
  }
}

// List of inspiring quotes
const quotes = [
    "Believe in yourself and all that you are!",
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "You don't have to be great to start, but you have to start to be great.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Hard work beats talent when talent doesn’t work hard."
];

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = workTime;
    isWorkSession = true;
    updateDisplay(timeLeft);
    startButton.disabled = false;
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        logSession();
        displayRandomQuote();
        if (isWorkSession) {
            timeLeft = breakTime;
            isWorkSession = false;
            alert('Break time!');
        } else {
            timeLeft = workTime;
            isWorkSession = true;
            alert('Back to work!');
        }
    }
    updateDisplay(timeLeft);
}

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = `"${quotes[randomIndex]}"`;
}

function logSession() {
    const sessionType = isWorkSession ? "Work" : "Break";
    const currentTime = new Date().toLocaleTimeString();
    const sessionRecord = `${sessionType} session completed at ${currentTime}`;
    
    // Add to session list
    sessionRecords.push(sessionRecord);
    updateSessionList();
}

function updateSessionList() {
    sessionList.innerHTML = "";
    sessionRecords.forEach(record => {
        const li = document.createElement('li');
        li.textContent = record;
        sessionList.appendChild(li);
    });
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay(timeLeft);
