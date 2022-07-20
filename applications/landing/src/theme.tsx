// import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { alpha, createBreakpoints, createSpacing } from '@mui/system';

const shapeBorderRadiusBase = 5;
const spacing = 4;
const sp = createSpacing(spacing); // spacing helper
const bp = createBreakpoints({});
// Create a theme instance.

const theme = createTheme({
  spacing,
  palette: {
    primary: {
      main: '#F631F6',
      // dark: '#065cb2',
      // contrastText: '#ffffff',
    },
    secondary: {
      main: '#C4C4C4',
      dark: '#1A1A1A',
      // light: '#F23C9E',
      // main: '#df0e83',
      // contrastText: '#ffffff',
    },
    // warning: {
    // main: '#F8B90D',
    // contrastText: '#ffffff',
    // },
    // error: {
    // main: '#CE0057', // red.A400,
    // },
    // success: {
    // main: '#33C7B1',
    // },
    divider: '#1E1D20',
    text: {
      primary: '#000000', // '#0e193c',
      secondary: '#7d7d7d',
      contrast: '#ffffff',
      active: '#F631F6',
    },
    background: {
      dark: '#171719',
      darker: '#0F0F0F',
      light: '#7294FF',
      lighter: '#F6F6F6',
      gray: '#fafafa',
      orange: '#ff973e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: {
      fontFamily: 'Audiowide, cursive',
      fontSize: '3.125rem', // 50px
      lineHeight: '3.75rem', // 60px
      whiteSpace: 'pre-line',
      [bp.up('md')]: {
        fontSize: '5rem', // 80px
        lineHeight: '5.625rem', // 90px
      },
    },
    h2: {
      fontFamily: 'Audiowide, cursive',
      whiteSpace: 'pre-line',
      fontSize: '1.875rem', // 30px
      lineHeight: '2.5625rem', // 41px
      [bp.up('md')]: {
        fontSize: '3.125rem', // 50px
        lineHeight: '3.75rem', // 60px
      },
      // fontWeight: 500,
    },
    h3: {
      fontFamily: 'Audiowide, cursive',
      fontSize: '1.875rem', // 30px
      lineHeight: '2.5625rem', // 41px
    },
    h4: {
      fontFamily: 'Audiowide, cursive',
      fontSize: '1.5625rem', // 25px
      lineHeight: '2.125rem', // 34px
    },
    h5: {
      fontFamily: 'Audiowide, cursive',
      fontSize: '1.25rem', // 20px
      lineHeight: '1.6875rem', // 27px
    },
    h6: {
      fontFamily: 'Audiowide, cursive',
      fontSize: '1.125rem', // 18px
      lineHeight: '1.5rem', // 24px
    },
    h7: {
      fontFamily: 'Audiowide, cursive',
      fontSize: '1rem', // 16px
      // lineHeight: '1.375rem', // 22px
      // lineHeight: 2.2,
      lineHeight: 1.66,
      letterSpacing: '.4rem',
    },
    'body-xl': {
      fontSize: '1.25rem', // 20px
      lineHeight: 1.66,
    },
    'body-lg': {
      fontSize: '1.125rem', // 18px
      lineHeight: 1.66,
    },
    'body-md': {
      fontSize: '1rem', // 16px
      lineHeight: 1.66,
    },
    body: {
      fontSize: '1rem', // 16px
      // fontSize: '0.9375rem', // 15px
      lineHeight: 1.66,
    },
    'body-sm': {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.66,
    },
    'body-xs': {
      fontSize: '0.8125rem', // 13px
      lineHeight: 1.66,
    },
  },
  shape: {
    borderRadius: shapeBorderRadiusBase,
  },
});
theme.mixins = {
  ...theme.mixins,
  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  radius: (multiplier: number) => ({ borderRadius: multiplier * +theme.shape.borderRadius }),
  border: {
    outlined: {
      border: `1px solid ${theme.palette.divider}`,
    },
    active: {
      border: `1px solid ${theme.palette.text.active}`,
    },
  },
  font: {
    title: {
      fontFamily: 'Audiowide, cursive',
    },
  },
};
theme.components = {
  MuiCssBaseline: {
    styleOverrides: `
        html, body {
          height: 100%;
        }
        body {
          background-color: #0D080C;
          font-family: Montserrat, sans-serif;
        }
        #__next {
          height: 100%;
        }
        main {
          display: flex;
          flex-direction: column;
        }
        h1, h2, h3, h4, h5, h6 {
          padding: 0;
          margin: 0;
        }
        p, ol, ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        a {
          color: #F631F6;
          text-decoration: none;
        }
        a:hover, a:focus, a:visited: {
          color: inherit;
        }
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        ::-webkit-scrollbar-track {
          box-shadow: 'none';
          -webkit-box-shadow: 'none';
        }
        ::-webkit-scrollbar-thumb {
        border: 1px solid white;
          border-radius: 6px;
          background-color: #b7b7b7;
        }
        .aria {
          border: 0;
          clip: rect(1px, 1px, 1px, 1px);
          clip-path: inset(50%);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          word-wrap: normal !important;
        }
        .aria:focus {
          background-color: #eee;
          clip: auto !important;
          clip-path: none;
          display: block;
          height: auto;
          left: 5px;
          padding: 15px 23px 14px;
          text-decoration: none;
          top: 5px;
          width: auto;
          z-index: 100000; /* Above WP toolbar. */
        }
        /* Grow Shadow  https://github.com/IanLunn/Hover/blob/master/css/hover.css*/
        .hvr-grow-shadow {
          transform: perspective(1px) translateZ(0);
          transition: box-shadow, transform 0.3s !important;
        }
        .hvr-grow-shadow:hover, .hvr-grow-shadow:focus, .hvr-grow-shadow:active {
          // box-shadow: 10px 15px 10px #B4BBC629;
          transform: scale(1.1);
        }
        @keyframes floating-v1 {
          0% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(20px, -20px);
          }
          66% {
            transform: translate(40px, 20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `,
  },
  MuiAppBar: {
    defaultProps: {
      position: 'fixed',
      color: 'transparent',
      elevation: 0,
    },
    styleOverrides: {
      root: {
        zIndex: 99,
      },
    },
  },
  MuiToolbar: {
    defaultProps: {
      disableGutters: true,
    },
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: 'lg',
    },
    styleOverrides: {
      root: {
        paddingLeft: sp(4),
        paddingRight: sp(4),
        [bp.up('sm')]: {
          paddingLeft: sp(5),
          paddingRight: sp(5),
        },
        '&.MuiContainer-disableGutters': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: {
        // color: theme.palette.text.primary,
        '&:hover': {
          color: theme.palette.text.active,
        },
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variant: 'body',
      variantMapping: {
        'body-xl': 'p',
        'body-lg': 'p',
        'body-md': 'p',
        body: 'p',
        'body-sm': 'p',
        'body-xs': 'p',
        h7: 'h6',
      },
      fontWeight: 400,
    },
    variants: [
      {
        props: { variant: 'body-xl' },
        style: {
          color: theme.palette.text.secondary,
          fontWeight: 400,
        },
      },
      {
        props: { variant: 'body-lg' },
        style: {
          color: theme.palette.text.secondary,
          fontWeight: 400,
        },
      },
      {
        props: { variant: 'body-md' },
        style: {
          color: theme.palette.text.secondary,
          fontWeight: 400,
        },
      },
      {
        props: { variant: 'body' },
        style: {
          color: theme.palette.text.secondary,
          fontWeight: 400,
          maxWidth: 920,
          '&.MuiTypography-gutterBottom': {
            marginBottom: sp(7.5), // 30px
          },
        },
      },
      {
        props: { variant: 'body-sm' },
        style: {
          color: theme.palette.text.secondary,
          fontWeight: 400,
        },
      },
      {
        props: { variant: 'body-xs' },
        style: {
          color: theme.palette.text.secondary,
          fontWeight: 400,
        },
      },
      {
        props: { variant: 'h7' },
        style: {
          color: theme.palette.text.primary,
          '&.MuiTypography-gutterBottom': {
            marginBottom: sp(2.5), // 10px
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        overflowX: 'auto',
        overflowY: 'hidden',
        maxWidth: '100%',
        whiteSpace: 'pre-line',
        // maxWidth: 920,
        // marginRight: 'auto',
        // marginLeft: 'auto',
      },
      h1: {
        color: theme.palette.text.primary,
        '&.MuiTypography-gutterBottom': {
          marginBottom: sp(12.5), // 50px
        },
      },
      h2: {
        color: theme.palette.text.primary,
        '&.MuiTypography-gutterBottom': {
          marginBottom: sp(12.5), // 50px
        },
      },
      h3: {
        color: theme.palette.text.primary,
        '&.MuiTypography-gutterBottom': {
          marginBottom: sp(5), // 20px
        },
      },
      h4: {
        color: theme.palette.text.primary,
        '&.MuiTypography-gutterBottom': {
          marginBottom: sp(2.5), // 10px
        },
      },
      h5: {
        color: theme.palette.text.primary,
        '&.MuiTypography-gutterBottom': {
          marginBottom: sp(2.5), // 10px
        },
      },
      h6: {
        color: theme.palette.text.primary,
        '&.MuiTypography-gutterBottom': {
          marginBottom: sp(2.5), // 10px
        },
      },
      // body1: {
      //   // lineHeight: 2,
      //   maxWidth: 920,
      //   '&.MuiTypography-gutterBottom': {
      //     marginBottom: sp(7.5), // 30px
      //   },
      // },
      // body2: {
      //   maxWidth: 920,
      //   // color: theme.palette.text.secondary,
      //   '&.MuiTypography-gutterBottom': {
      //     marginBottom: sp(7.5), // 30px
      //   },
      // },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'outlined',
      disableElevation: true,
    },
    variants: [
      {
        props: { variant: 'containedIcon' },
        style: {
          padding: theme.spacing(0, 0, 0, 9),
          borderRadius: shapeBorderRadiusBase * 8,
          overflow: 'hidden',
          color: theme.palette.text.contrast,
          '&:hover': {
            color: theme.palette.text.contrast,
            '& .MuiButton-endIcon': {
              transition: 'background-color .1s, transform .3s',
              transform: 'rotate(10deg)',
            },
          },
          '& .MuiButton-endIcon': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 54,
            height: 54,
            borderRadius: '100%',
            margin: theme.spacing(0, 0, 0, 4),
            transition: 'background-color .1s, transform .3s',
            svg: {
              fontSize: '32px',
            },
          },
        },
      },
      {
        props: { color: 'primary' },
        style: {
          borderColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        },
      },
      {
        props: { variant: 'containedIcon', color: 'primary' },
        style: {
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            '@media (hover: none)': {
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiButton-endIcon': {
              backgroundColor: theme.palette.primary.main,
            },
          },
          '& .MuiButton-endIcon': {
            backgroundColor: theme.palette.primary.light,
          },
        },
      },
      {
        props: { variant: 'containedIcon', color: 'secondary' },
        style: {
          backgroundColor: theme.palette.secondary.main,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            '@media (hover: none)': {
              backgroundColor: theme.palette.secondary.main,
            },
            '& .MuiButton-endIcon': {
              backgroundColor: theme.palette.secondary.main,
            },
          },
          '& .MuiButton-endIcon': {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
      {
        props: { variant: 'containedIcon', color: 'info' },
        style: {
          backgroundColor: '#E6C301',
          '&:hover': {
            backgroundColor: '#b39700',
            '@media (hover: none)': {
              backgroundColor: '#E6C301',
            },
            '& .MuiButton-endIcon': {
              backgroundColor: '#E6C301',
            },
          },
          '& .MuiButton-endIcon': {
            backgroundColor: '#EDD032',
          },
        },
      },
      {
        props: { variant: 'containedIcon', color: 'success' },
        style: {
          backgroundColor: '#25AD64',
          '&:hover': {
            backgroundColor: '#1b894e',
            '@media (hover: none)': {
              backgroundColor: '#25AD64',
            },
            '& .MuiButton-endIcon': {
              backgroundColor: '#25AD64',
            },
          },
          '& .MuiButton-endIcon': {
            backgroundColor: '#36C377',
          },
        },
      },
      {
        props: { variant: 'inverted' },
        style: {
          borderRadius: shapeBorderRadiusBase * 8,
        },
      },
      {
        props: { variant: 'inverted', color: 'primary' },
        style: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
          '&:hover': {
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.common.white,
            '@media (hover: none)': {
              backgroundColor: theme.palette.common.white,
            },
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'info' },
        style: {
          padding: theme.spacing(0, 0, 0, 9),
          borderRadius: shapeBorderRadiusBase * 8,
          overflow: 'hidden',
          color: theme.palette.text.contrast,
          '&:hover': {
            border: '1px solid currentColor',
            color: theme.palette.text.contrast,
            '& .MuiButton-endIcon': {
              transition: 'background-color .1s, transform .3s',
              transform: 'rotate(10deg)',
            },
          },
          '& .MuiButton-endIcon': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 54,
            height: 54,
            border: '1px solid currentColor',
            borderRadius: '100%',
            margin: theme.spacing(0, '-1px', 0, 4),
            backgroundColor: '#ffad36',
            transition: 'background-color .1s, transform .3s',
            svg: {
              fontSize: '32px',
            },
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        minHeight: 'auto',
        borderRadius: 0,
        // fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        lineHeight: 'initial',
        textTransform: 'none',
        [bp.up('sm')]: {
          whiteSpace: 'nowrap',
        },
        '&.Mui-disabled': {
          color: alpha(theme.palette.text.contrast, 0.5),
        },
      },
      contained: {
        color: theme.palette.text.contrast,
        borderRadius: shapeBorderRadiusBase * 8,
        '&:hover': {
          color: theme.palette.text.contrast,
        },
      },
      outlined: {
        borderColor: 'currentcolor',
        borderRadius: shapeBorderRadiusBase * 8,
        '&.Mui-disabled': {
          color: theme.palette.text.secondary,
        },
      },
      text: {
        padding: 0,
        minWidth: 0,
      },
      startIcon: {
        marginRight: sp(6.5),
      },
      iconSizeMedium: {
        '& svg': {
          //, & svg:nth-of-type(1)
          fontSize: '2rem', // 32px
        },
      },
      sizeSmall: {
        padding: sp(4, 10, 4),
        fontSize: '0.9375rem', // 15px
        // padding: sp(2.5, 5, 3),
        // fontSize: '0.9375rem', // 15px
        // fontWeight: 500,
      },
      sizeMedium: {
        padding: sp(6, 12, 6),
        fontSize: '0.9375rem', // 15px
        // fontWeight: 600,
      },
      sizeLarge: {
        // padding: sp(4.5, 9, 5),
        fontSize: '1rem', // 16px
        // fontSize: '1.25rem', // 20
        // fontWeight: 600,
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 2,
      // square: true,
      // variant: "outlined",
      // raised: false,
    },
  },
  MuiCardHeader: {
    defaultProps: {
      // disableTypography: true,
    },
    styleOverrides: {
      root: {
        flexWrap: 'wrap',
        padding: sp(10, 8, 9, 14),
      },
      content: {
        padding: sp(2, 2.5, 0, 0),
      },
      action: {
        margin: 0,
      },
      title: {
        // fontFamily: 'Maven Pro, sans-serif',
        fontSize: '1.5625rem', // 25px
        fontWeight: 700,
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: sp(8, 7, 9),
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: sp(4, 13.5, 6.5, 14.5),
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      variant: 'elevation',
      square: true,
    },
    styleOverrides: {
      rounded: {
        borderRadius: shapeBorderRadiusBase * 4,
      },
      elevation2: {
        boxShadow: '0 3px 6px #00000029',
      },
      elevation3: {
        boxShadow: '0 3px 6px #93939329',
      },
      elevation4: {
        boxShadow: '10px 10px 10px #B4BBC629',
      },
      elevation5: {
        boxShadow: '0px 30px 20px #93939329',
      },
      elevation6: {
        boxShadow: '10px 40px 10px #B4BBC629',
      },
      elevation7: {
        boxShadow: '10px 20px 40px #38383829',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        paddingLeft: sp(8),
      },
      input: {
        // fontFamily: 'Maven Pro, sans-serif',
        fontSize: '1rem',
        fontWeight: 700,
        padding: sp(5, 8, 4.5, 2.5),
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#939393',
        marginBottom: sp(4.5),
        // paddingLeft: sp(8),
      },
      // input: {
      //   fontFamily: 'Maven Pro, sans-serif',
      //   fontSize: '1rem',
      //   fontWeight: 700,
      //   padding: sp(5, 8, 4.5, 2.5),
      // },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        position: 'relative',
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        ...theme.typography.body,
        position: 'absolute',
        bottom: -31,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      variant: 'filled',
      color: 'secondary',
    },
    styleOverrides: {
      root: {
        height: 'auto',
        // border: 0,
        borderRadius: shapeBorderRadiusBase * 2,
      },
      outlined: {
        // minWidth: 145,
        // padding: sp(4, 7.5, 3),
      },
      filled: {
        // padding: sp(2, 5),
        // color: '#3881ED',
        // backgroundColor: '#e2f7ff',
        marginTop: 0,
        marginLeft: 0,
        boxShadow: '0 3px 6px #e8e8e829',
      },
      sizeSmall: {
        padding: theme.spacing(2.5, 3, 2),
      },
      sizeMedium: {
        padding: theme.spacing(4.5, 5, 4),
      },
      label: {
        // fontFamily: 'Open Sans, sans-serif',
        // fontSize: '1rem', // 16px
        fontSize: '0.875rem', // 14px
        lineHeight: '1.125rem', // 18px
        fontWeight: 700,
        color: theme.palette.text.contrast,
        // padding: 0,
      },
      labelSmall: {
        // fontFamily: 'inherit',
        // fontSize: '0.875rem', // 14px
        // fontWeight: 600,
      },
    },
  },
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      square: true,
    },
    styleOverrides: {
      root: {
        // borderBottom: `1px solid ${theme.palette.divider}`,
        margin: theme.spacing(0, 0, 4),
        '&:before': {
          content: 'none',
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        alignItems: 'flex-start',
        backgroundColor: theme.palette.background.gray,
        padding: theme.spacing(3),
        borderRadius: shapeBorderRadiusBase * 9,
      },
      content: {
        alignItems: 'center',
        padding: 0,
        margin: 0,
        '&.Mui-expanded': {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        padding: theme.spacing(0, 5, 12, 17),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(0, 15, 22, 23),
        },
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {},
      text: {
        borderRadius: 0,
        fontSize: '0.875rem', // 14px
        color: theme.palette.common.black,
        margin: theme.spacing(0, 5),
        '&.Mui-selected, &.Mui-selected:hover': {
          position: 'relative',
          color: theme.palette.background.orange,
          backgroundColor: 'transparent',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '4px',
            borderRadius: '4px',
            backgroundColor: theme.palette.background.orange,
          },
        },
        '&:hover': {
          color: theme.palette.background.orange,
          backgroundColor: 'transparent',
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: { padding: theme.spacing(9, 4, 7.5) },
    },
  },
  // MuiSvgIcon: {
  //   defaultProps: {
  //     color: 'primary',
  //   }
  // }
};
// console.info(theme);

export default theme;
