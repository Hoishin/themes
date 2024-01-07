'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { switchPropDefs } from './switch.props';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SwitchElement = React.ElementRef<typeof SwitchPrimitive.Root>;
type SwitchOwnProps = GetPropDefTypes<typeof switchPropDefs>;
interface SwitchProps
  extends Omit<PropsWithoutRefOrColor<typeof SwitchPrimitive.Root>, 'children'>,
    MarginProps,
    SwitchOwnProps {}
const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    className,
    style,
    size = switchPropDefs.size.default,
    variant = switchPropDefs.variant.default,
    color = switchPropDefs.color.default,
    highContrast = switchPropDefs.highContrast.default,
    radius = switchPropDefs.radius.default,
    ...switchProps
  } = marginRest;
  return (
    <span
      data-radius={radius}
      className={classNames(
        'rt-SwitchRoot',
        getResponsiveClassNames({ className: 'rt-r-size', value: size }),
        `rt-variant-${variant}`,
        { 'rt-high-contrast': highContrast },
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    >
      <SwitchPrimitive.Root
        data-accent-color={color}
        {...switchProps}
        ref={forwardedRef}
        className={classNames('rt-SwitchButton', 'rt-reset', {
          'rt-high-contrast': highContrast,
        })}
      >
        <SwitchPrimitive.Thumb
          className={classNames('rt-SwitchThumb', { 'rt-high-contrast': highContrast })}
        />
      </SwitchPrimitive.Root>
    </span>
  );
});
Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
