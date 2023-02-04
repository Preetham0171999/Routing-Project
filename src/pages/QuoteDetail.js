import { useParams,Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api"
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";






const QuoteDetail = () => {

    const params =useParams();
    const {quotesId}=params;
    const {sendRequest,status,data:loadedQuote,error}=useHttp(getSingleQuote,true);
    useEffect(()=>{sendRequest(quotesId)},[sendRequest,quotesId]);
    if(status==="pending"){
        return <div className="centered"><LoadingSpinner/></div>
    }

    if(error){
        return <p className="centered">{error}</p>
    }


   // const quote= Dummy.find(quote=>quote.id===params.quotesId);
    if(!loadedQuote.text){
        return <p>No Quote found</p>
    }
    return <>
    <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>

    <Route path={`/quotes/${params.quotesId}/comments`}>
        <Comments/>
    </Route>
    </>
};
export default QuoteDetail;
