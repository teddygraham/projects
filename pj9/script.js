function calculateTip(tipPercentage) {
    let billAmount = parseFloat(document.getElementById("billAmount").value);
    
    if (isNaN(billAmount) || billAmount <= 0) {
        alert("Please enter a valid bill amount");
        return;
    }

    let tipAmount = billAmount * tipPercentage;
    let totalAmount = billAmount + tipAmount;

    document.getElementById("tipResult").innerText = `Tip: $${tipAmount.toFixed(2)}`;
    document.getElementById("totalBill").innerText = `Total Bill: $${totalAmount.toFixed(2)}`;
}

