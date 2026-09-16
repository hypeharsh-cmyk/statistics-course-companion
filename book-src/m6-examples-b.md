## SLIDE 43
Example: Type I and type II error

To test whether a coin is unbiased, it is tossed 5 times. The null hypothesis of unbiasedness is rejected iff more than 4 heads are obtained.
Find the (i)critical region (ii) Probability of type I error (iii)
[sentence continues, cut off at bottom edge of frame — continued on SLIDE 44]
FORMULAS: (none on this slide)
NUMBERS: 5 = number of times the coin is tossed; 4 = "more than 4 heads" threshold for rejecting H0

## SLIDE 44
Probability of type II error, when the corresponding probability of getting a head is 0.2.
[this is the continuation of the sentence begun on SLIDE 43; rest of frame is blank]
FORMULAS: (none on this slide)
NUMBERS: 0.2 = "the corresponding probability of getting a head" (probability used later for the Type II error calculation)

## SLIDE 45
Example (Contd..)

Here, the coin is unbiased. So, the null hypothesis is
H_0 : p= ½
Let X is a random variable denoting the number of heads obtained in five tosses of a coin.
P(X=x | H_0) =(n choose x) p^x q^(n-x) = (5 choose x) 1^x/2 1^(5-x)/2 =(5 choose x) 1^5/2 = 1/32 (5 choose x) ;
[bottom edge of frame clips the descenders of this last line — bled continuation appears at the very top of SLIDE 46]
FORMULAS:
H_0: p = \frac{1}{2}
P(X=x \mid H_0) = \binom{n}{x} p^x q^{n-x} = \binom{5}{x}\left(\frac{1}{2}\right)^x\left(\frac{1}{2}\right)^{5-x} = \binom{5}{x}\left(\frac{1}{2}\right)^5 = \frac{1}{32}\binom{5}{x}
NUMBERS: p = ½ (hypothesized probability of heads under H0); five tosses (n=5); exponents x and 5-x; (1/2)^5 giving coefficient 1/32

## SLIDE 46
[top of frame shows only the bottom halves/descenders of the formula's final line, bled over from SLIDE 45 — same content already given in full on SLIDE 45, not new text]
x=0,1,…,5.

(i)Critical region
rejecting H_0 if more than 4 heads are obtained. X=5.
FORMULAS:
x = 0, 1, \dots, 5
NUMBERS: x = 0,1,...,5 (support of the random variable X); "more than 4 heads" = 4; X=5 (value of X defining the critical/rejection region)

## SLIDE 47
Example (Contd..)

(ii) Prob. of type I error
= α = P (Reject H_0 | H_0 )
= P (X=5 | p=1/2)
= 1/32 (5 choose x) = 1/32 (5 choose 5) = 1/32 = 0.03125.
(iii) Prob. of type II error
[heading cut off at bottom edge of frame — bled continuation appears at the very top of SLIDE 48]
FORMULAS:
\alpha = P(\text{Reject } H_0 \mid H_0) = P(X=5 \mid p=\tfrac{1}{2}) = \frac{1}{32}\binom{5}{x} = \frac{1}{32}\binom{5}{5} = \frac{1}{32} = 0.03125
NUMBERS: X=5; p=1/2; 1/32 (coefficient, appearing twice); (5 choose 5); α = 1/32 = 0.03125

## SLIDE 48
[top of frame shows only the bottom halves/descenders of the "(iii) Prob. of type II error" heading, bled over from SLIDE 47 — same heading already given on SLIDE 47, not new text]
=
β = P (Accept H_0 | H_1 )
= 1- P(Reject H_0 | H_1 )
=1- P (X=5 | p=0.2)
= 1- (5 choose x) 0.2^x = 1- (5 choose 5) 0.2^5 = 1- 0.00032 = 0.99968.
FORMULAS:
\beta = P(\text{Accept } H_0 \mid H_1) = 1 - P(\text{Reject } H_0 \mid H_1) = 1 - P(X=5 \mid p=0.2) = 1-\binom{5}{x}0.2^x = 1-\binom{5}{5}0.2^5 = 1-0.00032 = 0.99968
NUMBERS: X=5; p=0.2; 0.2^5; (5 choose 5); 0.00032; β = 0.99968

SKIPPED: 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58
