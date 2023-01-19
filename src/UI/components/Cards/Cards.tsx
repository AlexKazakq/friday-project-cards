import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { CardsParamsType } from '../../../api/cards-api'
import { PATH } from '../../../assets/Routes/path'
import { packUserDataSelector, profileInfoSelector } from '../../../bll/selectors/selectors'
import { setCardsWithParamsTC } from '../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { useDebounce } from '../../../hooks/useDebounce'
import tableStyle from '../../styles/table.module.css'
import { SearchInput } from '../common/SearchInput/SearchInput'
import { TableHeader } from '../common/TableHeader/TableHeader'

import s from './cards.module.css'
import { CardsList } from './CardsList/CardsList'

export const Cards = () => {
  const profile = useAppSelector(profileInfoSelector)
  const packUserData = useAppSelector(packUserDataSelector)
  const [params, setParams] = useState<CardsParamsType>({ cardsPack_id: packUserData.packId })
  const [cardQuestionName, setCardQuestionName] = useState<string>('')
  const [cardAnswerName, setCardAnswerName] = useState<string>('')
  const debouncedValue = useDebounce<CardsParamsType>(params, 500)
  const dispatch = useAppDispatch()
  const title =
    profile._id === packUserData.packUserId ? 'My Pack' : `${packUserData.packUserName}'s Pack`
  const buttonTitle = profile._id === packUserData.packUserId ? 'Add new pack' : 'Learn to pack'

  useEffect(() => {
    if (packUserData.packId) {
      dispatch(setCardsWithParamsTC({ ...params, cardsPack_id: packUserData.packId }))
    }
  }, [debouncedValue])
  let SearchByCardQuestion = (name: string) => {
    setCardQuestionName(name)
    setParams({ ...params, cardQuestion: name })
  }

  let SearchByCardAnswer = (name: string) => {
    setCardAnswerName(name)
    setParams({ ...params, cardAnswer: name })
  }

  return (
    <div className={tableStyle.wrapper}>
      <div>
        <NavLink to={PATH.PACKS} className={s.back}>
          Back to Packs List
        </NavLink>
      </div>
      <TableHeader title={title} buttonName={buttonTitle} />
      <div className={s.filters}>
        <div className={s.items}>
          <SearchInput
            inputName={'Search by Question'}
            searchName={cardQuestionName}
            setParamName={SearchByCardQuestion}
          />
        </div>
        <div className={s.items}>
          <SearchInput
            inputName={'Search by Answer'}
            searchName={cardAnswerName}
            setParamName={SearchByCardAnswer}
          />
        </div>
      </div>
      {/*<div className={s.items}>*/}
      {/*  <span className={s.title}>Search</span>*/}
      {/*  <FormControl size={'small'} sx={{ width: '20%' }}>*/}
      {/*    <OutlinedInput*/}
      {/*      id="outlined-adornment-amount"*/}
      {/*      startAdornment={*/}
      {/*        <InputAdornment position="start">*/}
      {/*          <SearchIcon />*/}
      {/*        </InputAdornment>*/}
      {/*      }*/}
      {/*      placeholder="Provide your text"*/}
      {/*    />*/}
      {/*  </FormControl>*/}
      {/*</div>*/}
      <CardsList />
    </div>
  )
}
