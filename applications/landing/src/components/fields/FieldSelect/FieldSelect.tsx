import React, { useCallback, useMemo } from 'react';

import { CheckRounded, KeyboardArrowDownRounded } from '@mui/icons-material';
import {
  FormControl as MuiFormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  InputAdornment,
  MenuItem as MuiMenuItem,
  Select,
  SelectProps,
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
  '.MuiInput-root': {
    margin: 0,
    '&.Mui-focused': {
      '.MuiSelect-select': {
        boxShadow: `0px 0 3px 1px ${theme.palette.primary.main}`,
      },
      '.MuiSelect-icon': {
        color: theme.palette.text.active,
      },
    },
    '&.Mui-error .MuiSelect-select': {
      boxShadow: `0px 0 3px 1px ${theme.palette.error.main}`,
    },
    '.MuiSelect-select': {
      minWidth: '160px',
      padding: theme.spacing(5.5, 19, 5.5, 5),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: +theme.shape.borderRadius * 3,
      boxSizing: 'border-box',
      ...theme.typography.body,
      fontSize: '0.75rem', // 12px
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.light,
      transition: theme.transitions.create(['box-shadow']),
      '.LabFieldSelect-placeholder': {
        color: '#5d5f6a', // theme.palette.text.secondary,
      },

    },
    '.MuiSelect-icon': {
      right: theme.spacing(6),
      pointerEvents: 'none',
      fontSize: '28px',
      color: '#595B64',
      transition: 'color 0.4s linear',
    },
  },
}));

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 8),
  ...theme.typography.body,
  fontSize: '0.75rem', // 12px
  color: '#C4C4C4',
  svg: {
    fontSize: '20px',
    visibility: 'hidden',
  },
  '&.Mui-selected': {
    color: theme.palette.text.active,
    svg: {
      visibility: 'visible',
    },
  },
}));

export interface FieldSelectOption {
  label: string;
  value: string | number;
}

interface Props extends SelectProps {
  id?: string;
  label?: string;
  name: string;
  required?: boolean;
  controlProps?: FormControlProps;
  labelProps?: FormLabelProps;
  // fieldName?: never;
  options: FieldSelectOption[];
  marginDense?: 'dense';
  // placeholderValue?: string;
  icon?: never;
}

const FieldSelect = ({
  id,
  label,
  // fieldName,
  options = [],
  required = false,
  controlProps = {},
  labelProps = {},
  placeholder = '',
  // marginDense = 'dense',
  fullWidth = false,
  // placeholderValue = '',
  icon: Icon,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name);
  // console.log(field, meta);
  const inputId = id || field.name;
  const hasError = !!meta.error;

  // const helpFieldName = fieldName || label || placeholder || field.name;
  if (required) {
    if (label) {
      // label += '*';
    } else {
      placeholder += '*';
    }
  }

  const optionMap = useMemo<Record<string, string>>(() => options.reduce((ar, r) => {
    ar[`${r.value}`] = r.label;
    return ar;
  }, {} as Record<string, string>), [options]);

  const renderValue = useCallback((value: string | string[]) => {
    const values = ([] as string[]).concat(value);
    if (values?.length === 0) { return <span className="LabFieldSelect-placeholder">{placeholder}</span>; }
    return values.map((v) => optionMap[v]).join(', ')
  }, [placeholder, optionMap]);

  //  const handleChange = (event: SelectChangeEvent) => {
  //    onChange(event.target.value as string)
  //  };
  return (
    <FormControl error={hasError} required={required} fullWidth={fullWidth} {...controlProps}>
      {label && (
        <FormLabel htmlFor={inputId} {...labelProps}>
          {label}
        </FormLabel>
      )}
      <Select
        id={inputId}
        error={hasError}
        // labelId
        variant="standard"
        disableUnderline
        aria-describedby={`${inputId}Helper`}
        // required={required}
        placeholder={placeholder}
        // margin="dense"
        fullWidth={fullWidth}
        displayEmpty={!!placeholder}
        IconComponent={KeyboardArrowDownRounded}
        {...(placeholder ? { renderValue } : {})}
        MenuProps={{
          PaperProps: {
            /* @ts-expect-error */
            'data-testid': 'LabFieldSelect-paper',
            sx: {
              py: 4,
              marginTop: 2,
              backgroundColor: 'background.light',
              borderRadius: '15px',
            },
          },
          MenuListProps: {
            disablePadding: true,
          },
          // getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        startAdornment={
          Icon && <InputAdornment position="start">{/* <Icon style={{ fontSize: 20 }} /> */}</InputAdornment>
        }
        data-testid="LabFieldSelect-select"
        {...field}
        {...props}
      >
        {/* {!!placeholder && (
          <MenuItem value={placeholderValue} disabled style={{ display: 'none' }}>
            <span className="placeholder">{placeholder}</span>
          </MenuItem>
        )} */}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}<CheckRounded />
          </MenuItem>
        ))}
      </Select>
      {hasError && <FieldError id={inputId} message={meta.error} /* field={helpFieldName} */ />}
    </FormControl >
  );
};

export default FieldSelect;
