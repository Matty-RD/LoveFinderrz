import { getAllMatchesThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";

function MatchesPage() {
    const dispatch = useDispatch();

    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);

    useEffect(() => {
        dispatch(getAllMatchesThunk());
      }, [dispatch]);

      return (
        <>
        <div>
        { matches.map(match =>{
        return (
        <div key={match.id} style={{border:'solid'}}>
        <h1>Matches!!</h1>
        <h3>Id for liker: {match.first_userId}</h3>
        <h3>Id for liked: {match.second_userId}</h3>
        <h3>Match Statues: {match.matched.toString()}</h3>
        </div>
        )})}
        </div>
        </>
      );
    }

  export default MatchesPage;
