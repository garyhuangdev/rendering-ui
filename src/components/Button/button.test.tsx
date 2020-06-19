import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

// other props provided in button.tsx defaultProps
const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'testClassName'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}
describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>TEST BUTTON</Button>)
    const element = wrapper.getByText('TEST BUTTON') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()

    // test onClick
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the component corresponding to props', () => {
    const wrapper = render(<Button {...testProps}>TEST BUTTON</Button>)
    const element = wrapper.getByText('TEST BUTTON')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg testClassName')
  })

  it('should render link when type is link and have a href', () => {
    const wrapper = render(<Button btnType='link' href="http://testlinkurl">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()

    // render a link
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when has disabled prop', () => {
    const wrapper = render(<Button {...disabledProps}>TEST BUTTON</Button>)
    const element = wrapper.getByText('TEST BUTTON') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()

    // test onClick
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})