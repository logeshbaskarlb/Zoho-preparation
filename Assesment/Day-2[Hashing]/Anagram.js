// Question 5: Valid Anagram
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.
// Example:
// Input: s = "anagram", t = "nagaram"
// Output: true
// Input: s = "rat", t = "car"
// Output: false

function anagram(str){

    let str1 = str.split('').sort().join('');
    let str2 = str.split('').sort().join('');
    if(str1 === str2){
        return true;
        }else{
            return false;
        }
        
}
anagram()
