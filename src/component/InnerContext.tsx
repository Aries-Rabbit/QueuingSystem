import React from 'react'
import { Outlet } from 'react-router-dom'

export const InnerContext = () => {
  return (
    <div><Outlet/></div>
  )
}
