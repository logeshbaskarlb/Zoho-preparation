// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
// typically using all the original letters exactly once.
// Example:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

function groupAnagrams(strs){
    const map = new Map();

    for (const str of strs){
        const sortedStr = str.split('').sort().join('');

        if(!map.has(sortedStr)){
            map.set(sortedStr, []);
        }
        map.get(sortedStr).push(str)
    }
    return Array.from(map.values())
}
groupAnagrams()