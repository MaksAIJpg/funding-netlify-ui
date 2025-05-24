
export const metadata = {
  title: 'Funding Arbitrage UI',
  description: 'Realtime funding arbitrage between Gate.io and MEXC',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'black', color: 'white', padding: 20, fontFamily: 'Arial' }}>
        {children}
      </body>
    </html>
  )
}
