import DiscountPoster from "../../components/user/Containers/Home_Page/DiscountPoster";
import EventsContainer from "../../components/user/Containers/Home_Page/EventsContainer";
import Footer from "../../components/user/Containers/Footer";
import GetAboutUsContainer from "../../components/user/Containers/About_Page/GetAboutUsContainer";
import Header from "../../components/user/Containers/Header";
import MainContainer from "../../components/user/Containers/Home_Page/MainContainer";
import OverviewContainer from "../../components/user/Containers/OverviewContainer";

const Home = () => {
  return (
    <div>
      <Header />
      <MainContainer />
      <EventsContainer showAll={true} />
      <GetAboutUsContainer />
      <OverviewContainer />
      <DiscountPoster />
      <Footer />
    </div>
  )
}

export default Home;