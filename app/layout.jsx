import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider' //the Provider is a higher order component and we need to wrap the body content

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout