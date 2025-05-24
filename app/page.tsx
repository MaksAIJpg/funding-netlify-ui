
'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [minSpread, setMinSpread] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://funding-arbitrage-backend.onrender.com/funding')
      const result = await res.json()
      setData(result)
    }
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const filtered = data
    .filter((d: any) => d.spread >= minSpread)
    .filter((d: any) => d.symbol.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>Funding Arbitrage Dashboard</h1>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input placeholder='Search token...' value={search} onChange={e => setSearch(e.target.value)} />
        <input type='number' placeholder='Min spread' value={minSpread} onChange={e => setMinSpread(parseFloat(e.target.value) || 0)} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Gate.io</th>
            <th>MEXC</th>
            <th>Spread</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td style={{ color: 'lightgreen' }}>{item.gate_funding?.toFixed(4)}</td>
              <td style={{ color: 'khaki' }}>{item.mexc_funding?.toFixed(4)}</td>
              <td style={{ color: 'cyan' }}>{item.spread?.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
