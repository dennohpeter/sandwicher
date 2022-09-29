import { constants } from 'ethers';
import { config } from './config';
import { mempoolWrapper } from './core';

const Main = async () => {
  console.info(`Starting...`);

  // get args
  let args = process.argv.slice(2);
  console.info({ args });
  if (args.length === 0) {
    mempoolWrapper.monitor();
  }
  if (args.length > 0) {
    let action = args[0].toLowerCase();
    let token = args[1];
    if (action === 'sell') {
      console.log(
        await mempoolWrapper.sell(
          config.SUPPORTED_ROUTERS[0],
          constants.Zero,
          (
            await mempoolWrapper.fetchTokens([token])
          )[0]
        )
      );
    }
  }
};

Main();
