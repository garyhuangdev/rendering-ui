import React, { ReactNode, FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classnames from 'classnames'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

interface InitialButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: ReactNode;
  href?: string;
}

// get all props in button
// intersect types with &
type BaseButtonProps = InitialButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = InitialButtonProps & AnchorHTMLAttributes<HTMLElement>

// set these props as optional
export type ButtonProps = Partial<BaseButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    btnType,
    children,
    href,
    ...restProps
  } = props;

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled,
  })

  // link button
  if (btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {

    // other types of button
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  btnType: 'default',
  disabled: false,
}

export default Button;