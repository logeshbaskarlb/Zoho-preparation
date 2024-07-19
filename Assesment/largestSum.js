// Problem Description:
// Given an integer array `nums`, find the subarray with the largest sum, and return its sum.
// Input Description:
// An integer array `nums`.
// Output Description:
// The sum of the subarray with the largest sum.
// Examples:
// **Example 1:**
// - Input: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`
// - Output: `6`
// - Explanation: The subarray `[4, -1, 2, 1]` has the largest sum `6`.
// **Example 2:**
// - Input: `nums = [1]`
// - Output: `1`
// - Explanation: The subarray `[1]` has the largest sum `1`.
// **Example 3:**
// - Input: `nums = [5, 4, -1, 7, 8]`
// - Output: `23`
// - Explanation: The subarray `[5, 4, -1, 7, 8]` has the largest sum `23`.
// Constraints:
// 1 <= nums.length <= 10^5
// -10^4 <= nums[i] <= 10^


// ! Kadane's Algorithm


function largestSum(nums){
    let max_current = nums[0]
    let max_global = nums[0]

    for(let i=1; i<nums.length; i++){
        max_current = Math.max(nums[i],max_current + nums[i])
        max_global = Math.max(max_current,max_global);
    }
    return max_global;
};
console.log(largestSum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));