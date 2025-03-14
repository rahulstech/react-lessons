import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";

export default function PostList() {
    const posts = useSelector(state => state.posts.posts);
    const status = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchPosts());
    }, []);

    let content;
    if (status === 'pending') {
        content = <p>Loading...</p>
    }
    else if (status === 'failed') {
        content = <p>{error.message}</p>
    }
    else {
        content = (<div className="row mt-5 gy-2">
            {
                posts.map(post => (
                    <div className="col-sm-12 col-md-6 col-lg-4" key={post.id}>
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row mb-3 align-items-start">
                                    <div className="col">
                                        <h4 className="card-title">{post.title}</h4>
                                    </div>
                                    <div className="col-auto">
                                        <a href="#" className="btn btn-primary">View Post</a>
                                    </div>
                                </div>
                                <p className="card-text text-body-secondary">{post.body}</p>
                            </div>
                        </div>
                        
                    </div>
                ))
            }
        </div>)
    }
    
    console.log(`rendering postlist status=${status} error=${error}`);
    return (
        <div>
            <p className="display-5 text-center">Posts</p>
            {content}
        </div>
    );
}