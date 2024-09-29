const UniqueSection = () => {
    return (
      <div className="py-12 bg-white my-10">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial Cards */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <p className="mb-4 italic">"Amazing products and fast shipping!"</p>
            <p className="font-bold">- John Doe</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <p className="mb-4 italic">"Great customer service and top-quality gear."</p>
            <p className="font-bold">- Jane Smith</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <p className="mb-4 italic">"Will definitely shop here again!"</p>
            <p className="font-bold">- Emily Johnson</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default UniqueSection;
  