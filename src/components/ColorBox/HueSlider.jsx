/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { styled } from '@mui/material/styles';
import Slider, { sliderClasses } from '@mui/material/Slider';

function HueSlider(props) {
  return <StyledSlider {...props} />;
}

const StyledSlider = styled(Slider)(() => ({
  width: '100%',
  height: 16,
  padding: 0,
  [`& .${sliderClasses.rail}`]: {
    height: 16,
    opacity: 1,
    background:
      'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100% ) repeat scroll 0% 0%',
    borderRadius: 0,
  },
  [`& .${sliderClasses.track}`]: {
    height: 16,
    opacity: 0,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  [`& .${sliderClasses.thumb}`]: {
    width: 16,
    height: 16,
    marginTop: 0,
    marginLeft: -8,
    backgroundColor: '#f0f0f0',
    boxShadow: 'rgba(0, 0, 0, 0.37) 0px 1px 4px 0px',

    '&:focus': {
      boxShadow: '0px 0px 0px 8px rgba(63, 81, 181, 0.16)',
    },
  },
}));

export default HueSlider;
