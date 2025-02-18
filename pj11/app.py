import streamlit as st

def is_palindrome(s):
    cleaned_s = ''.join(char.lower() for char in s if char.isalnum())
    return cleaned_s == cleaned_s[::-1]

# Streamlit UI
st.title("Palindrome Checker 🧩")

st.write("Enter a word, phrase, or number to check if it's a palindrome.")

# User input
user_input = st.text_input("Enter text here:", "")

# Check palindrome
if user_input:
    if is_palindrome(user_input):
        st.success(f'✅ "{user_input}" is a palindrome!')
    else:
        st.error(f'❌ "{user_input}" is not a palindrome.')

# Add a fun fact or explanation
st.markdown("""
### What is a Palindrome? 🤔
A palindrome is a word, phrase, number, or sequence that reads the same backward as forward.

#### Examples:
- **Racecar** ✅
- **A man, a plan, a canal: Panama** ✅
- **12321** ✅
- **Hello** ❌
""")

