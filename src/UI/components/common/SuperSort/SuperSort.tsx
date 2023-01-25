import React from 'react'

import downIconImg from '../../../../assets/images/down.png'
import noneIconImg from '../../../../assets/images/noneIcon.png'
import upIconImg from '../../../../assets/images/up.png'

import s from './SuperSort.module.css'

const downIcon = downIconImg
const upIcon = upIconImg
const noneIcon = noneIconImg

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  if (sort === down) {
    return up
  } else if (sort === up) {
    return ''
  } else {
    return down
  }
}

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'sort' }) => {
  const up = '1' + value
  const down = '0' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  let icon = ''

  if (sort === down) {
    icon = downIcon
  } else if (sort === up) {
    icon = upIcon
  } else icon = noneIcon

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      <img className={s.imgIcon} id={id + '-icon-' + sort} src={icon} />
    </span>
  )
}

export default SuperSort
