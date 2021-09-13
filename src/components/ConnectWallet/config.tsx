import Metamask from "../../assets/metamask.png"
import TrustWallet from "../../assets/trustwallet.png"

import { Config, ConnectorNames } from "./types"

const connectors: Config[] = [
    {
        title: "Metamask",
        icon: Metamask,
        connectorId: ConnectorNames.Injected
    },
    {
        title: "TrustWallet",
        icon: TrustWallet,
        connectorId: ConnectorNames.Injected
    }
]

export default connectors
export const localStorageKey = "accountStatus"