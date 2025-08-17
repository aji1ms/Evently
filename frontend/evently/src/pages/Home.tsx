import DiscountPoster from "../components/user/Containers/DiscountPoster";
import EventsContainer from "../components/user/Containers/EventsContainer";
import Footer from "../components/user/Containers/Footer";
import GetAboutUsContainer from "../components/user/Containers/GetAboutUsContainer";
import Header from "../components/user/Containers/Header";
import MainContainer from "../components/user/Containers/MainContainer";
import OverviewContainer from "../components/user/Containers/OverviewContainer";

const Home = () => {
  return (
    <div>
      <Header />
      <MainContainer />
      <EventsContainer />
      <GetAboutUsContainer />
      <OverviewContainer />
      <DiscountPoster />
      <Footer />
    </div>
  )
}

export default Home;