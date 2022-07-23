import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { setPage } from '../../../store/appSlice/actions/appActions'
import { Pages } from '../../../enums'
export const Profile: FC = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setPage(Pages.main))
  }
  return (
    <button type="button" onClick={handleClick}>
      close
    </button>
  )
}
