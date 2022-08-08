import { useMemo, useRef } from 'react';

import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';

import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import FieldCheckbox from '@/components/fields/FieldCheckbox/FieldCheckbox';
import FieldDatePicker from '@/components/fields/FieldDatePicker/FieldDatePicker';
import FieldInput from '@/components/fields/FieldInput/FieldInput';
import FieldSelect, { FieldSelectOption } from '@/components/fields/FieldSelect/FieldSelect';
import Link from '@/components/general/Link/Link';
import UserIcon from '@/components/icons/UserIcon';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';
import { AUTH0_BASE_URL, PHONE_REGEX_EXP } from '@/libs/constants';
import { setYupLocale } from '@/libs/helpers';

const Root = styled(Section)(({ theme }) => ({
  padding: theme.spacing(40.5, 0, 30),
  '.LabProfileSection-panel': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.main,
    borderRadius: +theme.shape.borderRadius * 4,
    boxShadow: '0px 3px 6px #FD00FD',
    padding: theme.spacing(18.5, 17, 11),
  },
  '.LabProfileSection-sticker': {
    marginBottom: theme.spacing(7.5),

  },
  '.LabProfileSection-title': {
    marginBottom: theme.spacing(6),
  },
  '.LabProfileSection-pretitle': {
    textTransform: 'uppercase',
  },
  '.LabProfileSection-submit': {
    justifyContent: 'center',
    margin: theme.spacing(12.5, 'auto', 0),
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
    },
  },
}));

interface Values {
  interest: Array<InterestKeys>;
  username: string;
  birthDate: string;
  consent: boolean;
  // form: 'onboarding',
  phone?: string;
}

type InterestKeys =
  | 'shooter'
  | 'action-adventure'
  | 'survival'
  | 'rp'
  | 'simulation'
  | 'irl'
  | 'sport'
  | 'moba';

const interestItems: { value: InterestKeys; i18nKey: string }[] = [
  { value: 'shooter', i18nKey: 'shooter' },
  { value: 'action-adventure', i18nKey: 'action-adventure' },
  { value: 'survival', i18nKey: 'survival' },
  { value: 'rp', i18nKey: 'rp' },
  { value: 'simulation', i18nKey: 'simulation' },
  { value: 'irl', i18nKey: 'irl' },
  { value: 'sport', i18nKey: 'sport' },
  { value: 'moba', i18nKey: 'moba' },
];

export const INTEREST_VALUES: InterestKeys[] = interestItems.map(({ value }) => value);

const getAuth0ContinuteUrl = (state: string) => `${AUTH0_BASE_URL}/continue?state=${state}`;

const ProfileSection = () => {
  const t = usePageTranslation({ keyPrefix: 'profile-section' });
  const {
    t: tRaw,
    i18n: { language },
  } = useTranslation();

  const { query: { state } } = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  // const showMessage = useSnack();

  const continueUrl = useMemo(() => getAuth0ContinuteUrl(`${state}`), [state]);


  const validationSchema = useMemo(() => {
    setYupLocale(tRaw);
    // const phoneInvalid = t('validation.phone-invalid');

    return Yup.object({
      interest: Yup.array(Yup.string().oneOf(INTEREST_VALUES)).required(),
      username: Yup.string()/* .trim() */.min(2).required(),
      birthDate: Yup.string().required(),
      consent: Yup.boolean().required().oneOf([true], t('field.consent.yup.required')),
      // form: Yup.string().oneOf(['onboarding']).required(),
      phone: Yup.string().matches(PHONE_REGEX_EXP, t('field.phone.yup.invalid-format'))/* .trim() */.optional(),
    }) as unknown as Yup.SchemaOf<Values>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, tRaw]);

  const handleSubmit = async (/* values: Values, formikBag: FormikHelpers<Values> */) => {
    if (formRef.current) {
      formRef.current.submit();
      //   formikBag.setSubmitting(false);
    }
  };

  const { interestOptions } = useMemo(() => {
    return {
      interestOptions: interestItems.map(({ value, i18nKey }) => ({
        value,
        label: t(`field.interest.value.${i18nKey}`),
      })) as FieldSelectOption[],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, t]);

  return (
    <Root background='transparent'>
      <Container maxWidth="sm">
        <div className="LabProfileSection-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={'/images/account/onboarding/sticker.svg'} width={108} height={48} alt="" className="LabProfileSection-sticker" />
          <Typography variant="h3" component="h1" mb={6}>
            {t('title')}
          </Typography>
          <Typography variant="body-sm" mb={10}>
            {t('description')}
          </Typography>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              interest: [],
              username: '',
              birthDate: '',
              consent: false,
              // form: 'onboarding',
              phone: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => {
              return (
                <Form autoComplete="off" noValidate style={{ width: '100%' }} ref={formRef} action={continueUrl} method="POST">
                  <Grid container spacing={4.5}>
                    <Grid item xs={12}>
                      <FieldSelect
                        name="interest"
                        fullWidth
                        displayEmpty
                        options={interestOptions}
                        multiple
                        label={t('field.interest.label')}
                        placeholder={t('field.interest.placeholder')}
                      //
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <FieldInput name="username" required label={t('field.username.label')} fullWidth endAdornment={<UserIcon />} />
                    </Grid>
                    <Grid item xs={12} >
                      <FieldDatePicker
                        name="birthDate"
                        fullWidth
                        required
                        label={t('field.birth-date.label')}
                        placeholder={t('field.birth-date.placeholder')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FieldInput
                        name="phone"
                        type="tel"
                        label={t('field.phone.label')}
                        fullWidth
                        placeholder={t('field.phone.placeholder')}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <FieldCheckbox
                        name="consent"
                        required
                        label={
                          <Trans
                            i18nKey="field.consent.label"
                            t={t}
                            components={[
                              <Link key="terms" href="/downloads/terms-of-conditions.pdf" target="_blank" />,
                              <Link key="policy" href="/downloads/privacy-policy.pdf" />,
                            ]}
                          />
                        }
                      />
                    </Grid>

                    <Grid item xs={12} style={{ textAlign: 'center' }} >
                      <Button
                        type="submit"
                        //size="large"
                        disabled={isSubmitting}
                        className="LabProfileSection-submit"
                        startIcon={isSubmitting && <CircularProgress color="success" size={24} />}
                      >
                        {t('submit')}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </Root>
  );
};

export default ProfileSection;
