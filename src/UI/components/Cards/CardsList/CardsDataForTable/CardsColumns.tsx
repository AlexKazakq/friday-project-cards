import React from 'react'

export interface ColumnCards {
  id: 'question' | 'answer' | 'updated' | 'grade'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}
export const CardsColumns = () => {
  const columns: ColumnCards[] = [
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
