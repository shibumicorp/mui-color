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
import * as CommonTypes from '../../helpers/commonTypes';

function AlphaSlider({ color, ...props }) {
  return <StyledSlider {...props} color={color} />;
}

const StyledSlider = styled(Slider, { shouldForwardProp: propName => propName !== 'color' })(({ theme, ...props }) => ({
  color: '#666',
  width: '100%',
  height: 16,
  padding: 0,
  background:
    'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)',
  backgroundSize: '8px 8px',
  backgroundColor: 'white',
  backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
  [`& .${sliderClasses.rail}`]: {
    height: 16,
    opacity: 1,
    background: `rgba(0, 0, 0, 0) linear-gradient(to right, ${props.color}00 0%, ${props.color} 100%) repeat scroll 0% 0%`,
    borderRadius: 0,
  },
  [`& .${sliderClasses.track}`]: {
    height: 16,
    opacity: 0,
    borderRadius: 4,
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

AlphaSlider.propTypes = {
  color: CommonTypes.color.isRequired,
};

export default AlphaSlider;
