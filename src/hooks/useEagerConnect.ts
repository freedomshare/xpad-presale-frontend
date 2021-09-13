import { useEffect } from 'react'
import useAuth from 'hooks/useAuth'
import { localStorageKey } from 'components/ConnectWallet/config'
import { ConnectorNames } from 'components/ConnectWallet/types'



const _activeChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'ActiveChain', {
      get() {
        return this.network
      },
      set(network) {
        this.network = network

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(localStorageKey) as ConnectorNames
    
    if (connectorId) {
      const isConnectorInjected = connectorId === ConnectorNames.Injected
      const activeChainDefined = Reflect.has(window, 'ActiveChain')


      if (isConnectorInjected && !activeChainDefined) {
        _activeChainListener().then(() => login(connectorId))
        return
      }

      login(ConnectorNames.Injected)
    }
  }, [login])
}

export default useEagerConnect

