import getNextConfig from 'next/config';

import { NextAppConfig } from '@/typings/app';

const getConfig = (): NextAppConfig => {
  const { serverRuntimeConfig = {}, publicRuntimeConfig = {} } = getNextConfig() || {};
  return { serverRuntimeConfig, publicRuntimeConfig };
};

export default getConfig;
