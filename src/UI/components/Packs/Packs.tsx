import React, { useState } from 'react'

import { profileInfoSelector } from '../../../bll/selectors/selectors'
import { useAppSelector } from '../../../hooks/hooks'

import s from './packs.module.css'
import { PacksHeader } from './PacksHeader/PacksHeader'
import { PacksList } from './PacksList/PacksList'
import { PacksSetting } from './PacksSetting/PacksSetting'

export const Packs = () => {
  const profileInfo = useAppSelector(profileInfoSelector)
  const [packName, setPackName] = useState<string>('')
  const [alignment, setAlignment] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  const SearchByPackName = (packName: string) => {
    setPackName(packName)
  }
  const filterShowMyOrAllPacks = (alignment: string) => {
    setAlignment(alignment)
    alignment === 'My' ? setUserId(profileInfo._id) : ' '
    console.log(profileInfo._id)
  }

  return (
    <div className={s.wrapper}>
      <PacksHeader />
      <PacksSetting
        SearchByPackName={SearchByPackName}
        filterShowMyOrAllPacks={filterShowMyOrAllPacks}
      />
      <PacksList packName={packName} user_id={userId} />
    </div>
  )
}
