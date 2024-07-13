function setReminder() {
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;
    
    if (time === '') {
        alert('Please choose a time.');
        return;
    }
    
    const reminderList = document.getElementById('reminderList');
    const reminderItem = document.createElement('li');
    reminderItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    reminderItem.innerHTML = `<span>${day} at ${time} - ${activity}</span><button onclick="deleteReminder(this)">X</button>`;
    reminderList.appendChild(reminderItem);
    
    const reminderTime = new Date();
    reminderTime.setHours(parseInt(time.split(':')[0]));
    reminderTime.setMinutes(parseInt(time.split(':')[1]));
    
    const now = new Date();
    let timeToReminder = reminderTime - now;
    if (timeToReminder < 0) {
        timeToReminder += 24 * 60 * 60 * 1000; // add 24 hours if reminder time is already passed for today
    }
    
    setTimeout(() => {
        document.getElementById('chime').play();
        alert(`Reminder: ${activity}`);
    }, timeToReminder);
}

function deleteReminder(button) {
    const reminderItem = button.parentNode;
    reminderItem.classList.add('removing');
    setTimeout(() => {
        reminderItem.parentNode.removeChild(reminderItem);
    }, 300);
}
