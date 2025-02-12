import random

def roll_dice():
    return random.randint(1, 6)

# Roll the dice and print the result
rolled_number = roll_dice()
print(f"You rolled a {rolled_number}!")

