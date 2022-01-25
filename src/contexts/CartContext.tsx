import { AxiosResponse } from 'axios'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { api } from '../services/api'

interface CartProviderProps {
  children: ReactNode
}

interface Product {
  productId: number
  name: string
  category: string
  imgUrl: string
  price: number
  userId: number
}

interface CartContextData {
  cart: Product[]
  catalog: Product[]
  addCart: (data: Product, acessToken: string) => Promise<void>
  loadCatalog: () => Promise<void>
  search: string
  handleSearch: any
  filtered: Product[]
  loadFiltered: () => Promise<void>
}

const CartContext = createContext<CartContextData>({} as CartContextData)

const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('Use Cart must be used within an CartProvider')
  }

  return context
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([])
  const [catalog, setCatalog] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [search, setSearch] = useState('')

  const loadCatalog = useCallback(async () => {
    try {
      const response = await api.get('/catalog')

      setCatalog(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const addCart = useCallback(async (data: Product, accessToken: string) => {
    api
      .post('/cart', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res: AxiosResponse<Product>) => console.log(res))
      .catch(err => console.log(err))
  }, [])

  const handleSearch = (text: string) => {
    setSearch(text)
    setFiltered(
      catalog.filter(e => e.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const loadFiltered = useCallback(async () => {
    try {
      const response = await api.get('/catalog')

      setFiltered(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        loadCatalog,
        catalog,
        search,
        handleSearch,
        loadFiltered,
        filtered
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { useCart, CartProvider }
