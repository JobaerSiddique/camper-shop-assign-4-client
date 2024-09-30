import { Collapse } from 'antd';

const { Panel } = Collapse;

const FAQSection = () => {
  return (
    <div className="py-12 bg-gray-100 my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto">
        <Collapse accordion>
          <Panel header="What is the shipping time?" key="1">
            <p>Shipping typically takes 3-5 business days within the continental US.</p>
          </Panel>
          <Panel header="What is your return policy?" key="2">
            <p>You can return any item within 30 days of purchase for a full refund.</p>
          </Panel>
          <Panel header="How do I track my order?" key="3">
            <p>Once your order has shipped, you'll receive a tracking number via email.</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default FAQSection;
