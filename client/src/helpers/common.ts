import { BigNumber, constants, utils } from 'ethers';

// async sleep function
export const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

/*
  Binary search to find optimal sandwichable amount

  Using binary search here as the profit function isn't normally distributed
*/
const BN_18 = utils.parseUnits('1');

export const binarySearch = (
  left: BigNumber, // Lower bound
  right: BigNumber, // Upper bound
  calculateF: (val: BigNumber) => BigNumber, // Generic calculate function
  passConditionF: (val: BigNumber) => boolean, // Condition checker
  tolerance = utils.parseUnits('0.01') // Tolerable delta (in %, in 18 dec, i.e. parseUnits('0.01') means left and right delta can be 1%)
): BigNumber => {
  if (right.sub(left).gt(tolerance.mul(right.add(left).div(2)).div(BN_18))) {
    const mid = right.add(left).div(2);
    const out = calculateF(mid);

    // If we pass the condition
    // Number go up
    if (passConditionF(out)) {
      return binarySearch(mid, right, calculateF, passConditionF, tolerance);
    }

    // Number go down
    return binarySearch(left, mid, calculateF, passConditionF, tolerance);
  }

  // No negatives
  const ret = right.add(left).div(2);
  if (ret.lt(0)) {
    return constants.Zero;
  }

  return ret;
};

/*
 Uniswap v2; x * y = k formula

 How much out do we get if we supply in?
*/
export const getUniv2DataGivenIn = (
  aIn: BigNumber,
  reserveA: BigNumber,
  reserveB: BigNumber
) => {
  const aInWithFee = aIn.mul(9975);
  const numerator = aInWithFee.mul(reserveB);
  const denominator = aInWithFee.add(reserveA.mul(10000));
  const bOut = numerator.div(denominator);

  // Underflow
  let newReserveB = reserveB.sub(bOut);
  if (newReserveB.lt(0) || newReserveB.gt(reserveB)) {
    newReserveB = BigNumber.from(1);
  }

  // Overflow
  let newReserveA = reserveA.add(aIn);
  if (newReserveA.lt(reserveA)) {
    newReserveA = constants.MaxInt256;
  }

  return {
    amountOut: bOut,
    newReserveA,
    newReserveB,
  };
};
