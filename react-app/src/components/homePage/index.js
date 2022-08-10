import './homePage.css'
import { AiFillGithub } from 'react-icons/ai'


function HomePage() {

      return (
        <>
        <div className='homeDiv'>
        <h1 className="welcome">Welcome to LoveFinderrz!</h1>


        <h2>Not Dating, but Companionship</h2>
        <p className='homeText'>There are many dating apps on the market today, but most are driven by superficial algorithems.
        The other handful of apps that promise a "meaningful connection" cost an arm and a leg. Well loveFinderrz attempts to
        approach the dating scene with a slightly different concept.</p>

        <h2>Activity Based Connection</h2>
        <p className='homeText'>Users are not given a selection of random faces and profiles to choose from, but instead given a general feed of posts from Users in their area. Allowing connections
          to be built on activites and interest shared between Users.
        </p>
        <p className='homeText'>Users are limited in their interaction with User posts simply "Admire" or scroll past, so to limit any unnecessary hate or confrontation.
          After a post is "Admired" the poster will be given an option to look at who wishes to match in their "Admire" tab.
          While this part might feel similar to modern dating apps, Users can be confident their potential companions are active and share similar interest.
        </p>

        <h2>Companionship for everyone</h2>
        <p className='homeText'> Meaningful connections are missed everyday due to peoples natural lean toward a "Type" or "Preference" in a partner. We take the standard concept of dating and
          remove many personal details like Gender, Orientation, Race, Religion, Political Views, and etc. We allow Users to present their best foot forward without worrying
          about being placed into "boxes" or "bubbles" in the quest for Companionship.
        </p>

        <div className="comicImage">
        <img alt="Glootie" src="https://pbs.twimg.com/media/D_6MohTXkAAen22?format=jpg&name=small"/>
        <div className="gitHubDiv">
                <a className="feet" href="https://github.com/MonkeyToji">
                    About me: Matty Dickerson <AiFillGithub className="githubby" href="https://github.com/MonkeyToji"/>
                </a>
            </div>
        </div>
        </div>
        </>
      );
    }


  export default HomePage;
