export const nodes = [process.env.REACT_APP_NODE_1 || '4']

const getNodeUrl = () => {
    const randomIndex = Math.floor(Math.random() * (nodes.length - 1))
    
    return nodes[randomIndex]
}

export default getNodeUrl