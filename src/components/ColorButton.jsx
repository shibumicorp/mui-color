/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import * as ColorTool from '../helpers/colorTool';
import * as CommonTypes from '../helpers/commonTypes';
import useTranslate from '../helpers/useTranslate';

/**
- Use a ColorButton to select a predefined color by clicking on this button.
- If the color is not valid or transparent a crossed background is displayed.
 */
const ColorButton = ({
  color: c,
  size,
  borderWidth,
  borderColor,
  forwardRef,
  tooltip,
  disableAlpha,
  className,
  ...props
}) => {
  const { t, i18n } = useTranslate();
  const color = ColorTool.validateColor(c, disableAlpha, t, i18n.language);
  const translated = t(tooltip);
  const cssColor = color.css;
  let l = color.hsl[2] - 10;
  if (l < 30) l = color.hsl[2] + 50;
  const a = color.alpha;
  const hoverColor = `hsl(${color.hsl[0]}, ${color.hsl[1]}%, ${l}%, ${a})`;
  const styledButtonProps = {
    width: size,
    minWidth: size,
    height: size,
    hoverColor,
    borderColor,
    borderWidth,
    alpha: a,
    colorError: !!color.error,
    ...cssColor,
  };
  const component = (
    <StyledButton
      data-testid="colorbutton"
      className={className}
      ref={forwardRef}
      variant="contained"
      aria-label={color.name}
      {...styledButtonProps}
      {...props}
    >
      <div />
    </StyledButton>
  );
  if (tooltip) {
    return (
      <Tooltip title={translated}>
        <div style={{ width: 'min-content' }}>{component}</div>
      </Tooltip>
    );
  }
  return component;
};

const StyledButton = styled(Button, {
  shouldForwardProp: propName =>
    propName !== 'colorError' &&
    propName !== 'alpha' &&
    propName !== 'backgroundColor' &&
    propName !== 'borderColor' &&
    propName !== 'borderWidth' &&
    propName !== 'width' &&
    propName !== 'minWidth' &&
    propName !== 'height' &&
    propName !== 'hoverColor',
})(({ theme, ...props }) => ({
  backgroundImage:
    props.colorError || props.alpha < 1
      ? `
    linear-gradient(45deg, #ccc 25%, transparent 25%), 
    linear-gradient(135deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(135deg, transparent 75%, #ccc 75%)`
      : 'none',
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
  backgroundColor: props.backgroundColor || '#fff',
  boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
  borderColor: props.borderColor || '#767676',
  borderStyle: 'solid',
  borderWidth: props.borderWidth || 0,
  borderRadius: 4,
  padding: 0,
  width: props.width,
  minWidth: props.minWidth,
  height: props.height,
  '& div': {
    content: '" "',
    background: props.colorError
      ? `repeating-linear-gradient(
              135deg,
              transparent,
              transparent ${props.width / 2 + 2}px,
              #f44336 ${props.width / 2 + 2}px,
              #f44336 ${props.width / 2 + 4}px
            )`
      : 'none',
    backgroundColor: props.colorError ? 'transparent' : props.backgroundColor || '#fff',
    width: props.width,
    minWidth: props.minWidth,
    height: props.height,
    border: props.colorError
      ? '2px solid #f44336'
      : `${props.borderWidth || 0}px solid ${props.borderColor || '#767676'}`,
    borderRadius: 4,
    padding: 0,
  },
  '&:hover div': {
    backgroundColor: props.hoverColor,
  },
  '&:active': {
    boxShadow: 'none',
  },

  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.5)',
  },
}));

ColorButton.propTypes = {
  className: PropTypes.string,

  /**
    The color to display, could be a css valid string, an integer, or a Color object see  ColorType
   */
  color: CommonTypes.color.isRequired,
  /**
    The size of the button in pixel
   */
  size: PropTypes.number,
  /**
    Don't use alpha
   */
  disableAlpha: PropTypes.bool,
  /**
    The width of the button's border, not displayed if borderWidth=0
   */
  borderWidth: PropTypes.number,
  /**
    The css color of the button's border, not displayed if borderWidth=0
   */
  borderColor: PropTypes.string,
  /**
    A tooltip could be added to the button to display the color name or value
   */
  tooltip: PropTypes.string,
  /**
    Internal usage
   */
  forwardRef: PropTypes.shape({ current: PropTypes.elementType }),
};

ColorButton.defaultProps = {
  className: '',
  size: 24,
  borderWidth: 0,
  borderColor: undefined,
  forwardRef: undefined,
  tooltip: undefined,
  disableAlpha: false,
};

export default ColorButton;
