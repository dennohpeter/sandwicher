import { constants, utils } from 'ethers';
import { config } from './config';
import { mempoolWrapper } from './core';

const Main = async () => {
  console.info(`Starting...\n- - -`);

  // get args
  let args = process.argv.slice(2);

  args.length === 0 && mempoolWrapper.monitor();

  if (args.length > 0) {
    let action = args[0].toLowerCase();
    let token = args[1];

    if (action === 'sell') {
      let sell = await mempoolWrapper.sell(
        config.SUPPORTED_ROUTERS[0],
        constants.Zero,
        [token, config.WBNB_ADDRESS]
      );
      console.log(sell);
    }

    if (action === 'transfer') {
      let transfer = await mempoolWrapper.withdrawToken(token);
      console.log(transfer);
    }

    if (action === 'buy') {
      let buy = await mempoolWrapper.buy({
        router: config.SUPPORTED_ROUTERS[0],
        amountOutMin: constants.Zero,
        path: [
          '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          config.WBNB_ADDRESS,
        ],
        amountIn: utils.parseUnits('0.05'),
      });
      console.log(buy);
    }
  }
};

Main();
