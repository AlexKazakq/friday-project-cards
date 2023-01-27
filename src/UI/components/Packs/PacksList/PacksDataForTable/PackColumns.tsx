import React from 'react'

export interface ColumnPacks {
  id: 'name' | 'cardsCount' | 'updated' | 'created' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}
export const PackColumns = () => {
  const columns: ColumnPacks[] = [
    { id: 'name', label: 'Name' },
    { id: 'cardsCount', label: 'Cards' },
    {
      id: 'updated',
      label: 'Last Updated',
    },
    {
      id: 'created',
      label: 'Created by',
    },
    {
      id: 'actions',
      label: 'Actions',
    },
  ]

  return columns
}
