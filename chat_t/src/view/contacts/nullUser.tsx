import React from 'react'

export default function NullUser() {
  return (
    <div style={{
      display: 'flex',
      height: '100%',
      textAlign: 'center',
      marginLeft: '20px',
      marginRight: '20px',
      backgroundColor: "transparent",
      border: '1px solid rgba(140, 140, 140, 0.35)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div
        style={{
          fontSize: '50px',
          color: 'rgb(100,100,100)'
        }}
      >CHAT</div>
    </div>
  )
}
