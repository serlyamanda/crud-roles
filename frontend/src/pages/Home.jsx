import Navbar from '../components/Navbar';
import '../styles/Home.css';
import homeSection from '../data/HomeSection';
// import dashboardSection from '../data/DashboardSection';

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
    </>

  )
}

export default Home
