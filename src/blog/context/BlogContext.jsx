import { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_POSTS, MOCK_BLOGGER } from '../data/mockBlogs.js';

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [blogger, setBlogger] = useState(() => {
        try {
            const stored = localStorage.getItem('sanjiwani_blogger');
            return stored ? JSON.parse(stored) : null;
        } catch { return null; }
    });

    const loginBlogger = useCallback((email, password) => {
        if (email !== MOCK_BLOGGER.email || password !== MOCK_BLOGGER.password) {
            throw new Error('Invalid credentials');
        }
        const session = { ...MOCK_BLOGGER, loginAt: new Date().toISOString() };
        localStorage.setItem('sanjiwani_blogger', JSON.stringify(session));
        setBlogger(session);
        return session;
    }, []);

    const logoutBlogger = useCallback(() => {
        localStorage.removeItem('sanjiwani_blogger');
        setBlogger(null);
    }, []);

    const updateBlogger = useCallback((data) => {
        const updated = { ...blogger, ...data };
        localStorage.setItem('sanjiwani_blogger', JSON.stringify(updated));
        setBlogger(updated);
    }, [blogger]);

    const publishPost = useCallback((postData) => {
        const now = new Date().toISOString();
        const newPost = {
            id: `post-${Date.now()}`,
            slug: postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            publishedAt: now,
            updatedAt: now,
            likes: 0,
            views: 0,
            status: 'published',
            bloggerId: 'blogger-1',
            author: {
                name: blogger?.name || 'Anonymous',
                specialty: blogger?.specialty || '',
                avatarColor: blogger?.avatarColor || '#0d9488',
                bio: blogger?.bio || '',
            },
            ...postData,
        };
        setPosts(prev => [newPost, ...prev]);
        return newPost;
    }, [blogger]);

    const saveDraft = useCallback((postData) => {
        const now = new Date().toISOString();
        if (postData.id) {
            setPosts(prev => prev.map(p => p.id === postData.id
                ? { ...p, ...postData, updatedAt: now }
                : p
            ));
        } else {
            const draft = {
                id: `draft-${Date.now()}`,
                slug: postData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled',
                publishedAt: now,
                updatedAt: now,
                likes: 0,
                views: 0,
                status: 'draft',
                bloggerId: 'blogger-1',
                author: {
                    name: blogger?.name || 'Anonymous',
                    specialty: blogger?.specialty || '',
                    avatarColor: blogger?.avatarColor || '#0d9488',
                    bio: blogger?.bio || '',
                },
                ...postData,
            };
            setPosts(prev => [draft, ...prev]);
        }
    }, [blogger]);

    const updatePost = useCallback((id, data) => {
        setPosts(prev => prev.map(p => p.id === id
            ? { ...p, ...data, updatedAt: new Date().toISOString() }
            : p
        ));
    }, []);

    const deletePost = useCallback((id) => {
        setPosts(prev => prev.filter(p => p.id !== id));
    }, []);

    const likePost = useCallback((id) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }, []);

    const incrementViews = useCallback((id) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p));
    }, []);

    const publishedPosts = posts.filter(p => p.status === 'published');
    const myPosts = posts.filter(p => p.bloggerId === 'blogger-1');

    return (
        <BlogContext.Provider value={{
            posts, publishedPosts, myPosts,
            blogger, loginBlogger, logoutBlogger, updateBlogger,
            publishPost, saveDraft, updatePost, deletePost, likePost, incrementViews,
        }}>
            {children}
        </BlogContext.Provider>
    );
}

export function useBlog() {
    const ctx = useContext(BlogContext);
    if (!ctx) throw new Error('useBlog must be used inside BlogProvider');
    return ctx;
}
