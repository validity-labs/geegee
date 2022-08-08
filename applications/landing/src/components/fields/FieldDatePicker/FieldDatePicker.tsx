import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import { Box, FormControl as MuiFormControl, FormLabel, IconButton, InputBase, InputBaseProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';

// import 'react-datepicker/dist/react-datepicker.css';
import FieldError from '../FieldError/FieldError';
import CalendarIcon from '@/components/icons/CalendarIcon';

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
    '&.Mui-error': {
      color: theme.palette.error.main,
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
    //   pointerEvents: 'none',
    //   padding: theme.spacing(5, 4, 5, 4.5),
    //   borderRight: '1px solid #262F40',
    //   fontSize: '34px',
    //   color: '#313b4e',
    //   boxSizing: 'content-box',
    // },
    // '&.Mui-focused.MuiInputBase-adornedStart > svg:first-of-type': {
    //   color: theme.palette.background.lighter,
    // },
  },
  '.MuiInputBase-input': {
    minWidth: '160px',
    padding: theme.spacing(0, 6, 0, 0),
    ...theme.typography.body,
    fontSize: '0.75rem', // 12px
    color: theme.palette.text.primary,
    '& .placeholder': {
      color: '#5d5f6a', // theme.palette.text.secondary,
    },
  },
  '.react-datepicker-popper': {
    zIndex: 1,
    margin: theme.spacing(0, 0, 2),
  },
  '.react-datepicker': {
    backgroundColor: theme.palette.background.light,
    // border: `1px solid ${theme.palette.text.active}`,
    borderRadius: +theme.shape.borderRadius * 3,
    color: theme.palette.text.primary,
    overflow: 'hidden',
    '.react-datepicker__day-names, .react-datepicker__week': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      '>div': {
        textAlign: 'center',
      },
    },
    '& .react-datepicker__header': {
      padding: theme.spacing(4, 4, 2),
      backgroundColor: theme.palette.background.light,
    },
    '& .react-datepicker__navigation': {
      appearance: 'none',
      background: 'none',
      border: 0,
      position: 'absolute',
      top: 14,
      color: theme.palette.text.contrast,
      '&.react-datepicker__navigation--next': {
        position: 'absolute',
        right: 0,
      },

    },
    '& .react-datepicker__month': {
      padding: theme.spacing(2, 4, 4),
      // backgroundColor: theme.palette.background.light,
    },
    '& .react-datepicker-year-header': {
      // paddingBottom: '10px',
      // fontSize: '2rem',
      // color: 'inherit',
      // fontWeight: 400,
    },

    '& .react-datepicker__day-name, & .react-datepicker__day, & .react-datepicker__current-month, & .react-datepicker__month-text':
    {
      width: 'auto',
      minWidth: '42px',
      padding: theme.spacing(1.5, 3),
      border: `1px solid transparent`,
      borderRadius: +theme.shape.borderRadius * 1,
      ...theme.typography.body,
      fontSize: '0.75rem', // 12px
      color: 'inherit',
      textAlign: 'center',
    },
    '& .react-datepicker__current-month': {
      padding: theme.spacing(1.5, 6),
    },
    '& .react-datepicker__day': {

      '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.background.main,
      },
    },
    '.react-datepicker__day--today': {
      color: theme.palette.text.active,
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '& .react-datepicker__day--selected, & .react-datepicker__day--selected:hover, /* & .react-datepicker__day--keyboard-selected, */ & .react-datepicker__month--selected, & .react-datepicker__month-text--keyboard-selected':
    {
      boxShadow: `0px 0 3px 1px ${theme.palette.primary.main}`,
    },
    '.react-datepicker__day--outside-month': {
      color: theme.palette.text.secondary,
    },
  },
}));

interface Props extends InputBaseProps {
  id?: string;
  label?: string;
  name: string;
  // fieldName?: never;
  required?: boolean;
  // controlProps?: FormControlProps;
  // labelProps?: FormLabelProps;
  // options: { label: string; value: string | number }[];
  // marginDense?: 'dense';
  // placeholderValue?: string;
  // icon?: never;
}

const FieldDatePicker = ({
  id,
  label,
  // fieldName,
  required = false,
  placeholder = '',
  // marginDense = 'dense',
  fullWidth = false,
  ...props
}: Props) => {
  // https://en.wikipedia.org/wiki/ISO_8601 - 2020-11-27
  // const classes = useStyles();
  const [field, meta, { setValue }] = useField(props.name);

  const inputId = id || field.name;
  const hasError = !!meta.error;

  // const helpFieldName = fieldName || label || placeholder || field.name;
  if (required) {
    if (label) {
      label += '*';
    } else {
      placeholder += '*';
    }
  }

  return (
    <FormControl error={hasError} /* margin={marginDense} */ fullWidth={fullWidth}>
      {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}
      <Box>
        {/* @ts-expect-error */}
        <DatePicker
          calendarStartDay={1}
          id={inputId}
          // popperClassName={classes.picker}
          // open={true}
          dateFormat="dd-MM-yyyy"
          {...field}
          {...props}
          placeholderText={placeholder}
          selected={(field.value && new Date(field.value)) || null}
          previousMonthButtonLabel={
            <IconButton component="span" color="primary">
              <ArrowBackIosRounded />
            </IconButton>
          }
          nextMonthButtonLabel={
            <IconButton component="span" color="primary">
              <ArrowForwardIosRounded />
            </IconButton>
          }
          onChange={(value) => setValue(value)}
          customInput={
            <InputBase
              id={inputId}
              error={hasError}
              aria-describedby={`${inputId}Helper`}
              required={required}
              // margin={marginDense}
              fullWidth={fullWidth}
              endAdornment={<CalendarIcon />}
            />
          }
        />
      </Box>
      {hasError && <FieldError id={inputId} message={meta.error} /* field={helpFieldName} */ />}
    </FormControl>
  );
};

export default FieldDatePicker;

// const pickerRef = useRef()
// const toggleDatePicker = () => {
//   pickerRef.current.setOpen(true)
// }

// <Box display="flex" alignItems="center">
//   {/* datepicker ref={pickerRef}*/}
//   <IconButton onClick={toggleDatePicker}>
//     <CalendarIcon />
//   </IconButton>
// </Box>
