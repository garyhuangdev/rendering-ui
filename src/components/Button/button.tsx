import React from 'react'
import classnames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface InitialButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type BaseButtonProps = InitialButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = InitialButtonProps & React.AnchorHTMLAttributes<HTMLElement>


export type ButtonProps = Partial<BaseButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, children, href, ...restProps } = props

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
