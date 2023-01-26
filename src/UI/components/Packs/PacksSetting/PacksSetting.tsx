import React from 'react'

import { searchPackSelector } from '../../../../bll/selectors/selectors'
import { setSearchPack } from '../../../../bll/store/packs-reducer'
import { SearchInput } from '../../common/SearchInput/SearchInput'

import { ClearFilter } from './ClearFilter/ClearFilter'
import { MyOrAllPacks } from './MyOrAllPacksFilter/MyOrAllPacks'
import s from './packsSetting.module.css'
import { SliderCountsCards } from './SliderCountsCards/SliderCountsCards'

export const PacksSetting = () => {
  return (
    <div className={s.wrapper}>
      <SearchInput
        inputName={'Search'}
        searchSelector={searchPackSelector}
        setSearch={setSearchPack}
      />
      <MyOrAllPacks />
      <SliderCountsCards />
      <ClearFilter />
    </div>
  )
}
