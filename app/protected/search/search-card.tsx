'use client'
import { Product } from "../types"

interface SearchCardProps {
    product: Product;
}

export default function SearchCard({ product }: SearchCardProps) {
    const { name, url, type, price } = product;

    return (
        <div className="border rounded-2xl p-4 shadow-md max-w-md bg-white">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm mb-2 block"
          >
            View Product
          </a>
          <p className="text-sm mb-1">
            <span className="font-medium">Type:</span> {type}
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium">Price:</span> {price}
          </p>
        </div>
      );
}