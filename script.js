// script.js
const auth = firebase.auth();
const database = firebase.database();

const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login');
const signupButton = document.getElementById('signup');
const signOutButton = document.getElementById('sign-out');
const scheduleMeetingButton = document.getElementById('schedule-meeting');
const meetingsList = document.getElementById('meetings');

auth.onAuthStateChanged(user => {
  if (user) {
    loginForm.style.display = 'none';
    dashboard.style.display = 'block';
    loadMeetings(user.uid);
  } else {
    loginForm.style.display = 'block';
    dashboard.style.display = 'none';
  }
});

loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => console.error('Erro ao entrar:', error));
});

signupButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.createUserWithEmailAndPassword(email, password)
    .catch(error => console.error('Erro ao registrar-se:', error));
});

signOutButton.addEventListener('click', () => {
  auth.signOut();
});

scheduleMeetingButton.addEventListener('click', () => {
  const user = auth.currentUser;
  const title = document.getElementById('meeting-title').value;
  const time = document.getElementById('meeting-time').value;
  const participantEmail = document.getElementById('meeting-email').value;
  if (user && title && time && participantEmail) {
    const meetingData = {
      title,
      time,
      participantEmail,
      userId: user.uid
    };
    const newMeetingKey = database.ref().child('meetings').push().key;
    const updates = {};
    updates['/meetings/' + newMeetingKey] = meetingData;
    updates['/user-meetings/' + user.uid + '/' + newMeetingKey] = meetingData;
    database.ref().update(updates);
    sendEmail(participantEmail, title, time);
    loadMeetings(user.uid);
  }
});

function loadMeetings(userId) {
  const userMeetingsRef = database.ref('/user-meetings/' + userId);
  userMeetingsRef.once('value', snapshot => {
    meetingsList.innerHTML = '';
    snapshot.forEach(childSnapshot => {
      const meeting = childSnapshot.val();
      const li = document.createElement('li');
      li.textContent = `${meeting.title} em ${new Date(meeting.time).toLocaleString()} para ${meeting.participantEmail}`;
      meetingsList.appendChild(li);
    });
  });
}

function sendEmail(to, title, time) {
  // Placeholder function to simulate sending an email
  alert(`Enviando email para ${to} sobre a reunião "${title}" agendada para ${new Date(time).toLocaleString()}`);
}
