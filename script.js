// Get elements from the DOM
const progressDisplay = document.getElementById('progress');
const incrementButton = document.getElementById('increment');
const resetButton = document.getElementById('reset');
const warningMessage = document.getElementById('warning');

// Initialize the progress from local storage
let progress = parseInt(localStorage.getItem('progress')) || 0;

// Function to show a warning message
function showWarning(message) {
  warningMessage.textContent = message;
  warningMessage.style.display = 'block'; // Show the warning message
  setTimeout(() => {
    warningMessage.style.display = 'none'; // Hide the warning message after 3 seconds
  }, 3000);
}

// Function to check if the +1 button can be activated
function canActivatePlusOne() {
  // Get the current date and time
  const now = new Date();
  const currentTimestamp = now.getTime();

  // Get the last activated date from local storage
  const lastActivatedDate = parseInt(localStorage.getItem('lastActivatedDate')) || 0;

  // Check if the last activation was on a different day
  const lastActivated = new Date(lastActivatedDate);
  const isSameDay = now.toDateString() === lastActivated.toDateString();

  return !isSameDay;
}

// Event listener for incrementing the progress
incrementButton.addEventListener('click', () => {
  if (canActivatePlusOne()) {
    // Get the current timestamp
    const currentTimestamp = Date.now();

    progress++;
    progressDisplay.textContent = progress;

    // Save the updated progress to local storage
    localStorage.setItem('progress', progress.toString());

    // Save the last activated date
    localStorage.setItem('lastActivatedDate', currentTimestamp.toString());

    // Show a success message
    showWarning('Good job! Progress updated.');
  } else {
    // Show the warning message
    showWarning('Oops! You can only increment once per day. Try again tomorrow.');
  }
});

// Event listener for resetting the progress and clearing all data
resetButton.addEventListener('click', () => {
  // Reset the progress to 0
  progress = 0;
  progressDisplay.textContent = progress;

  // Clear the progress and lastActivatedDate from local storage
  localStorage.removeItem('progress');
  localStorage.removeItem('lastActivatedDate');

  // Show a success message
  showWarning('All set! Progress and data reset.');
});

// Initialize the UI with the initial progress
progressDisplay.textContent = progress;
