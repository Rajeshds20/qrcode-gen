import { useState } from 'react'
import './App.css'
import QRCode from 'qrcode'


function App() {

  const [text, setText] = useState('');
  const [qrcode, setQRCode] = useState(null)

  const generateCode = () => {
    if (text === '') {
      setQRCode(null)
      return
    }
    QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      width: 340,
      height: 340,
    }).then(setQRCode)
  }

  return (
    <>
      <h1>QR Code Generator</h1>
      <center>
        {/* Add paste option with icon */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          gap: '10px'
        }}>
          <input
            type="text"
            value={text}
            style={{
              width: '50%', fontSize: '20px', backdropFilter: 'blur(10px)', padding: '10px', borderRadius: '10px', minWidth: '300px',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '3px solid black'
            }}
            onChange={(e) => {
              setText(e.target.value)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                generateCode()
              }
            }} />
          <img src="https://img.icons8.com/ios-glyphs/30/000000/paste.png"
            style={{
              cursor: 'pointer',
              width: '35px',
              height: '35px',
            }}
            alt="Paste"
            onClick={() => {
              navigator.clipboard.readText().then(setText)
            }} />
        </div>
        <br />
        <button
          onClick={generateCode}
          style={{ marginBottom: '30px', backgroundColor: '#747bff' }}
        > Generate QR Code</button>
        <br />
        <img src={qrcode}></img>
        <br />
        <div style={{ height: '20px' }}></div>
        {qrcode &&
          <a href={qrcode} style={{ fontSize: '20px' }} download="qrcode.png">Download QR Code</a>
        }
      </center>
    </>
  )
}

export default App
