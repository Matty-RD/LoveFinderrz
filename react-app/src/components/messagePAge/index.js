import { getAllMatchesThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";

function MessagesPage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);
    const usersMatches = matches.filter(match => match.second_userId === sessionUser.id && match.matched === false)

    useEffect(() => {
        dispatch(getAllMatchesThunk());
      }, [dispatch]);



    if(usersMatches.length === 0) {
      return (
        <div>
          <h1>Messages!</h1>
        </div>
      );
    }
  }


  export default MessagesPage;
