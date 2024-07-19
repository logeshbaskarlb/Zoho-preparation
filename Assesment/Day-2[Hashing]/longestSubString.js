// Given a string s, find the length of the longest substring without repeating characters.
// Example:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

function longestSubString(s){
    let start = 0;
    let maxLength = 0;
    let set = new Set()

    for(let end = 0; end < s.length; end++){
        while(set.has(s[end])){
            set.delete(s[start])
            start++
        }

        set.add(s[end])

        maxLength = Math.max(maxLength, end - start + 1)
    }

    return maxLength;
}
longestSubString(s)