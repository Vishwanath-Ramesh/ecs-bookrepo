import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'

import './Backdrop.css'

const FFBackdrop = () => {
  return (
    <Backdrop className="backdrop" open>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default React.forwardRef(FFBackdrop)
