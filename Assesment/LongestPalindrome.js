// Problem Description:
// Given a string `s`, return the longest palindromic substring in `s`.
// Input Description:
// A string `s`.
// Output Description:
// The longest palindromic substring in `s`.
// Examples:
// **Example 1:**
// - Input: `s = "babad"`
// - Output: `"bab"`
// - Explanation: `"aba"` is also a valid answer.
// **Example 2:**
// - Input: `s = "cbbd"`
// - Output: `"bb"`
// Constraints:
// 1 <= s.length <= 1000
// s consists of only digits and English letter

function LongestPalindrome(){
    const  n = s.length;
    if(n < 1) return "";

    const dp = Array.from(Array(n), () => Array(n).fill(false));
    let start = 0, maxLength = 1

    for(let i=0; i<n-1; i++){
        dp[i][i] = true
    }
    for(let i=0; i<n-1; i++){
        if(s[i] === s[i+1]) { 
            dp[i][i+1] = true;
            start = i
            maxLength = 2
        }
    }

    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;

            if (s[i] == s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLength = len;
            }
        }
    }
    return s.substring(start, start + maxLength);
}
LongestPalindrome() 