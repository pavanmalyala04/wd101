document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get values from form
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const terms = document.getElementById('terms').checked;

  // Perform age validation
  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    alert('Please enter a valid date of birth between the ages of 18 and 55.');
    return;
  }

  // Save data to local storage
  const userData = {
    name,
    email,
    password,
    dob,
    terms,
  };

  let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  users.push(userData);
  localStorage.setItem('registeredUsers', JSON.stringify(users));

  // Reset form fields
  document.getElementById('registrationForm').reset();

  // Display entered data in Entries block
  const userEntries = document.getElementById('userEntries');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${name}</td>
    <td>${email}</td>
    <td>${password}</td>
    <td>${dob}</td>
    <td>${terms ? 'Yes' : 'No'}</td>
  `;
  userEntries.appendChild(newRow);
});
