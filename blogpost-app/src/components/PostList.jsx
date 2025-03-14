import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";

export default function PostList() {
    console.log('select posts');
    const posts = useSelector(state => state.posts.posts);
    console.log('select status');
    const status = useSelector(state => state.posts.status);
    console.log('select error');
    const error = useSelector(state => state.posts.error);
    console.log('get dispatcher');
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
        content = posts.map(post => (
            <div key={post.id}>
                <p>{post.title}</p>
                <p>{post.body}</p>
            </div>
        ))
    }
    
    console.log(`rendering postlist status=${status} error=${error}`);
    return (
        <div>
            <p>Posts</p>
            {content}
        </div>
    );
}