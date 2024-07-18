// Question 1
// Problem Description:
// You are given an integer array coins representing coins of different denominations and an integer
// amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount. If that amount of money
// cannot be made up by any combination of the coins, return -1.
// You may assume that you have an infinite number of each kind of coin.
// Input Description:
// An integer array `coins` representing coins of different denominations.
// An integer `amount` representing a total amount of money.
// Output Description:
// The fewest number of coins needed to make up the amount. If the amount cannot be made up,
// return -1.
// Examples:
// **Example 1:**
// - Input: `coins = [1, 2, 5]`, `amount = 11`
// - Output: `3`
// - Explanation: `11 = 5 + 5 + 1`
// **Example 2:**
// - Input: `coins = [2]`, `amount = 3`
// - Output: `-1`
// **Example 3:**
// - Input: `coins = [1]`, `amount = 0`
// - Output: `0`
// Constraints:
// 1 <= coins.length <= 12
// 1 <= coins[i] <= 2^31 - 1
// 0 <= amount <= 10^4

function coinChange(coins , amount){
    let dp = new Array(amount+1).fill(Infinity);
    dp[0] = 0;

    for(const coin of coins){
        for(let i = coin; i <= amount ; i++){
            dp[i] = Math.min(dp[i] , dp[ i - coin] + 1)
        }
    }
    return dp[amount] === Infinity ? -1  :dp[amount]
}
let coins = [1,2,5]
let amount = 11
console.log(coinChange(coins, amount));