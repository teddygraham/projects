import random
import string

def generate_random_password(length=8):
    """Generate a random password of given length with letters and digits."""
    chars = string.ascii_letters + string.digits
    # If you want to include punctuation, you could add string.punctuation as well:
    # chars = string.ascii_letters + string.digits + string.punctuation
    
    # Use random.choices to pick `length` characters from `chars`
    password_list = random.choices(chars, k=length)
    
    # Join them into a single string
    password = ''.join(password_list)
    
    return password

def main():
    # Ask user for input
    length_str = input("Enter the desired password length: ")
    
    # Convert to integer
    # (Add error handling if you want to catch non-integer inputs)
    length = int(length_str)
    
    # Generate the password
    new_password = generate_random_password(length)
    
    # Print the result
    print(f"Your new password is: {new_password}")

if __name__ == "__main__":
    main()

