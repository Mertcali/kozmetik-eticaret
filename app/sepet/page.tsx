"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toaster"
import { AddressForm } from "@/components/AddressForm"
import { PaymentForm } from "@/components/PaymentForm"
import { OrderSuccess } from "@/components/OrderSuccess"
import { CartItem } from "@/types"

type CheckoutStep = "cart" | "address" | "payment" | "success"

interface AddressData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  postalCode: string
  addressTitle: string
}

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart")
  const [addressData, setAddressData] = useState<AddressData | null>(null)
  const [orderNumber, setOrderNumber] = useState("")
  const [orderTotal, setOrderTotal] = useState(0)
  const [orderItems, setOrderItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "YENIYIL2026") {
      if (totalPrice >= 500) {
        setDiscount(100)
        setPromoApplied(true)
        toast({
          title: "Promosyon Kodu Uygulandı! 🎉",
          description: "100 TL indirim kazandınız!",
          type: "success",
        })
      } else {
        toast({
          title: "Yetersiz Tutar",
          description: "Bu promosyon kodu 500 TL ve üzeri alışverişlerde geçerlidir.",
          type: "error",
        })
      }
    } else {
      toast({
        title: "Geçersiz Kod",
        description: "Girdiğiniz promosyon kodu geçerli değil.",
        type: "error",
      })
    }
  }

  const removePromoCode = () => {
    setPromoCode("")
    setDiscount(0)
    setPromoApplied(false)
    toast({
      title: "Promosyon Kodu Kaldırıldı",
      description: "İndirim kaldırıldı.",
      type: "info",
    })
  }

  const finalPrice = totalPrice - discount

  const handleCheckout = () => {
    setCheckoutStep("address")
  }

  const handleAddressSubmit = (data: AddressData) => {
    setAddressData(data)
    setCheckoutStep("payment")
  }

  const handlePaymentSubmit = () => {
    // Generate order number
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
    setOrderNumber(randomOrderNumber)
    
    // Save order details before clearing cart (use finalPrice with discount)
    setOrderTotal(finalPrice)
    setOrderItems([...cart])
    
    // Clear cart
    clearCart()
    
    // Show success page
    setCheckoutStep("success")
    
    toast({
      title: "Ödeme Başarılı!",
      description: `Siparişiniz başarıyla oluşturuldu. Sipariş no: #${randomOrderNumber}`,
      type: "success",
    })
  }

  const handleNewOrder = () => {
    setCheckoutStep("cart")
    setAddressData(null)
    setOrderNumber("")
    setOrderTotal(0)
    setOrderItems([])
    setPromoCode("")
    setDiscount(0)
    setPromoApplied(false)
  }

  const handleRemoveFromCart = (productId: string, productName: string) => {
    removeFromCart(productId)
    toast({
      title: "Üründen Çıkarıldı",
      description: `${productName} sepetinizden kaldırıldı.`,
      type: "info",
    })
  }

  // Show address form
  if (checkoutStep === "address") {
    return (
      <div className="container mx-auto px-4 py-8">
        <AddressForm
          onSubmit={handleAddressSubmit}
          onBack={() => setCheckoutStep("cart")}
        />
      </div>
    )
  }

  // Show payment form
  if (checkoutStep === "payment") {
    return (
      <div className="container mx-auto px-4 py-8">
        <PaymentForm
          amount={finalPrice}
          onSubmit={handlePaymentSubmit}
          onBack={() => setCheckoutStep("address")}
        />
      </div>
    )
  }

  // Show success page
  if (checkoutStep === "success") {
    return (
      <div className="container mx-auto px-4 py-8">
        <OrderSuccess
          orderNumber={orderNumber}
          totalAmount={orderTotal}
          orderItems={orderItems}
          onNewOrder={handleNewOrder}
        />
      </div>
    )
  }

  // Show empty cart
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
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                
                <div className="flex-1">
                  <Link href={`/urun/${item.slug}`} className="hover:text-primary">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">Stok: {item.stock_quantity} adet</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                    {item.price.toFixed(2)} ₺
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
            
            {/* Promosyon Kodu */}
            <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border border-pink-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">🎉 Yeni Yıl Kampanyası</p>
              <p className="text-xs text-gray-600 mb-3">500 TL ve üzeri alışverişlerde 100 TL indirim!</p>
              {!promoApplied ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promosyon Kodu"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <Button
                    size="sm"
                    onClick={applyPromoCode}
                    disabled={!promoCode}
                    className="bg-gradient-to-r from-pink-600 to-orange-500"
                  >
                    Uygula
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span className="text-sm font-semibold text-green-700">✓ {promoCode}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removePromoCode}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Kaldır
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span>{totalPrice.toFixed(2)} ₺</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Promosyon İndirimi</span>
                  <span>-{discount.toFixed(2)} ₺</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Kargo</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam</span>
                  <span className="bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                    {finalPrice.toFixed(2)} ₺
                  </span>
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
