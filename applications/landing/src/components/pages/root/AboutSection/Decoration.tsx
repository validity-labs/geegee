/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';

import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useIntersection } from 'react-use';

const Root = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: ['100%', 'calc(100% - 20px)'],
  height: '270px',
  overflwo: 'hidden',
  pointerEvents: 'none',
  userSelect: 'none',
  '.LabDecoration-wrapper': {
    position: 'relative',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  '.LabDecoration-bottom, .LabDecoration-right': {
    position: 'absolute',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      filter: 'blur(40px)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      boxShadow: '3px 3px 3px #5c0060cc',
      background: 'white',
      zIndex: 1,
    },
  },
  '.LabDecoration-bottom': {
    bottom: 0,
    left: 0,
    right: 30,
    height: '20px',
    '&::before': {
      left: 0,
      right: 0,
      top: -30,
      height: 80,
      width: '100%',
      background: 'linear-gradient(90deg,  #b80eff, #ff00fe)',
    },
  },
  '.LabDecoration-right': {
    top: 0,
    right: 30,
    width: '20px',
    height: '100%',
    '&::before': {
      top: 0,
      right: -30,
      bottom: 0,
      width: 80,
      height: '100%',
      background: 'linear-gradient(180deg,  #b80eff, #ff00fe)',
    },
  },
  '.LabDecoration-circles': {
    position: 'absolute',
    top: -40,
    right: -10,
    display: 'flex',
    zIndex: 1,
    img: {
      position: 'relative',
      width: 99,
      height: 99,
      borderRadius: '100%',
      '&:nth-of-type(1)': {
        order: 3,
      },
      '&:nth-of-type(2)': {
        top: -80,
        left: -15,
        order: 2,
      },
      '&:nth-of-type(3)': {
        top: 15,
        left: -40,
        order: 1,
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    width: '50%',
    height: '420px',
    '.LabDecoration-circles': {
      right: 90,
      transform: 'translate(100%, -50%)',
      img: {
        '&:nth-of-type(1)': {
          order: 1,
        },
        '&:nth-of-type(2)': {
          order: 2,
        },
        '&:nth-of-type(3)': {
          order: 3,
        },
      },
    },
  },
}));

const imagePaths = [
  '/images/landing/circle.svg',
  '/images/landing/john-doe.jpg',
  '/images/landing/ring.svg',
]

const Decoration = () => {
  const neonRef = useRef(null);

  const [glanced, setGlanced] = useState(false);

  const { isIntersecting = false } = useIntersection(neonRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  }) || {};

  useEffect(() => {
    if (!glanced && isIntersecting) {
      setGlanced(true);
    }
  }, [glanced, isIntersecting]);

  return (
    <Root ref={neonRef}>
      <div className={clsx('LabDecoration-wrapper', { 'Lab-flicker': glanced })}>
        <div className="LabDecoration-bottom" />
        <div className="LabDecoration-right" />
      </div>
      <div className="LabDecoration-circles">
        {imagePaths.map((path) => <img key={path} alt="" src={path} width={99} height={99} />)}
      </div>
    </Root>
  );
};

export default Decoration;
