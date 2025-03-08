// Example JavaScript to toggle online status (this can be fetched from a server or API)
const statusElement = document.querySelector('.status');
const currentStatus = 'Online'; // Replace with dynamic data if needed

statusElement.textContent = currentStatus;
statusElement.style.color = currentStatus === 'Online' ? 'green' : 'red';
