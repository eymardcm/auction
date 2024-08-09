'use client'

import { useParamsStore } from '@/hooks/useParamsStore'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search() {

    const setParams = useParamsStore(state => state.setParams)
    const setSearchValue = useParamsStore(state => state.setSearchValue)
    const searchValue = useParamsStore(state => state.searchValue)

    function onChange(e: any) {
        setSearchValue(e.target.value)
    }

    function search() {
        setParams({searchTerm: searchValue})
    }

    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input 
                type='text'
                placeholder='Search for cars by make, model, or color'
                onChange={onChange}
                onKeyDown={(e: any) => {
                    if (e.key === 'Enter') search()
                }}
                value={searchValue}
                className='
                    flex-grow
                    pl-5
                    bg-transparent
                    focus:outline-none
                    border-transparent
                    focus:border-transparent
                    focus:ring-0
                    text-sm
                    text-gray-600
                '
            />
            <button
                onClick={search}
                 className='pr-5'>
                <FaSearch size={20} 
                    className='cursor-pointer mx-2' />
            </button>
        </div>
    )
}
