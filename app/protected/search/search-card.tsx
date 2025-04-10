'use client'
import { Product } from "../types"

interface SearchCardProps {
    name: string
    productId: string
    type: string
    price: string
}

export default function SearchCard({ name, productId, type, price }: SearchCardProps) {
    
    return (
      <div className="border rounded-xl p-4 shadow-sm w-full bg-white">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <a
          href={`/protected/products/${productId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm mb-2 block"
        >
          View Product
        </a>
        <p className="text-sm mb-1">
          <span className="font-medium">Type:</span> {type}
        </p>
        <p className="text-sm">
          <span className="font-medium">Price:</span> {price}
        </p>
      </div>
    )
  }