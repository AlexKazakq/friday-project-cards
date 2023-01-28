import React from 'react'

export interface ColumnCards {
  id: 'question' | 'answer' | 'updated' | 'grade' | 'cover'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}
export const CardsColumns = () => {
  const columns: ColumnCards[] = [
    { id: 'cover', label: '' },
    { id: 'question', label: 'Question' },
    { id: 'answer', label: 'Answer' },
    {
      id: 'updated',
      label: 'Last Updated',
    },
    {
      id: 'grade',
      label: 'Grade',
    },
  ]

  return columns
}
