import { useState, useEffect } from "react";
import { Keypair } from "@solana/web3.js";

export default function Checkout() {
  const [transaction, setTransaction] = useState(null);
  const [message, setMessage] = useState(null);

  const searchParams = new URLSearchParams(window.location.search);

  const reference = useMemo(() => Keypair.generate().publicKey, []);

  searchParams.append('reference', reference.toString());

  async function getTransaction() {
    if (!publicKey) {
      return;
    }

    const body = {
      account: publicKey.toString(),
    }

    const response = await fetch(`/api/makeTransaction?${searchParams.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })

    const json = await response.json();

    if (response.status !== 200) {
      console.error(json);
      return;
    }

    // Deserialize the transaction from the response
    const transaction = Transaction.from(Buffer.from(json.transaction, 'base64'));
    setTransaction(transaction);
    setMessage(json.message);
    console.log(transaction);
  }

  useEffect(() => {
    getTransaction()
  }, [publicKey])

  if (!publicKey) {
    return (
      <div className='flex flex-col gap-8 items-center'>
        <div>
          <button onClick={() => window.history.back()}>Cancel</button>
        </div>

        <div>
          <button>Connect Wallet</button>
        </div>

        <p>You need to connect your wallet to make transactions</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8 items-center'>
      <div>
        <button onClick={() => window.history.back()}>Cancel</button>
      </div>

      <div>
        <button>Connect Wallet</button>
      </div>

      {message ?
        <p>{message} Please approve the transaction using your wallet</p> :
        <p>Creating transaction... <Loading /></p>
      }
    </div>
  )
}
