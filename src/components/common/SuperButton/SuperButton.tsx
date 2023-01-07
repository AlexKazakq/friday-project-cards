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
  // (disabled
  //   ? ' ' + s.disabled
  //   : xType === 'red'
  //     ? ' ' + s.red
  //     : xType === 'secondary'
  //       ? ' ' + s.secondary
  //       : ' ' + s.default)
  // // + (className ? ' ' + className : '')) // задачка на смешивание классов
  const finalClassName = s.button + temp

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}

export default SuperButton
