import React from 'react';

import { CheckRounded } from '@mui/icons-material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {
  Checkbox,
  CheckboxProps,
  FormControl as MuiFormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useField } from 'formik';

import BlankIcon from '@/components/icons/BlankIcon';

const FormControl = styled(MuiFormControl)(({ theme }) => ({
  // marginBottom: theme.spacing(3),
  '.MuiFormControlLabel-root': {
    margin: theme.spacing(0, 0, 0, -2),
  },
  '.MuiFormControlLabel-label': {
    ...theme.typography.h6,
    fontSize: '0.875rem', // 14px
    color: '#8B8D97', // theme.palette.text.secondary,
    transition: 'color 0.4s linear',
    '&.Mui-focused': {
      color: theme.palette.text.primary,
    },

  },
  '.MuiCheckbox-root': {
    alignSelf: 'flex-start',
    margin: theme.spacing(-1, 2, 0, 0),
    marginRight: theme.spacing(2),
    transition: theme.transitions.create(['box-shadow']),
    svg: {
      borderRadius: +theme.shape.borderRadius * 1,
      padding: 1,
      backgroundColor: theme.palette.background.light,
    },
    '&.Mui-focusVisible svg': {
      boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 0.1rem`,
    },
    '&.Mui-error svg': {
      boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.1rem`,
    },
    '&.Mui-focusVisible + .MuiFormControlLabel-label': {
      color: theme.palette.text.primary,
    },
  },
}));

interface Props extends CheckboxProps {
  id?: string;
  label?: React.ReactNode;
  name: string;
  required?: boolean;
  controlProps?: FormControlProps;
}
const FieldCheckbox = ({ id, label, required = false, controlProps = {}, ...props }: Props) => {
  const [field, meta] = useField(props.name);

  const inputId = id || field.name;
  const hasError = !!meta.error;

  return (
    <FormControl color="secondary" error={hasError} required={required} {...controlProps}>
      <FormControlLabel
        htmlFor={inputId}
        control={
          <Checkbox
            id={inputId}
            {...(hasError ? { className: 'Mui-error' } : undefined)}
            aria-describedby={`${inputId}Helper`}
            // color="secondary"
            required={required}
            icon={<BlankIcon />}
            checkedIcon={<CheckRounded />}
            {...field}
            {...props}
            checked={field.value}
          />
        }
        label={label}
      />
      {hasError && <FormHelperText id={`${inputId}Helper`}>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FieldCheckbox;
