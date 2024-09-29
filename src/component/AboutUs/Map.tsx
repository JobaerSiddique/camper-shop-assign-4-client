

const Map = () => {
    return (
        <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
        <div className="flex justify-center">
          <iframe
            title="Campers Shop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091196!2d144.9630579156165!3d-37.81410797975162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43a1c4c1f3%3A0x5c6b0a50e2d4539!2sMountain%20View%20CA!5e0!3m2!1sen!2sus!4v1631364591195!5m2!1sen!2sus"
            width="600"
            height="450"
            
            loading="lazy"
            className="w-full md:w-3/4 border-0"
          ></iframe>
        </div>
      </div>
    );
};

export default Map;