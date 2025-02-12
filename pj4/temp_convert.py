import tkinter as tk
from tkinter import messagebox

# Function to convert Celsius to Fahrenheit
def celsius_to_fahrenheit():
    try:
        celsius = float(entry_celsius.get())  # Get Celsius value from input field
        fahrenheit = (celsius * 9/5) + 32  # Convert to Fahrenheit
        entry_fahrenheit.delete(0, tk.END)  # Clear previous result
        entry_fahrenheit.insert(0, f"{fahrenheit:.2f}")  # Display result
    except ValueError:
        messagebox.showerror("Invalid Input", "Please enter a valid number for Celsius")

# Function to convert Fahrenheit to Celsius
def fahrenheit_to_celsius():
    try:
        fahrenheit = float(entry_fahrenheit.get())  # Get Fahrenheit value from input field
        celsius = (fahrenheit - 32) * 5/9  # Convert to Celsius
        entry_celsius.delete(0, tk.END)  # Clear previous result
        entry_celsius.insert(0, f"{celsius:.2f}")  # Display result
    except ValueError:
        messagebox.showerror("Invalid Input", "Please enter a valid number for Fahrenheit")

# Function to clear both input fields
def clear_entries():
    entry_celsius.delete(0, tk.END)
    entry_fahrenheit.delete(0, tk.END)

# Creating the main application window
root = tk.Tk()
root.title("Temperature Converter")
root.geometry("300x200")
root.resizable(False, False)

# Creating UI elements
label_celsius = tk.Label(root, text="Celsius:")
label_celsius.grid(row=0, column=0, padx=10, pady=10)

entry_celsius = tk.Entry(root)
entry_celsius.grid(row=0, column=1, padx=10, pady=10)

label_fahrenheit = tk.Label(root, text="Fahrenheit:")
label_fahrenheit.grid(row=1, column=0, padx=10, pady=10)

entry_fahrenheit = tk.Entry(root)
entry_fahrenheit.grid(row=1, column=1, padx=10, pady=10)

button_c_to_f = tk.Button(root, text="Convert to Fahrenheit", command=celsius_to_fahrenheit)
button_c_to_f.grid(row=2, column=0, columnspan=2, pady=5)

button_f_to_c = tk.Button(root, text="Convert to Celsius", command=fahrenheit_to_celsius)
button_f_to_c.grid(row=3, column=0, columnspan=2, pady=5)

button_clear = tk.Button(root, text="Clear", command=clear_entries)
button_clear.grid(row=4, column=0, columnspan=2, pady=5)

# Start the Tkinter event loop
root.mainloop()
