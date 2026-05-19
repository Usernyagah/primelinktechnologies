import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Smartphone, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/data/products";
import { getProductPrimaryImage } from "@/lib/product-utils";
import { createOrder, requestMpesaPayment } from "@/lib/orders";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Checkout = () => {
  const { items, total, clear, setOpen } = useCart();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mpesaMessage, setMpesaMessage] = useState("");

  if (items.length === 0 && !completed) {
    return <Navigate to="/" replace />;
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFirebaseConfigured) {
      toast.error("Checkout requires Firebase to be configured.");
      return;
    }

    const trimmedPhone = phone.replace(/\s/g, "");
    if (trimmedPhone.length < 9) {
      toast.error("Enter your M-Pesa phone number");
      return;
    }

    setIsPaying(true);
    try {
      const orderId = await createOrder(items, total, trimmedPhone, name);
      const result = await requestMpesaPayment(orderId, trimmedPhone, total);

      if (db && result.checkoutRequestId) {
        await updateDoc(doc(db, "orders", orderId), {
          checkoutRequestId: result.checkoutRequestId,
        });
      }

      setMpesaMessage(
        result.customerMessage ||
          "Check your phone and enter your M-Pesa PIN to complete payment."
      );
      setCompleted(true);
      clear();
      setOpen(false);
      toast.success("M-Pesa prompt sent to your phone");
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };

  if (completed) {
    return (
      <div className="container-px py-16 max-w-lg mx-auto text-center space-y-6">
        <CheckCircle2 className="w-14 h-14 text-accent mx-auto" />
        <h1 className="text-2xl font-bold">Check your phone</h1>
        <p className="text-muted-foreground">{mpesaMessage}</p>
        <p className="text-sm text-muted-foreground">
          Enter your M-Pesa PIN when prompted. We will confirm your order once payment is received.
        </p>
        <Button asChild className="accent-gradient text-accent-foreground">
          <Link to="/">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-px py-10 lg:py-16">
      <Link
        to="/"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to cart
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Order summary</h2>
          <ul className="divide-y divide-border rounded-xl border border-border bg-card">
            {items.map((i) => (
              <li key={i.product.id} className="p-4 flex gap-4">
                <img
                  src={getProductPrimaryImage(i.product)}
                  alt=""
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{i.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                  <p className="text-sm font-semibold mt-1 tabular-nums">
                    {formatKES(i.product.price * i.qty)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-lg font-semibold pt-2">
            <span>Total</span>
            <span className="tabular-nums">{formatKES(total)}</span>
          </div>
        </div>

        <form onSubmit={handlePay} className="rounded-xl border border-border bg-card p-6 space-y-6 h-fit">
          <div className="flex items-center gap-3 pb-2 border-b border-border">
            <div className="p-2 rounded-lg bg-accent/10">
              <Smartphone className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold">Pay with M-Pesa</h2>
              <p className="text-sm text-muted-foreground">
                You will receive an STK push on your phone
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa phone number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712 345 678"
              required
            />
            <p className="text-xs text-muted-foreground">
              Use the Safaricom number that will receive the payment prompt
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPaying}
            className="w-full h-12 accent-gradient text-accent-foreground hover:brightness-110"
          >
            {isPaying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending M-Pesa prompt…
              </>
            ) : (
              <>Pay {formatKES(total)} with M-Pesa</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
