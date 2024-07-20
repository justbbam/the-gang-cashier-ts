import { defineStore } from 'pinia';

interface ChangeOption {
  value: number;
  count: number;
}

interface CoinCombination {
  coin: number;
  value: number;
}

export const usePaymentSummaryStore = defineStore('paymentSummary', {
  state: () => ({
    receivedMoney: 0,
    totalAmount: 0,
    change: 0,
    allCombinations: [] as CoinCombination[][],
  }),
  getters: {
    changeMoney(state): number {
      return state.receivedMoney - state.totalAmount;
    },
    allChange(state): CoinCombination[][] {
      return state.allCombinations;
    },
  },
  actions: {
    setReceivedMoney(amount: number) {
      this.receivedMoney = amount;
    },
    setTotalAmount(amount: number) {
      this.totalAmount = amount;
    },
    calculateChange() {
      let amount = this.receivedMoney - this.totalAmount;
      if (amount < 0) {
        return;
      }
      this.change = amount;
      this.allCombinations = this.allCombinationsFunc(amount);
    },
    allCombinationsFunc(amount: number): CoinCombination[][] {
      const coins = [1, 5, 7, 11];
      const dp = Array(amount + 1).fill(Infinity);
      dp[0] = 0;
      const combinations: { [key: number]: number }[][] = Array(amount + 1).fill(null).map(() => []);

      for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
          if (i >= coin && dp[i - coin] + 1 <= dp[i]) {
            if (dp[i - coin] + 1 < dp[i]) {
              dp[i] = dp[i - coin] + 1;
              combinations[i] = [];
            }
            const newComb: { [key: number]: number } = { ...(combinations[i - coin][0] || {}) };
            if (newComb[coin]) {
              newComb[coin]++;
            } else {
              newComb[coin] = 1;
            }
            if (!combinations[i].some(c => JSON.stringify(c) === JSON.stringify(newComb))) {
              combinations[i].push(newComb);
            }
          }
        }
      }

      const minLength = dp[amount];
      const minCombinations = combinations[amount].filter(comb => Object.values(comb).reduce((a, b) => a + b, 0) === minLength);

      const sortedMinCombinations = minCombinations.map(combination => {
        const sortedCombination = Object.entries(combination)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([coin, value]) => ({
            coin: Number(coin),
            value,
          }));
        return sortedCombination;
      });

      return sortedMinCombinations.sort((a, b) => {
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
          if (!a[i]) return 1;
          if (!b[i]) return -1;
          if (a[i].coin !== b[i].coin) {
            return b[i].coin - a[i].coin;
          }
        }
        return 0;
      });
    },
  },
});
