import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const SocialMedia = () => {
    return (
        <div className="py-12 bg-gray-100">
      <h2 className="lg:text-3xl font-bold text-center mb-8">Follow Us</h2>
      <div className="flex justify-center space-x-6 text-3xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookOutlined className="hover:text-blue-600" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined className="hover:text-blue-400" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramOutlined className="hover:text-pink-500" />
        </a>
      </div>
    </div>
    );
};

export default SocialMedia;