import { GlobeAsiaAustraliaIcon, Bars3Icon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { truncate } from '../utils/string'
require('@solana/wallet-adapter-react-ui/styles.css')

function Header({ connected, publicKey, initializeUser , initialized, transactionPending}) {
    return (
        <header className="sticky top-0 transition-all md:grid md:grid-cols-3 items-center px-10 xl:px-20 py-4 z-50 bg-white border-b">
            <div>
            <svg width="35" height="35" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            {/* is svg file ko edit karna hai, 'solway' text daalna hai, logo bhi change kar sakte hai> */}
            </div>

            <div className="flex-1 flex xl:justify-center px-6 transition-all duration-300">
                <button className="flex-1 flex items-center justify-between border rounded-full p-2 w-[300px] shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center divide-x">
                        <p className="text-gray-800 bg-transparent text-sm font-medium px-4" type="text">
                            Anywhere
                        </p>
                        <p className="text-gray-800 bg-transparent text-sm font-medium px-4" type="text">
                            Any week
                        </p>
                        <p className="text-gray-600 bg-transparent text-sm font-light px-4">Add guests</p>
                    </div>
                    <MagnifyingGlassIcon className="h-8 w-8 bg-[#6038ff] text-white stroke-[3.5px] p-2 rounded-full" />
                </button>
            </div>

            <div className="flex items-center justify-end">
                <div className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2">
                    <a className="text-sm font-medium transition-all duration-300 text-gray-800" href="https://gpt-travel-advisor-two.vercel.app/">
                        Plan with GPT
                    </a>
                </div>

                <div className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full p-3">
                    <GlobeAsiaAustraliaIcon className="h-5 w-5 transition-all duration-300 text-gray-800" />
                </div>

                {/* <div className="flex items-center bg-white text-gray-500 space-x-2 border rounded-full px-2 py-1 cursor-pointer shadow-sm hover:shadow-md transition">
                    <Bars3Icon className="h-5 w-5" />

                    <UserCircleIcon className="h-8 w-8" />
                </div> */}
                  {initialized ? (<></>) : (<button type="button" className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2" onClick={() => initializeUser()} disabled = {transactionPending}>
                        Initialize
                    </button>)}  
                <WalletMultiButton className="phantom-button" startIcon={<UserCircleIcon style={{ height: 32, width: 32, color: '#1f2937' }} />}>
                    <span className="text-sm font-medium text-black">{connected ? truncate(publicKey.toString()) : 'Connect Wallet'}</span>
                </WalletMultiButton>
            </div>
        </header>
    )
}

export default Header
