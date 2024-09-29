import FAQSection from "../component/HomePage/FAQSection";
import HeroPage from "../component/HomePage/HeroPage";
import UniqueSection from "../component/HomePage/UniqueSection";


const HomePage = () => {
    return (
        <div>
            <HeroPage/>
            <UniqueSection/>
            <FAQSection/>
        </div>
    );
};

export default HomePage;