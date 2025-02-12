// Set the target launch date
const launchDate = new Date("March 1, 2025 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    if (timeLeft < 0) {
        document.getElementById("countdown").innerHTML = "We're Live!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Call immediately to prevent delay

