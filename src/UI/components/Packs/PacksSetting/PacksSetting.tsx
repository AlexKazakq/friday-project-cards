import React, { ChangeEvent, useCallback, useState } from 'react'

import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'

import SuperRange from '../../common/SuperRange/SuperRange'
import { SupperToggleButton } from '../../common/ToggleButton/ToggleButton'

import s from './packsSetting.module.css'

export type PacksSettingType = {
  SearchByPackName: (packName: string) => void
  filterShowMyOrAllPacks: (alignment: string) => void
}

export const PacksSetting = (props: PacksSettingType) => {
  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number>(10)
  const [packName, setPackName] = useState<string>('')
  const change = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      let [a, b] = value

      setValue1(a)
      setValue2(b)
    } else {
      setValue1(value)
    }
  }

  let SearchByPackName = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPackName(e.currentTarget.value)
    props.SearchByPackName(e.currentTarget.value)
  }, [])

  let filterShowMyOrAllPacks = useCallback((alignment: string) => {
    props.filterShowMyOrAllPacks(alignment)
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.items}>
        <span className={s.title}>Search</span>
        <FormControl size={'small'} fullWidth>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={SearchByPackName}
            value={packName}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Provide your text"
          />
        </FormControl>
      </div>
      <div className={s.items}>
        <span className={s.title}>Show packs card</span>
        <div>
          <SupperToggleButton
            firstValue={'My'}
            secondValue={'All'}
            filterShowMyOrAllPacks={filterShowMyOrAllPacks}
          />
        </div>
      </div>
      <div className={s.items}>
        <span className={s.title}>Number of cards</span>

        <div>
          <span className={s.leftCount}>{value1}</span>
          <SuperRange onChange={change} value={[value1, value2]} max={10} />
          <span className={s.rightCount}>{value2}</span>
        </div>
      </div>
      <div className={s.items}>
        <div></div>
        <CleaningServicesIcon />
      </div>
    </div>
  )
}
