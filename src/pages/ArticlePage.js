import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = ()=>{
    
    const [articleInfo, setArticleInfo] = useState({upvotes:0, comments: []});
    const {articleID} = useParams();

    const {user, isLoading} = useUser();

    useEffect(()=>{
        const loadArticleInfo = async () =>{
            const response = await axios.get(`/api/articles/${articleID}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        
        loadArticleInfo();

    }, []);

    // const {articleID} = useParams();
    const article = articles.find(article => article.name === articleID);

    const addUpvote = async () =>{
        const response = await axios.put(`/api/articles/${articleID}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if(!article){
        return(
            <NotFoundPage/>
        )
    }

    return(
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                {user
                    ? <button onClick={addUpvote}>Upvote</button>
                    : <button>Log in to upvote</button>}
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            {user 
                ? <AddCommentForm
                articleName={articleID}
                onArtticleUpdated={updatedArticle=>setArticleInfo(updatedArticle)}/>
                : <button>login to add a comment</button>}
            <CommentsList comments={articleInfo.comments} />
        </>
    )
}

export default ArticlePage;