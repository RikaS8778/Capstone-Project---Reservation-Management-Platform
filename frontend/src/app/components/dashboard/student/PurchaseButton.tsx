'use client'

type PurchaseButtonProps = {
  ticketId: string
}

export default function PurchaseButton({ ticketId }: PurchaseButtonProps) {
  const handleClick = () => {
    // TODO: how to add purchase functionality - stripe
    alert(`Ticket ${ticketId} purchase is not implemented yet.`)
  }

  return (
    <button
      onClick={handleClick}
      className="mt-4 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 px-4 rounded"
    >
      Buy
    </button>
  )
}
