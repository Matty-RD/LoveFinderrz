import { getAllMatchesThunk, updateMatchThunk, deleteMatchesThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { NavLink } from 'react-router-dom';
import './matchPage.css'

function MatchesPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMatchesThunk());
      }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);
    const usersMatches = matches.filter(match => match.second_userId === sessionUser.id && match.matched === false)


    const obj = {};
    for(const m1 of usersMatches) {
      obj[m1.first_userId] = m1;
    }
    const fullFilter = Object.values(obj)




    const matchButton = (filteredMatch) => {
      const filt = usersMatches.filter(match => match.second_userId === sessionUser.id && match.first_userId === filteredMatch.first_userId)
      for(const allMatches of filt) {
        const matched = true;
        const updateMatch = {
          matched,
        };
        dispatch(updateMatchThunk(updateMatch, allMatches.id));
      }
    }


    const deleteM = async(filteredMatch) => {
      const filt = usersMatches.filter(match => match.second_userId === sessionUser.id && match.first_userId === filteredMatch.first_userId)
      for(const allMatches of filt) {
        await dispatch(deleteMatchesThunk(allMatches.id))
      }
    }


    if(usersMatches.length === 0) {
      return (
        <div className="noMatches">
          <h1>Sorry, no matches.</h1>
          <img alt='' src={'https://c.tenor.com/B9OjyPMq5pIAAAAC/fine-this-is-fine.gif'}/>
          <h2>Maybe try making some new posts!</h2>
        </div>
      )
    } else if(usersMatches.length > 0) {
      return (
        <>
        <div>
          <h1>Admires you recieved!</h1>
          <p>Feel free to view their page by clicking their name!</p>
        {fullFilter.map(filteredMatch  =>{
          return (
            <div key={filteredMatch.id} className="matchPage">
            <h1><NavLink to={`/users/${filteredMatch.first_userId}`}>{filteredMatch.liker.username}</NavLink></h1>
            <img alt='' className="profilepicture" src={filteredMatch.liker.profile_pic} onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}/>
            <div className="buttonDiv">
            <button type='submit'  onClick={() => matchButton(filteredMatch)}>Match?</button>
            <button type='submit' onClick={() => deleteM(filteredMatch)}>Pass?</button>
            </div>
            </div>
            )
      })}
        </div>
        </>
      );
    }
  }


  export default MatchesPage;
