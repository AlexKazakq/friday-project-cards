import React from 'react'

import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { useSelector } from 'react-redux'

import { SearchInput } from '../../common/SearchInput/SearchInput'
import SuperRange from '../../common/SuperRange/SuperRange'
import { SupperToggleButton } from '../../common/ToggleButton/ToggleButton'

import s from './packsSetting.module.css'

type PacksSettingType = {
  packName: string
  isMyPacks: boolean
  minValue: number
  maxValue: number
  cardPacksMaxCount: number
  searchByPackName: (packName: string) => void
  showMyOrAllPacks: (isMyPacks: boolean) => void
  clearFilter: () => void

  changeNumberOfCards: (event: Event, value: number | number[]) => void
}
export const PacksSetting = (props: PacksSettingType) => {
  let SearchByPackName = (name: string) => {
    props.searchByPackName(name)
  }
  const showMyOrAllPacks = (isMyPacks: boolean) => {
    props.showMyOrAllPacks(isMyPacks)
  }

  return (
    <div className={s.wrapper}>
      <SearchInput
        inputName={'Search'}
        searchName={props.packName}
        setParamName={SearchByPackName}
      />
      <div className={s.items}>
        <span className={s.title}>Show packs card</span>
        <div>
          <SupperToggleButton
            firstValue={'My'}
            secondValue={'All'}
            isMyPacks={props.isMyPacks}
            showMyOrAllPacks={showMyOrAllPacks}
          />
        </div>
      </div>
      <div className={s.items}>
        <span className={s.title}>Number of cards</span>

        <div>
          <span className={s.leftCount}>{props.minValue}</span>
          <SuperRange
            onChange={props.changeNumberOfCards}
            value={[props.minValue, props.maxValue]}
            max={props.cardPacksMaxCount}
          />
          <span className={s.rightCount}>{props.maxValue}</span>
        </div>
      </div>
      <div className={s.items}>
        <CleaningServicesIcon onClick={props.clearFilter} />
      </div>
    </div>
  )
}
