import { Button, Card, Form, Input, Radio } from "antd";


const CheckOutPage = () => {
    return (
        <div>
             <Card  bordered={false} style={{ width: 300 }}>
             <h2 className="text-2xl font-bold mb-5">Checkout</h2>
            <Form layout="vertical" >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email' }]}
                >
                    <Input type="email" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                    <Input placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item
                    label="Delivery Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your delivery address' }]}
                >
                    <Input placeholder="Enter your delivery address" />
                </Form.Item>

                <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: 'Please select a payment method' }]}>
                    <Radio.Group>
                        <Radio value="cod">Cash on Delivery</Radio>
                        {/* You can add more payment methods here */}
                    </Radio.Group>
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Place Order
                </Button>
            </Form>
  </Card>
           
        </div>
    );
};

export default CheckOutPage;