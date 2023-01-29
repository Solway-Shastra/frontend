import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import Products from '../../components/solana/Products'
// import SiteHeading from '../../components/solana/SiteHeading'

export default function PayPage() {
  const { publicKey } = useWallet()

  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto pt-24">
      <SiteHeading>Book Now!</SiteHeading>

      <div className="basis-1/4">
        <WalletMultiButton className='!bg-gray-900 hover:scale-105' />
      </div>

      <Products submitTarget='/checkout' enabled={publicKey !== null} />
    </div>
  )
}
