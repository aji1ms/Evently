import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
    amount: number;
    onSuccess: (details: any) => Promise<void>;
    onError: (error: any) => void;
}

const PaypalButton = ({ amount, onSuccess, onError }: PaypalButtonProps) => {
    const formattedAmount = amount.toFixed(2);

    return (
        <PayPalScriptProvider options={{
            clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: "USD",
        }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(_data, actions) => {
                    if (!actions.order) {
                        throw new Error('PayPal order actions not available');
                    }
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            amount: {
                                value: formattedAmount,
                                currency_code: "USD"
                            }
                        }]

                    });
                }}
                onApprove={async (_data, actions) => {
                    try {
                        if (!actions.order) {
                            throw new Error('PayPal order actions not available');
                        }
                        const details = await actions.order.capture();

                        await onSuccess(details);
                    } catch (error) {
                        onError(error);
                    }
                }}
                onError={(error) => {
                    onError(error);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PaypalButton;