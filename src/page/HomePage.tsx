import BestSelling from "../component/HomePage/BestSelling";
import FAQSection from "../component/HomePage/FAQSection";
import HeroPage from "../component/HomePage/HeroPage";
import CategoriesSection from "../component/HomePage/ProductCategory";
import UniqueSection from "../component/HomePage/UniqueSection";
import VideoBlogs from "../component/HomePage/VideoBlogs";


const HomePage = () => {
    return (
        <div>
            <HeroPage/>
           
            <BestSelling/>
            <CategoriesSection/>
            <VideoBlogs/>
            <UniqueSection/>
            <FAQSection/>
        </div>
    );
};

export default HomePage;