import React from 'react'

function Alert({alert}) {
  return (
    // have a conditional to add a class depending of the error state
    <div className={`${alert.error1 ? "from-red-400 to-red-600" : "from-green-400 to-green-600"} 
    bg-gradient-to-br text-center mb-1 p-3 rounded-xl uppercase text-white font-bold text-sm`}> 
  
      {alert.msg}

    </div>
  )
}

export default Alert