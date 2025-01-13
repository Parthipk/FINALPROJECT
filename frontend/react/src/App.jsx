import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Routes
import Blog from './components/homepage/Blog';
import Browse from './components/homepage/Browse';
import Details from './components/homepage/Details';
import Footer from './components/homepage/Footer';
import Heading from './components/homepage/Header';
import Jobs from './components/homepage/Jobs';
import LandingImage from './components/homepage/LandingImage';
import Navbar from './components/homepage/Navebar'; // Corrected the name
import Partners from './components/homepage/Partners';
import Photo from './components/homepage/Photo';
import SearchButton from './components/homepage/SearchButton';
import Testimonials from './components/homepage/Testimonials';
import './index.css';
import HomePages from './pages/HomePages';
import Landing from './components/Jobs/Landing';
import FirstAbout from './components/about/FirstAbout';
import Accordion from './components/about/Accordian';
import Map from './components/about/Map';
import Contact from './components/about/Contact';
import CandidateFirst from './components/candidate Login/CandidateFirst';
import Description from './components/candidate Login/Description';
import Form from './components/candidate Login/Form';
import RecruterFirst from './components/recruter Login/RecruterFirst';
import RecruterDecs from './components/recruter Login/RecruterDecs';
import RecruterForm from './components/recruter Login/RecruterForm';
import Job from './components/homepage/Job';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePages />}/>
        <Route path="/jobs" element={
         <>
          <Landing/>
          <Jobs/>
          <Footer/>
          </>
        }/>
        <Route path="/about" element={
         <>
          <FirstAbout/>
          <Details/>
          <Accordion/>
          <Contact/>
          <Map/>
          <Footer/>
          </>
        }/>
        <Route path="/candidateLogin" element={
         <>
          <CandidateFirst/>
          <Description/>
          <Form/>
          <Footer/>
          </>
        }/>

        <Route path="/recuterLogin" element={
         <>
          <RecruterFirst/>
          <RecruterDecs/>
          <RecruterForm/>
          <Footer/>
          </>
        }/>

      </Routes>
    </Router>
  );
}

export default App;
