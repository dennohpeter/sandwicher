import { BigNumber, constants, utils } from 'ethers';

// async sleep function
export const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

/*
  Binary search to find optimal sandwichable amount

  Using binary search here as the profit function isn't normally distributed
*/
const BN_18 = utils.parseUnits('1');
const tolerance = utils.parseUnits('0.01'); // Tolerable delta (in %, in 18 dec, i.e. parseUnits('0.01') means left and right delta can be 1%)

export const binarySearch = (
  left: BigNumber, // Lower bound
  right: BigNumber, // Upper bound,
  amountIn: BigNumber,
  amountOutMin: BigNumber,
  reserveBNB: BigNumber,
  reserveToken: BigNumber
): BigNumber => {
  let mid = right.add(left).div(2);
  if (right.sub(left).lte(tolerance.mul(mid).div(BN_18))) {
    return mid;
  }
  const frontRunState = getUniv2DataGivenAmountIn(
    mid,
    reserveBNB,
    reserveToken
  );
  const victimState = getUniv2DataGivenAmountIn(
    amountIn,
    frontRunState.newReserveA,
    frontRunState.newReserveB
  );
  const victimAmountOut = victimState.amountOut;
  if (victimAmountOut.gte(amountOutMin)) {
    return binarySearch(
      mid,
      right,
      amountIn,
      amountOutMin,
      reserveBNB,
      reserveToken
    );
  } else {
    return binarySearch(
      left,
      mid,
      amountIn,
      amountOutMin,
      reserveBNB,
      reserveToken
    );
  }
};

/*
 Uniswap v2; x * y = k formula

 How much out do we get if we supply in?
*/
export const getUniv2DataGivenAmountIn = (
  amountIn: BigNumber,
  reserveA: BigNumber,
  reserveB: BigNumber
) => {
  const amountInWithFee = amountIn.mul(9975); // ~0.3% swap fee
  const numerator = amountInWithFee.mul(reserveB);
  const denominator = amountInWithFee.add(reserveA.mul(10000));
  const amountOut = numerator.div(denominator);

  const newReserveA = reserveA.add(amountIn);
  const newReserveB = reserveB.sub(amountOut);

  return {
    amountOut,
    newReserveA,
    newReserveB,
  };
};

export const calcSandwichStates = (
  amountIn: BigNumber,
  amountOutMin: BigNumber,
  reserveWETH: BigNumber,
  reserveToken: BigNumber,
  optimalSandwichAmount: BigNumber
) => {
  const frontrunState = getUniv2DataGivenAmountIn(
    optimalSandwichAmount,
    reserveWETH,
    reserveToken
  );
  const victimState = getUniv2DataGivenAmountIn(
    amountIn,
    frontrunState.newReserveA,
    frontrunState.newReserveB
  );
  const backrunState = getUniv2DataGivenAmountIn(
    frontrunState.amountOut,
    victimState.newReserveB,
    victimState.newReserveA
  );

  if (victimState.amountOut.lt(amountOutMin)) {
    return null;
  }

  return {
    optimalSandwichAmount,
    amountIn,
    amountOutMin,
    frontrunState,
    victimState,
    backrunState,
  };
};
