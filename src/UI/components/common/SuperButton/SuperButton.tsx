import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  let temp

  if (disabled) {
    temp = ' ' + s.disabled
  } else if (xType === 'red') {
    temp = ' ' + s.red
  } else if (xType === 'secondary') {
    temp = ' ' + s.secondary
  } else {
    temp = ' ' + s.default
  }

  const finalClassName = s.secondary + s.button

  return <button disabled={disabled} className={s.secondary} {...restProps} />
}

export default SuperButton
