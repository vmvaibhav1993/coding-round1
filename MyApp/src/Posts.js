import React, { useState, useEffect } from 'react';
import '../src/Posts.css'; // Import your CSS file for styling

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // const openModal = (post) => {
    //     setSelectedPost(post);
    //     setModalOpen(true);
    // };
    const openModal = (post) => {
        // Check if the clicked post is the second one
        if (post.id === posts[1].id) {
            setSelectedPost(post);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setSelectedPost(null);
        setModalOpen(false);
    };
    return (
        <div className="posts-container">
            {posts && posts.map(post => (
                <div key={post.id} className="post-card">
                    <img src={post.thumbnail.small} alt="Thumbnail" className="post-thumbnail" />
                    {/* <img src={post.thumbnail.small} alt="Thumbnail" className="post-thumbnail" onClick={() => openModal(post)} /> */}

                    <h2 className="post-title" onClick={() => openModal(post)}>{post.title}</h2>
                    <p className="post-content">{post.content}</p>
                    <button className="learn-more-btn" onClick={() => openModal(post)}>Learn More</button>
                </div>
            ))}

            {/* Modal */}

            {modalOpen && selectedPost && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={selectedPost.thumbnail.small} alt="Thumbnail" className="post-thumbnail" />
                        <h2>{selectedPost.title}</h2>
                        <p>{selectedPost.content}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
