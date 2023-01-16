import React from 'react'

import s from '../../styles/table.module.css'
import { TableHeader } from '../common/TableHeader/TableHeader'

import { PacksList } from './PacksList/PacksList'
import { PacksSetting } from './PacksSetting/PacksSetting'

export const Packs = () => {
  return (
    <div className={s.wrapper}>
      <TableHeader title={'Packs list'} buttonName={'Add new pack'} />
      <PacksSetting />
      <PacksList />
    </div>
  )
}
