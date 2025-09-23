import Navbar from '../components/Navbar';
import '../styles/Home.css';
import Footer from '../components/Footer';
import homeSection from '../data/HomeSection';
import dashboardSection from '../data/DashboardSection';

import parse from 'html-react-parser';

function Home() {
  return (
    <>
    <Navbar />
    
    {/* home section */}
    <section id="home">
        <img src={homeSection.image} />
        <div className="home-container">
            {parse(homeSection.content)}
        </div>
    </section>

    {/* dashboard section */}
    <section id="dashboard">
        <div className="dashboard-container">
            {parse(dashboardSection.content)}
        </div>
    </section>
    <Footer />


    </>

  )
}

export default Home
