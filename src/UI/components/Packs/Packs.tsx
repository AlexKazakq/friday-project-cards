import React from 'react'

import s from './packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'
import { PacksList } from './PacksList/PacksList'
import { PacksSetting } from './PacksSetting/PacksSetting'

export const Packs = () => {
  return (
    <div className={s.wrapper}>
      <PacksHeader />
      <PacksSetting />
      <PacksList />
    </div>
  )
}
