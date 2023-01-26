import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

import { AppRootStateType } from '../../../../bll/store/store'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { useDebounce } from '../../../../hooks/useDebounce'

import s from './SearchInput.module.css'

type SearchInputType = {
  inputName: string
  searchSelector: (state: AppRootStateType) => string
  setSearch: ActionCreatorWithPayload<{ value: string }>
}
export const SearchInput = (props: SearchInputType) => {
  const search = useAppSelector(props.searchSelector)
  const [value, setValue] = useState(search)

  const debouncedValue = useDebounce<string>(value, 500)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(props.setSearch({ value: value }))
  }, [debouncedValue])
  useEffect(() => {
    search === '' && setValue(search)
  }, [search])
  let Search = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <div className={s.items}>
      <span className={s.title}>{props.inputName}</span>
      <FormControl size={'small'} fullWidth>
        <OutlinedInput
          id="outlined-adornment-amount"
          onChange={Search}
          value={value}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Provide your text"
        />
      </FormControl>
    </div>
  )
}
