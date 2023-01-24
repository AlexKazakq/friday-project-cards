import React, { useEffect, useState } from 'react'

import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { useSelector } from 'react-redux'

import { PacksParamsType } from '../../../../api/packs-api'
import { cardPacksMaxCountSelector, profileInfoSelector } from '../../../../bll/selectors/selectors'
import { setPacksWithParamsTC } from '../../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { useDebounce } from '../../../../hooks/useDebounce'
import { SearchInput } from '../../common/SearchInput/SearchInput'
import SuperRange from '../../common/SuperRange/SuperRange'
import { SupperToggleButton } from '../../common/ToggleButton/ToggleButton'

import s from './packsSetting.module.css'

export const PacksSetting = () => {
  const [params, setParams] = useState<PacksParamsType>({})
  const debouncedValue = useDebounce<PacksParamsType>(params, 500)
  const cardPacksMaxCount = useAppSelector(cardPacksMaxCountSelector)
  const [isMyPacks, SetIsMyPacks] = useState<boolean>(false)
  const [packName, setPackName] = useState<string>('')
  const dispatch = useAppDispatch()
  const profileInfo = useAppSelector(profileInfoSelector)
  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number>(0)

  useEffect(() => {
    dispatch(setPacksWithParamsTC({ ...params }))
  }, [debouncedValue])

  useEffect(() => {
    setValue2(cardPacksMaxCount)
  }, [cardPacksMaxCount])

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

  let SearchByPackName = (name: string) => {
    setPackName(name)
    setParams({ ...params, packName: name })
  }
  const showMyOrAllPacks = (isMyPacks: boolean) => {
    SetIsMyPacks(isMyPacks)
    isMyPacks
      ? setParams({ ...params, user_id: profileInfo._id })
      : setParams({ ...params, user_id: undefined })
  }
  const clearFilter = () => {
    SetIsMyPacks(false)
    setPackName('')
    setValue1(0)
    setValue2(cardPacksMaxCount)
    setParams({
      ...params,
      packName: undefined,
      user_id: undefined,
      min: undefined,
      max: undefined,
    })
  }

  return (
    <div className={s.wrapper}>
      <SearchInput inputName={'Search'} searchName={packName} setParamName={SearchByPackName} />
      {/*<div className={s.items}>*/}
      {/*  <span className={s.title}>Search</span>*/}
      {/*  <FormControl size={'small'} fullWidth>*/}
      {/*    <OutlinedInput*/}
      {/*      id="outlined-adornment-amount"*/}
      {/*      onChange={SearchByPackName}*/}
      {/*      value={packName}*/}
      {/*      startAdornment={*/}
      {/*        <InputAdornment position="start">*/}
      {/*          <SearchIcon />*/}
      {/*        </InputAdornment>*/}
      {/*      }*/}
      {/*      placeholder="Provide your text"*/}
      {/*    />*/}
      {/*  </FormControl>*/}
      {/*</div>*/}
      <div className={s.items}>
        <span className={s.title}>Show packs card</span>
        <div>
          <SupperToggleButton
            firstValue={'My'}
            secondValue={'All'}
            isMyPacks={isMyPacks}
            showMyOrAllPacks={showMyOrAllPacks}
          />
        </div>
      </div>
      <div className={s.items}>
        <span className={s.title}>Number of cards</span>

        <div>
          <span className={s.leftCount}>{value1}</span>
          <SuperRange onChange={change} value={[value1, value2]} max={cardPacksMaxCount} />
          <span className={s.rightCount}>{value2}</span>
        </div>
      </div>
      <div className={s.items}>
        <CleaningServicesIcon onClick={clearFilter} />
      </div>
    </div>
  )
}
