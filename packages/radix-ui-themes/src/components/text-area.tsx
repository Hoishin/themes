import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import {
  defaultTextAreaSize,
  defaultTextAreaVariant,
  defaultTextAreaRadius,
} from './text-area.props';

import type { MarginProps, Radius, Responsive } from '../helpers';
import type { TextAreaSize, TextAreaVariant } from './text-area.props';

type TextAreaElement = React.ElementRef<'textarea'>;
interface TextAreaProps
  extends Omit<React.ComponentPropsWithRef<'textarea'>, 'color' | 'size'>,
    MarginProps {
  size?: Responsive<TextAreaSize>;
  variant?: TextAreaVariant;
  radius?: Radius;
}
const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultTextAreaSize,
    variant = defaultTextAreaVariant,
    radius = defaultTextAreaRadius,
    ...textAreaProps
  } = marginRest;
  return (
    <textarea
      data-radius={radius}
      {...textAreaProps}
      ref={forwardedRef}
      className={classNames(
        'rui-TextArea',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
TextArea.displayName = 'TextArea';

export { TextArea };
