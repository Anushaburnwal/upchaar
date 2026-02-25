import { useBlog } from '../context/BlogContext.jsx';
import { Link } from 'react-router-dom';
import { FileText, Heart, Eye, PenLine, TrendingUp, Clock, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const STATUS_STYLES = {
    published: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    draft: 'bg-amber-50 text-amber-600 border-amber-200',
};

export default function BloggerDashboard() {
    const { myPosts, blogger } = useBlog();
    const published = myPosts.filter(p => p.status === 'published');
    const drafts = myPosts.filter(p => p.status === 'draft');
    const totalViews = myPosts.reduce((s, p) => s + p.views, 0);
    const totalLikes = myPosts.reduce((s, p) => s + p.likes, 0);
    const recent = [...myPosts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

    const stats = [
        { label: 'Total Posts', value: myPosts.length, icon: FileText, color: 'from-primary to-teal-400' },
        { label: 'Published', value: published.length, icon: CheckCircle, color: 'from-emerald-500 to-emerald-400' },
        { label: 'Drafts', value: drafts.length, icon: AlertCircle, color: 'from-amber-500 to-orange-400' },
        { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'from-blue-500 to-blue-400' },
        { label: 'Total Likes', value: totalLikes, icon: Heart, color: 'from-rose-500 to-pink-400' },
    ];

    return (
        <div className="space-y-6">
            {/* Greeting */}
            <div>
                <h1 className="text-xl font-bold text-slate-800">Welcome back, {blogger?.name?.split(' ')[1]} ✍️</h1>
                <p className="text-sm text-slate-500 mt-0.5">Your writing studio — ready when you are.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
                        <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br flex-shrink-0', color)}>
                            <Icon size={17} className="text-white" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xl font-bold text-slate-800 leading-none">{value}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Recent Posts */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h2 className="font-semibold text-slate-800">Recent Posts</h2>
                        <Link to="/blogger/posts" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                            All posts <ArrowUpRight size={11} />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recent.map(post => (
                            <div key={post.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
                                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${post.coverGradient} flex-shrink-0`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">{post.title}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', STATUS_STYLES[post.status])}>
                                            {post.status}
                                        </span>
                                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Clock size={9} /> {format(new Date(post.updatedAt), 'dd MMM yyyy')}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-400 flex-shrink-0">
                                    <span className="flex items-center gap-0.5"><Eye size={11} />{post.views}</span>
                                    <span className="flex items-center gap-0.5"><Heart size={11} />{post.likes}</span>
                                </div>
                                <Link to={`/blogger/edit/${post.id}`}
                                    className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-primary hover:text-white transition-all flex-shrink-0">
                                    <PenLine size={12} />
                                </Link>
                            </div>
                        ))}
                        {recent.length === 0 && (
                            <div className="px-5 py-12 text-center">
                                <p className="text-slate-400 text-sm">No posts yet</p>
                                <Link to="/blogger/write" className="text-xs text-primary hover:underline mt-1 block">Write your first post →</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick actions + top performer */}
                <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary to-teal-400 rounded-2xl p-5 text-white">
                        <PenLine size={22} className="mb-3 opacity-80" />
                        <h3 className="font-bold text-base mb-1">Start Writing</h3>
                        <p className="text-xs text-white/70 mb-4">Share your medical expertise with thousands of readers.</p>
                        <Link to="/blogger/write"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-white/90 transition-all">
                            New Post <ArrowUpRight size={13} />
                        </Link>
                    </div>

                    {/* Top post */}
                    {published.length > 0 && (() => {
                        const top = [...published].sort((a, b) => b.views - a.views)[0];
                        return (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1">
                                    <TrendingUp size={11} /> Top Performing Post
                                </h3>
                                <div className={`h-24 rounded-xl bg-gradient-to-br ${top.coverGradient} mb-3 flex items-end p-3`}>
                                    <span className="text-[10px] text-white/90 bg-white/20 px-2 py-0.5 rounded-full">{top.category}</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2">{top.title}</p>
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                    <span className="flex items-center gap-0.5"><Eye size={11} /> {top.views.toLocaleString()} views</span>
                                    <span className="flex items-center gap-0.5"><Heart size={11} /> {top.likes} likes</span>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
