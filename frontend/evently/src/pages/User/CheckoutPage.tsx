import { useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../Redux/store';
import PaypalButton from '../../components/user/Inputs/PaypalButton';
import { createPayPalBooking } from '../../Redux/slices/auth/authBookingSlice';
import toast from 'react-hot-toast';
import PaymentSuccessAnimation from '../../components/user/Inputs/PaymentSuccessAnimation';

const CheckoutPage = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const eventData = location?.state?.eventData;
  const { user } = useSelector((state: RootState) => state.auth);

  const [CheckoutId, setCheckoutId] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const totalPrice = ticketCount * eventData?.salePrice;

  const incrementTickets = () => {
    if (ticketCount < 10) setTicketCount(ticketCount + 1);
  };

  const decrementTickets = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Date TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCreateCheckout = () => {
    setCheckoutId('paypal');
  };

  const handlePaymentSuccess = async (details: any) => {
    if (!eventData?._id) {
      toast('Event data missing', { duration: 2000 });
      return;
    }

    try {
      const transactionId = details.id || details.orderID;
      const result = await dispatch(
        createPayPalBooking({
          eventId: eventData._id,
          quantity: ticketCount,
          transactionId
        })
      ).unwrap();
      console.log("Booking result:", result);
      setIsPaymentSuccess(true);
    } catch (error) {
      setIsPaymentSuccess(true);
      toast('Payment successful but booking creation failed. Please contact support!');
    }
  };

  const handlePaymentError = (_err: any) => {
    toast('Payment failed. Please try again!', { duration: 2000 });
  };

  if (isPaymentSuccess) return <PaymentSuccessAnimation />

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Event</h2>
              <div className="flex gap-4">
                <img
                  src={eventData?.image}
                  alt={eventData?.title}
                  className="w-30 h-24 object-cover "
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {eventData?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(eventData?.eventDate)}, {eventData?.eventLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Contact Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Name</span>
                  <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Email</span>
                  <span className="text-sm font-medium text-gray-900">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="lg:sticky lg:top-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Order Summary</h2>
              <div className="border border-gray-200 rounded p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-700">Ticket Price</span>
                    <span className="text-sm font-medium text-gray-900">${eventData?.salePrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={decrementTickets}
                        disabled={ticketCount <= 1}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-medium text-gray-900 w-8 text-center">{ticketCount}</span>
                      <button
                        onClick={incrementTickets}
                        disabled={ticketCount >= 10}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-700">Service Fee</span>
                    <span className="text-sm font-medium text-gray-900">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!CheckoutId ? (
          <div className="space-y-3 pt-4">
            <button
              className="w-full px-6 py-4 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors"
              onClick={handleCreateCheckout}
            >
              Complete Purchase
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-4 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-4">
            <h3 className="text-lg mb-4">Pay with PayPal</h3>
            <PaypalButton
              amount={totalPrice}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
