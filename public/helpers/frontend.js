export const fetcher = url => fetch(url).then((res) => res.json());

export const tooltipTexts = {
  totals: "The total number of times this split has occurred",
  avgs: "The average time in the run where this split happens",
  tsp: "The average time that it takes to go from the previous split to the current",
  convR: "The rate of converting the previous split into the current",
  convG: "The rate of converting any run into this split",
}

export const colourList = ["#0088FE","#00C49F","#973e95","#FF8042","#FFC0CB","#FFD700"]