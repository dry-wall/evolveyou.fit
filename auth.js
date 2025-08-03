const auth = firebase.auth();
const authForm = document.getElementById('auth-form');
const authButton = document.getElementById('auth-button');
const toggleAuthButton = document.getElementById('toggle-auth');
const authTitle = document.getElementById('auth-title');
const authError = document.getElementById('auth-error');
let isLogin = true;

toggleAuthButton.addEventListener('click', () => {
  isLogin = !isLogin;
  authTitle.textContent = isLogin ? 'Login' : 'Sign Up';
  authButton.textContent = isLogin ? 'Login' : 'Sign Up';
});

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (isLogin) {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Logged in:', userCredential.user);
        window.location.href = 'dashboard.html'; 
      })
      .catch((error) => {
        authError.textContent = error.message;
      });
  } else {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Signed up:', userCredential.user);
        window.location.href = 'dashboard.html'; 
      })
      .catch((error) => {
        authError.textContent = error.message;
      });
  }
});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('No user is signed in.');
  }
});