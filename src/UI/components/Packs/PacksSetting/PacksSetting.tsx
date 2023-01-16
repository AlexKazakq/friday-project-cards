import React, { ChangeEvent, useEffect, useState } from 'react'

import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'

import { PacksParamsType } from '../../../../api/packs-api'
import { cardPacksMaxCountSelector } from '../../../../bll/selectors/selectors'
import { setPacksWithParamsTC } from '../../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { useDebounce } from '../../../../hooks/useDebounce'
import SuperRange from '../../common/SuperRange/SuperRange'
import { SupperToggleButton } from '../../common/ToggleButton/ToggleButton'

import s from './packsSetting.module.css'

export const PacksSetting = () => {
  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number>(53)
  const [packName, setPackName] = useState<string>('')
  const [params, setParams] = useState<PacksParamsType>({})
  const dispatch = useAppDispatch()
  const debouncedValue = useDebounce<PacksParamsType>(params, 500)
  const cardPacksMaxCount = useAppSelector(cardPacksMaxCountSelector)

  const change = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      let [a, b] = value

      setValue1(a)
      setValue2(b)
      setParams({ ...params, min: a, max: b })
    } else {
      setValue1(value)
    }
  }

  let SearchByPackName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPackName(e.currentTarget.value)
    setParams({ ...params, packName: e.currentTarget.value })
  }
  const changeToggleButton = (userId: string) => {
    setParams({ ...params, user_id: userId })
  }
  const clearFilter = () => {
    console.log('clearFilter')
    setParams({})
  }

  useEffect(() => {
    dispatch(setPacksWithParamsTC({ ...params }))
  }, [debouncedValue])

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
            changeToggleButton={changeToggleButton}
          />
        </div>
      </div>
      <div className={s.items}>
        <span className={s.title}>Number of cards</span>

        <div>
          <span className={s.leftCount}>{value1}</span>
          <SuperRange onChange={change} value={[value1, value2]} max={cardPacksMaxCount} />
          <span className={s.rightCount}>{cardPacksMaxCount}</span>
        </div>
      </div>
      <div className={s.items}>
        <CleaningServicesIcon onClick={clearFilter} />
      </div>
    </div>
  )
}
