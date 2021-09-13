
import connectors from "./config"
import WalletCard from "./WalletCard"
import { Login, Config } from "./types"
import { useWeb3React } from "@web3-react/core"
import useAuth from "hooks/useAuth"

interface Props {
    onDismiss: () => void
}

const Connect:React.FC<Props> = ({onDismiss}) => {

    const {login, logout} = useAuth()
    return (
        <div className="bg-brand-primary p-px w-full">
            <div className="bg-black px-4 py-4 lg:py-8 flex items-center">
                <ul className="text-gray-300  lg:text-lg">
                    {connectors.map((entry, index) => (
                        <WalletCard
                            key={entry.title}
                            login={login}
                            walletConfig={entry}
                            onDismiss={onDismiss}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Connect
