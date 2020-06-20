import React, { FC, useState, createContext, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  // initial active item
  initialIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: CSSProperties;
  onSelect?: (selectedIndex: string) => void;
  // subMenu open by default if it's vertical
  initialOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  initialOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })
export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, children, initialIndex, onSelect, initialOpenSubMenus } = props
  const [currentActive, setActive] = useState(initialIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    initialOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has non-MenuItem inside")
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  initialIndex: '0',
  mode: 'horizontal',
  initialOpenSubMenus: [],
}

export default Menu;
