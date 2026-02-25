// ─── MOCK BLOG DATA — Sanjiwani Health ──────────────────────────────────────

export const BLOG_CATEGORIES = [
  'Health Tips', 'Doctor Stories', 'Disease Awareness',
  'Nutrition', 'Mental Health', 'Research',
];

export const COVER_GRADIENTS = [
  'from-teal-500 to-emerald-400',
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-purple-400',
  'from-rose-500 to-pink-400',
  'from-amber-500 to-orange-400',
  'from-primary to-teal-300',
];

export const MOCK_BLOGGER = {
  email: 'blogger@sanjiwani.health',
  password: 'blog123',
  name: 'Dr. Meera Krishnan',
  bio: 'Physician & Health Writer. Passionate about making medical knowledge accessible to everyone.',
  specialty: 'General Medicine',
  avatarColor: '#0d9488',
};

const buildContent = (topic) => `
<h2>Introduction</h2>
<p>Healthcare is rapidly evolving, and staying informed has never been more important. ${topic} is a subject that touches millions of lives every day, yet remains misunderstood by many.</p>
<p>In this article, we break down everything you need to know — from causes and symptoms to the latest treatment options available at Sanjiwani Health.</p>
<h2>What You Need to Know</h2>
<p>Modern medicine has made remarkable strides. Early diagnosis, personalised treatment plans, and digital health tools like telemedicine are transforming the patient experience.</p>
<ul>
  <li>Prevention is always better than cure</li>
  <li>Regular check-ups can catch issues early</li>
  <li>Lifestyle changes remain the most powerful intervention</li>
  <li>Mental and physical health are deeply connected</li>
</ul>
<h2>Practical Tips</h2>
<p>Start with small, sustainable changes. Drink more water, move your body for 30 minutes daily, and prioritise sleep. These habits compound over time into dramatically better outcomes.</p>
<blockquote>
  <p>"The greatest wealth is health." — Virgil</p>
</blockquote>
<h2>When to See a Doctor</h2>
<p>Don't wait until you feel unwell. Preventive care is the cornerstone of modern healthcare. Book your appointment on Sanjiwani Health today and take the first step toward a healthier tomorrow.</p>
<h2>Conclusion</h2>
<p>Understanding ${topic} empowers you to make better decisions for yourself and your family. Knowledge is the best medicine — and it starts here.</p>
`;

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    title: '10 Heart-Healthy Habits You Can Start Today',
    slug: '10-heart-healthy-habits',
    excerpt: 'Cardiovascular disease is the leading cause of death globally. Here are ten simple habits backed by science that can dramatically reduce your risk.',
    content: buildContent('heart health'),
    coverGradient: 'from-rose-500 to-pink-400',
    category: 'Health Tips',
    tags: ['Heart', 'Cardiology', 'Lifestyle'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-02-20T09:00:00Z',
    updatedAt: '2026-02-20T09:00:00Z',
    readTime: 5,
    likes: 142,
    views: 2840,
    status: 'published',
    bloggerId: 'blogger-1',
  },
  {
    id: 'post-2',
    title: 'How I Diagnosed My Own Burnout — A Doctor\'s Story',
    slug: 'doctor-burnout-story',
    excerpt: 'Physicians are trained to care for others — but who cares for us? A candid account of recognising and recovering from professional burnout.',
    content: buildContent('doctor burnout and mental wellbeing'),
    coverGradient: 'from-violet-500 to-purple-400',
    category: 'Doctor Stories',
    tags: ['Burnout', 'Mental Health', 'Doctors'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-02-15T10:30:00Z',
    updatedAt: '2026-02-15T10:30:00Z',
    readTime: 7,
    likes: 218,
    views: 4120,
    status: 'published',
    bloggerId: 'blogger-1',
  },
  {
    id: 'post-3',
    title: 'Understanding Diabetes: Type 1 vs Type 2 Explained',
    slug: 'diabetes-type-1-vs-type-2',
    excerpt: 'Diabetes affects over 77 million Indians. This guide cuts through the confusion to explain the essential differences and what they mean for treatment.',
    content: buildContent('diabetes management and prevention'),
    coverGradient: 'from-amber-500 to-orange-400',
    category: 'Disease Awareness',
    tags: ['Diabetes', 'Endocrinology', 'Chronic Disease'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-02-10T08:00:00Z',
    updatedAt: '2026-02-10T08:00:00Z',
    readTime: 6,
    likes: 95,
    views: 1980,
    status: 'published',
    bloggerId: 'blogger-1',
  },
  {
    id: 'post-4',
    title: 'The Anti-Inflammatory Diet: Foods That Fight Disease',
    slug: 'anti-inflammatory-diet-guide',
    excerpt: 'Chronic inflammation is a root cause of most modern diseases. Discover which foods to embrace — and which to avoid — for a healthier body.',
    content: buildContent('nutrition and anti-inflammatory foods'),
    coverGradient: 'from-teal-500 to-emerald-400',
    category: 'Nutrition',
    tags: ['Diet', 'Inflammation', 'Whole Foods'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-02-05T11:00:00Z',
    updatedAt: '2026-02-05T11:00:00Z',
    readTime: 8,
    likes: 176,
    views: 3500,
    status: 'published',
    bloggerId: 'blogger-1',
  },
  {
    id: 'post-5',
    title: 'Breaking the Stigma: Talking About Anxiety in India',
    slug: 'anxiety-stigma-india',
    excerpt: 'Mental health remains a taboo topic in many communities. We explore why conversations about anxiety and depression need to happen more openly.',
    content: buildContent('mental health awareness and anxiety'),
    coverGradient: 'from-blue-500 to-cyan-400',
    category: 'Mental Health',
    tags: ['Anxiety', 'Stigma', 'Awareness'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-01-28T14:00:00Z',
    updatedAt: '2026-01-28T14:00:00Z',
    readTime: 6,
    likes: 203,
    views: 4800,
    status: 'published',
    bloggerId: 'blogger-1',
  },
  {
    id: 'post-6',
    title: 'New Research: How Sleep Deprivation Affects Immunity',
    slug: 'sleep-deprivation-immunity-research',
    excerpt: 'Scientists have uncovered the precise mechanisms by which poor sleep weakens your immune system. Here\'s what the latest research says.',
    content: buildContent('sleep science and immune function'),
    coverGradient: 'from-primary to-teal-300',
    category: 'Research',
    tags: ['Sleep', 'Immunity', 'Research'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-01-20T09:30:00Z',
    updatedAt: '2026-01-20T09:30:00Z',
    readTime: 5,
    likes: 88,
    views: 1620,
    status: 'published',
    bloggerId: 'blogger-1',
  },
  {
    id: 'post-7',
    title: 'The Truth About Vitamin D Deficiency in India',
    slug: 'vitamin-d-deficiency-india',
    excerpt: 'Despite living in a sun-soaked country, up to 70% of Indians are Vitamin D deficient. Find out why — and what to do about it.',
    content: buildContent('vitamin D deficiency and supplementation'),
    coverGradient: 'from-amber-500 to-orange-400',
    category: 'Health Tips',
    tags: ['Vitamin D', 'Deficiency', 'Supplements'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z',
    readTime: 4,
    likes: 131,
    views: 2210,
    status: 'published',
    bloggerId: 'blogger-1',
  },
  {
    id: 'post-8',
    title: 'Gut Health 101: Your Second Brain Explained',
    slug: 'gut-health-second-brain',
    excerpt: 'The gut-brain connection is one of the most exciting frontiers in medicine. Learn how your microbiome affects mood, energy, and immunity.',
    content: buildContent('gut health and the microbiome'),
    coverGradient: 'from-violet-500 to-purple-400',
    category: 'Nutrition',
    tags: ['Gut Health', 'Microbiome', 'Digestive Health'],
    author: { name: 'Dr. Meera Krishnan', specialty: 'General Medicine', avatarColor: '#0d9488', bio: 'Physician & Health Writer.' },
    publishedAt: '2026-01-05T08:00:00Z',
    updatedAt: '2026-01-05T08:00:00Z',
    readTime: 7,
    likes: 164,
    views: 3100,
    status: 'published',
    bloggerId: 'blogger-1',
  },
];
