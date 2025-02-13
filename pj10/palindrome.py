def is_palindrome(s):
    """Check if a given string is a palindrome."""
    s = s.lower().replace(" ", "")  # Normalize: lowercase & remove spaces
    return s == s[::-1]  # Compare string with its reverse

# Example usage:
test_string = input("Enter a word or phrase: ")
if is_palindrome(test_string):
    print("It's a palindrome!")
else:
    print("Not a palindrome.")

