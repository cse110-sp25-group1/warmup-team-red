# Warmup Team Red


RESEARCH: 
1. set player bank (amount money you have) is set
2. set bet amount (subtract from bank)  
3.  deck is set in front of you (create)
4.  shuffle deck
5. player and dealer dealt 2 cards 
6. player card sum is known, but cant see last card for dealer
7. Check for player immediate blackjack (if ace with face card (2 cards and 21), "blackjack" )
   1. win, unless tie(push)
8.  player can double orignal bet
9.  player chooses to hit or stand - Repeatable if under 21
-Reveal updated hand after each hit
-If sum > 21 → Bust, dealer wins
-If sum = 21 → check dealer's hand to determine push or win
10. Player can decide to "Stand" anytime before busting
Once the player stands:
Move to dealer's turn
11. Reveal dealer’s hidden card
12. Dealer hits until hand value is 17 or higher
Dealer stands on soft/hard 17
If dealer busts (>21) → player wins
13. Compare hands (if neither busts):
Player sum > Dealer sum → Player wins
Player sum < Dealer sum → Dealer wins
Sums equal → Push (tie), no money lost or won

odd cases: 
14. Aces are worth 11 unless hand would bust → then count as 1

