// Select the button
const button = document.getElementById("colorBtn");

// Function to generate a random color
function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event listener to change background color on button click
button.addEventListener("click", function() {
    document.body.style.backgroundColor = getRandomColor();
});

