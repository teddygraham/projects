import streamlit as st

def count_vowels(sentence):
    vowels = "aeiouAEIOU"
    count = {v: 0 for v in vowels}

    for char in sentence:
        if char in vowels:
            count[char] += 1

    total_vowels = sum(count.values())
    return total_vowels, count

# Streamlit UI
st.title("🔤 Vowel Counter App")
st.write("Enter a sentence below to count the number of vowels.")

# Text Input
sentence = st.text_area("Enter your sentence:", "")

if st.button("Count Vowels"):
    if sentence.strip():
        total, vowel_counts = count_vowels(sentence)

        st.subheader(f"Total vowels: {total}")

        # Display vowel counts
        st.write("### Breakdown:")
        for vowel, num in vowel_counts.items():
            if num > 0:
                st.write(f"**{vowel}:** {num}")

    else:
        st.warning("Please enter a sentence before counting vowels.")


