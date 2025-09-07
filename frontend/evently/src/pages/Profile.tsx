import Footer from "../components/user/Containers/Footer";
import Header from "../components/user/Containers/Header";
import ProfileDetail from "../components/user/Containers/Profile_Page/ProfileDetail";
import SideMenu from "../components/user/Containers/Profile_Page/SideMenu";

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gray-700 relative w-full h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] overflow-hidden" />

      {/* Main Content */}
      <div className="flex">
        <SideMenu />
        <ProfileDetail />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
