import React from 'react'

const Alert = (message) => {
  return (
    <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md max-w-max" role="alert">
      <div>
        <p className="text-sm">{message.message}</p>
      </div>
    </div>

  )
}

export default Alert