import React from "react"
import { localStorageKey } from "./config"
import { Login, Config} from "./types"



interface Props {
    walletConfig: Config
    login: Login
    onDismiss: () => void
}

const WalletCard: React.FC<Props> = ({login, walletConfig, onDismiss}) => {

    const {title, icon} = walletConfig
    return (
        <li className={title === "Metamask" ? "" : "mt-4 lg:mt-6"}>
            <button className="flex items-center" onClick={() => {
                login(walletConfig.connectorId)
                window.localStorage.setItem(localStorageKey, "1")
                onDismiss()
            }}>
                <span className="mr-4"><img src={icon} alt={title} width="30px" height="31px" /></span>
                <span className="text-sm lg:text-xl text-left">{title.toUpperCase()}</span>
            </button>
        </li>         
    )
}

export default WalletCard