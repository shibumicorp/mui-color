/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import HSVGradient from './HSVGradient';
import ColorInput from '../ColorInput';
import ColorPalette from '../ColorPalette';
import HueSlider from './HueSlider';
import AlphaSlider from './AlphaSlider';
import { getCssColor, parse as colorParse, validateColor } from '../../helpers/colorTool';
import uncontrolled from '../../helpers/uncontrolled';
import * as CommonTypes from '../../helpers/commonTypes';
import useTranslate from '../../helpers/useTranslate';

const ColorBox = ({
  value,
  palette,
  inputFormats,
  deferred,
  onChange: _onChange,
  disableAlpha,
  hslGradient,
  ...props
}) => {
  const { t, i18n } = useTranslate();
  let color = validateColor(value, disableAlpha, t, i18n.language);
  let onChange = _onChange;
  let onDeferredChange;
  if (deferred) {
    [color, onChange] = React.useState(color);
    onDeferredChange = _onChange;
  }

  const { hsv, hsl } = color;
  let { alpha } = color;
  alpha = alpha === undefined ? 100 : Math.floor(alpha * 100);
  const cssColor = getCssColor(color, 'hex', true);
  const { backgroundColor } = color.css;
  const boxWidth = 320;

  const handleSet = () => {
    onDeferredChange(color);
  };

  const handleHueChange = (event, newValue) => {
    const c = colorParse([newValue, color.hsv[1], color.hsv[2]], 'hsv');
    onChange(c);
  };

  const handleAlphaChange = (event, newValue) => {
    const alphaVal = newValue / 100;
    const c = colorParse([color.rgb[0], color.rgb[1], color.rgb[2], alphaVal], 'rgb');
    onChange(c);
  };

  const handleSVChange = hsvVal => {
    const c = colorParse(hsvVal, hslGradient ? 'hsl' : 'hsv');
    onChange(c);
  };

  const handlePaletteSelection = (name, colour) => {
    const c = colorParse(colour);
    // To handle back the translated name
    c.name = name;
    onChange(c);
  };

  const handleInputChange = newValue => {
    const c = colorParse(newValue);
    onChange(c);
  };

  const displayInput = () =>
    inputFormats.length > 0 && (
      <ColorBoxInputs className="muicc-colorbox-inputs">
        <ColorBoxColorBG className="muicc-colorbox-colorBg">
          <ColorBoxColor
            className="muicc-colorbox-color"
            colorError={!!color.error}
            backgroundColor={backgroundColor}
          />
        </ColorBoxColorBG>
        {inputFormats.map(input => (
          <ColorInput
            key={input}
            value={color}
            format={input}
            disableAlpha
            enableErrorDisplay={false}
            className="muicc-colorbox-input"
            onChange={handleInputChange}
          />
        ))}
      </ColorBoxInputs>
    );

  return (
    <Root p={2} {...props}>
      <Box sx={{ justifyContent: 'space-around', overflow: 'hidden', width: boxWidth, padding: 0 }}>
        <StyledHSVGradient
          className="muicc-colorbox-hsvgradient"
          color={color}
          boxWidth={boxWidth}
          onChange={handleSVChange}
          isHsl={hslGradient}
        />
        <ColorBoxSliders className="muicc-colorbox-sliders" boxWidth={boxWidth}>
          <HueSlider
            data-testid="hueslider"
            aria-label="color slider"
            value={hslGradient ? hsl[0] : hsv[0]}
            min={0}
            max={360}
            onChange={handleHueChange}
          />
          {!disableAlpha && (
            <AlphaSlider
              data-testid="alphaslider"
              color={cssColor}
              valueLabelDisplay="auto"
              aria-label="alpha slider"
              value={alpha}
              min={0}
              max={100}
              onChange={handleAlphaChange}
            />
          )}
        </ColorBoxSliders>
        {displayInput(inputFormats)}
        {palette && (
          <>
            <Divider />
            <ColorPalette
              size={26.65}
              palette={palette}
              onSelect={handlePaletteSelection}
              disableAlpha={disableAlpha}
            />
          </>
        )}
        <ColorBoxControls className="muicc-colorbox-controls">
          {color.error && (
            <ColorBoxError className="muicc-colorbox-error" data-testid="colorbox-error">
              {t(color.error)}
            </ColorBoxError>
          )}
          {deferred && <Button onClick={handleSet}>{t('Set')}</Button>}
        </ColorBoxControls>
      </Box>
    </Root>
  );
};

ColorBox.propTypes = {
  value: CommonTypes.color,
  deferred: PropTypes.bool,
  palette: CommonTypes.palette,
  inputFormats: CommonTypes.inputFormats,
  onChange: PropTypes.func.isRequired,
  /**
    Don't use alpha
   */
  disableAlpha: PropTypes.bool,
  hslGradient: PropTypes.bool,
};

ColorBox.defaultProps = {
  value: undefined,
  deferred: false,
  palette: undefined,
  inputFormats: ['hex', 'rgb'],
  disableAlpha: false,
  hslGradient: false,
};

const Root = styled(Box)(({ theme }) => ({
  // Ugly fix for beta 1
  backgroundColor: theme.palette ? theme.palette.background.paper : 'fff',
  position: 'relative',
  width: 'min-content',
  height: 'min-content',
  padding: '0px',
}));

const StyledHSVGradient = styled(HSVGradient, { shouldForwardProp: propName => propName !== 'boxWidth' })(
  ({ theme, ...props }) => ({
    width: `calc(${props.boxWidth}px - 16px)`,
    height: 'calc(128px - 16px)',
    margin: 8,
  }),
);

const ColorBoxSliders = styled('div', { shouldForwardProp: propName => propName !== 'boxWidth' })(
  ({ theme, ...props }) => ({
    width: props.boxWidth,
    padding: '8px 8px 4px 8px',
  }),
);

const ColorBoxInputs = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '8px 4px 8px 8px',
  justifyContent: 'space-between',
}));

const ColorBoxColorBG = styled('div')(() => ({
  width: 48,
  height: 48,
  background:
    'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)',
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
  backgroundColor: 'white',
  borderRadius: 4,
}));

const ColorBoxError = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  lineHeight: '36.5px',
}));

const ColorBoxColor = styled('div', {
  shouldForwardProp: propName => propName !== 'colorError' && propName !== 'backgroundColor',
})(({ theme, ...props }) => ({
  width: 48,
  height: 48,
  background: props.colorError
    ? `repeating-linear-gradient(
      135deg,
      transparent,
      transparent 29px,
      #f44336 29px,
      #f44336 32px
    )`
    : 'none',
  backgroundColor: props.colorError ? 'transparent' : props.backgroundColor,
  borderRadius: 4,
  border: props.colorError ? '2px solid #f44336' : 'none',
}));

const ColorBoxControls = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 8,
  '&> button': {
    marginLeft: 'auto',
  },
}));

export default uncontrolled(ColorBox);
