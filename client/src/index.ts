import { mempoolWrapper } from './core';

const Main = async () => {
  console.info(`Starting...`);

  mempoolWrapper.monitor();
};

Main();
