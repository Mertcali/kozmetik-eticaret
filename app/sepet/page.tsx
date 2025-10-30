"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toaster"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart()

  const handleCheckout = () => {
    toast({
      title: "Satın Alma Yakında!",
      description: "Ödeme sistemi entegrasyonu üzerinde çalışıyoruz. Çok yakında sizlerle!",
      type: "info",
    })
  }

  const handleRemoveFromCart = (productId: number, productName: string) => {
    removeFromCart(productId)
    toast({
      title: "Üründen Çıkarıldı",
      description: `${productName} sepetinizden kaldırıldı.`,
      type: "info",
    })
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sepetiniz Boş</h2>
          <p className="text-gray-600 mb-8">
            Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünleri keşfedin!
          </p>
          <Link href="/urunler">
            <Button size="lg">Ürünleri Keşfet</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sepetim</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-primary">
                    {item.price} ₺
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFromCart(item.id, item.name)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
            <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span>{totalPrice.toFixed(2)} ₺</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Kargo</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam</span>
                  <span className="text-primary">{totalPrice.toFixed(2)} ₺</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
            >
              Satın Al
            </Button>

            <Link href="/urunler">
              <Button
                variant="outline"
                className="w-full mt-3"
              >
                Alışverişe Devam Et
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
