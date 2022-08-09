import { TFunction } from 'next-i18next';

import { setLocale } from 'yup';

/**
 *  Update yup locale configuration on language change. Should be
 * called before schema creation, and 'yup' namespace should be included in serverSideTranslations call.
 */
export const setYupLocale = (t: TFunction) => {
  setLocale({
    mixed: {
      required: t('required', { ns: 'yup' }),
    },
    string: {
      email: t('valid.email', { ns: 'yup' }),
    },
    array: {
      min: t('array.min', { ns: 'yup' }),
    },
  });
};

export const sleep = (s: number) => {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
};
