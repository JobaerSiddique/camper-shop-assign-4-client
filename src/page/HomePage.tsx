import FAQSection from "../component/HomePage/FAQSection";
import HeroPage from "../component/HomePage/HeroPage";
import UniqueSection from "../component/HomePage/UniqueSection";
import VideoBlogs from "../component/HomePage/VideoBlogs";


const HomePage = () => {
    return (
        <div>
            <HeroPage/>
            <UniqueSection/>
            <VideoBlogs/>
            <FAQSection/>
        </div>
    );
};

export default HomePage;