import React from 'react'
import downArrow from './../../../../icons/down-arrow.svg'
import upArrow from './../../../../icons/up-arrow.svg'
import sortArrow from './../../../../icons/arrow-sort.svg'
import s from './../../HW15.module.css'

// добавить в проект иконки и импортировать
const downIcon = downArrow
const upIcon = upArrow
const noneIcon = sortArrow

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {

    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    return sort===down? up:sort===up? '':down
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            <img
                className={s.img}
                id={id + '-icon-' + sort}
                src={icon}
            />

            {/*{icon} /!*а это убрать*!/*/}
        </span>
    )
}

export default SuperSort
