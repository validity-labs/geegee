import React from 'react';

import {
  FormControl as MuiFormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  InputBase,
  InputBaseProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useField } from 'formik';

import FieldError from '../FieldError/FieldError';

const FormControl = styled(MuiFormControl)(({ theme }) => ({
  '.MuiFormLabel-root': {
    margin: theme.spacing(0, 1.5, 1.5),
    ...theme.typography.body,
    fontSize: '0.75rem', // 12px
    fontWeight: 600,
    color: '#8B8D97', // theme.palette.text.secondary,
    transition: 'color 0.4s linear',
    '&.Mui-focused': {
      color: theme.palette.text.primary,
    },

  },
  '.MuiInputBase-root': {
    padding: theme.spacing(4.5, 6, 4.5, 5),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: +theme.shape.borderRadius * 3,
    backgroundColor: theme.palette.background.light,
    transition: theme.transitions.create(['box-shadow']),

    '&.Mui-focused': {
      boxShadow: `0px 0 3px 1px ${theme.palette.primary.main}`,
      svg: {
        color: theme.palette.text.active,
      },
    },
    '&.Mui-error': {
      boxShadow: `0px 0 3px 1px ${theme.palette.error.main}`,
    },
    svg: {
      pointerEvents: 'none',
      // boxSizing: 'content-box',
      // margin: theme.spacing(4, 6, 4, 0),
      fontSize: '28px',
      color: '#595B64',
      transition: 'color 0.4s linear',
    },
    // '&.MuiInputBase-adornedStart > svg:first-of-type': {
    //   padding: theme.spacing(5, 4, 5, 4.5),
    //   borderRight: '1px solid #262F40',
    //   color: '#313b4e',
    //   boxSizing: 'content-box',
    // },
    // '&.Mui-focused.MuiInputBase-adornedStart > svg:first-of-type': {
    //   color: theme.palette.background.lighter,
    // },
  },
  '.MuiInputBase-input': {
    // minWidth: '160px',
    padding: theme.spacing(0, 6, 0, 0),
    ...theme.typography.body,
    fontSize: '0.75rem', // 12px
    color: theme.palette.text.primary,
    '& .placeholder': {
      color: '#5d5f6a', // theme.palette.text.secondary,
    },
  },
}));

interface Props extends InputBaseProps {
  id?: string;
  label?: string;
  name: string;
  required?: boolean;
  className?: string;
  controlProps?: FormControlProps;
  labelProps?: FormLabelProps;
}

const FieldInput = ({
  id,
  label,
  className,
  required = false,
  fullWidth = false,
  controlProps = {},
  labelProps = {},
  ...props
}: Props) => {
  const [field, meta] = useField(props.name);
  const inputId = id || field.name;
  const hasError = !!meta.error;
  return (
    <FormControl
      color="secondary"
      error={hasError}
      required={required}
      {...controlProps}
      className={className}
      fullWidth={fullWidth}
    >
      {label && (
        <FormLabel htmlFor={inputId} {...labelProps}>
          {label}
        </FormLabel>
      )}
      <InputBase
        id={inputId}
        error={hasError}
        aria-describedby={`${inputId}Helper`}
        required={required}
        {...field}
        {...props}
      />
      {hasError && <FieldError id={inputId} message={meta.error} />}
    </FormControl>
  );
};

export default FieldInput;
