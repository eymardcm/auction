'use client'

import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard'
import AppPagination from '../components/AppPagination'
import { Auction, PagedResult } from '@/types'
import { getData } from './auctionActions'
import Filters from './Filters'
import { useParamsStore } from '@/hooks/useParamsStore'
import { shallow } from 'zustand/shallow'
import qs from 'query-string'

export default function Listings() {

  const [data, setData] = useState<PagedResult<Auction>>()

  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm
  }), shallow)

  const setParams = useParamsStore(state => state.setParams)

  const query = qs.stringifyUrl({url: '', query: params})

  function setPageNumber(pageNumber: number) {
    setParams({pageNumber})
  }

  function setPageSize(pageSize: number) {
    setParams({pageSize})
  }

  useEffect(() => {
    getData(query).then(data => {
      setData(data)
    })
  }, [query])

  if (!data) return <h3>Loading ...</h3>

  return (
    <>
      <Filters />
      <div className='grid grid-cols-4 gap-6'>
        {data && data.results.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination currentPage={params.pageNumber} pageCount={data.pageCount} pageChanged={setPageNumber}/>
      </div>
    </>

  )
}
