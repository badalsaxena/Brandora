import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, Check, ChevronDown, Clapperboard, Film, Instagram,
  Menu, MessageCircle, Mic2, Play, Quote, Sparkles, Target, Users,
  Video, X, Zap
} from 'lucide-react';
import './styles.css';
import brandoraLogo from './brandora-logo.png';

const phone = '917983316330';
const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hi Brandora, I would like to discuss a project.')}`;

const services = [
  { icon: Video, number: '01', title: 'Professional Video Shooting', copy: 'Cinematic visuals, thoughtful direction and a crew that makes every frame work harder for your brand.', image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=900&q=80' },
  { icon: Film, number: '02', title: 'Video Editing & Reels', copy: 'Fast, expressive edits built for retention, recall and the scroll-stopping first three seconds.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80' },
  { icon: Users, number: '03', title: 'Influencer Marketing', copy: 'The right creators, the right audience and collaborations that feel native instead of transactional.', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=900&q=80' },
  { icon: Target, number: '04', title: 'Business & Product Promotion', copy: 'Make your offer impossible to misunderstand with clear, persuasive brand storytelling.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80' },
  { icon: Instagram, number: '05', title: 'Social Media Content', copy: 'A consistent stream of on-brand content designed to keep your audience coming back.', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80' },
  { icon: Sparkles, number: '06', title: 'Brand Promotion', copy: 'Turn attention into trust with a visual identity people recognise across every touchpoint.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80' },
];

const packages = [
  { name: 'Starter', price: '₹9,999', descriptor: 'A focused content foundation.', items: ['15 professionally edited videos', 'Professional video editing', '1–2 shooting visits', 'Creative content production'] },
  { name: 'Growth', price: '₹14,999', descriptor: 'For brands ready to be seen.', popular: true, festiveTag: 'Diwali offer active', totalBenefit: '15 videos + festive promotion', items: ['15 Professionally Edited Videos', 'Professional Video Editing', 'Flexible Voice-over', 'Creative Brand Storytelling', 'Engaging Social Media Reels', '✨ FREE Boost for 2 Selected Videos'], valueHook: 'Complimentary organic reach & targeted audience boost to maximize festive sales.' },
  { name: 'Premium', price: '₹25,000', descriptor: 'A complete content engine.', festiveTag: 'Diwali mega bundle', totalBenefit: '15 videos + promotional boost', items: ['15 Professionally Edited Videos', 'Professional Video Editing & Motion Graphics', 'Influencer Collaboration', 'Professional Camera Setup', '2 Dedicated Shooting Visits', 'Premium Content Production', '✨ FREE PROMOTIONAL BOOST FOR 5 SELECTED VIDEOS'], valueHook: 'Complimentary promotional reach for five selected videos to maximize campaign visibility.' },
];

const portfolio = [
  { title: 'The art of the pour', category: 'Restaurant', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Crafted for celebration', category: 'Sweet Shop', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Made to be remembered', category: 'Jewellery', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Goodness, in every drop', category: 'Dairy & Food', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=80' },
  { title: 'The people behind the brand', category: 'Business', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80' },
  { title: 'A voice worth following', category: 'Influencer', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80' },
];

const showcaseVideos = [
  { title: 'CAR DELIHEVERY — SHOOT', category: 'Brand film', src: '/videos/Fronxx%20MP4.mp4' },
  { title: 'GURUNANAK JWELLERS — Campaign cut', category: 'Campaign', src: '/videos/IMG_1044.MP4' },
  { title: 'CAR EDIT — Social story', category: 'Social content', src: '/videos/MH%20edit.mp4' },
  { title: 'Sigma Bazar — Product story', category: 'Product film', src: '/videos/Sigma%20bazar%201.mp4' },
  { title: 'YASH JWELLERS', category: 'Product film', src: '/videos/YASH%20JWELLERS.MP4' },

];

const process = [
  ['01', 'Choose your package', 'Start with the format that fits your ambition.'],
  ['02', 'Discuss your brand', 'We learn what makes your business different.'],
  ['03', 'Professional shooting', 'Our team brings the idea to life on set.'],
  ['04', 'Editing & production', 'Every cut is crafted for impact and attention.'],
  ['05', 'Final video delivery', 'Your content, ready to move your business forward.'],
  
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedWork, setSelectedWork] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submission = Object.fromEntries(formData.entries());
    const existing = JSON.parse(localStorage.getItem('brandora-enquiries') || '[]');
    localStorage.setItem('brandora-enquiries', JSON.stringify([...existing, { ...submission, createdAt: new Date().toISOString() }]));
    fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submission) })
      .catch(() => console.warn('Brandora API unavailable; enquiry retained in this browser.'));
    setSubmitted(true);
    event.currentTarget.reset();
  };

  const categories = ['All', ...new Set(portfolio.map((item) => item.category))];
  const filteredPortfolio = activeCategory === 'All' ? portfolio : portfolio.filter((item) => item.category === activeCategory);

  return (
    <div className="app">
      {announcementVisible && <div className="announcement-bar" role="status"><span>🪔 LIMITED-TIME DIWALI OFFER: Get Free Video Boosts &amp; Up to 5 Complimentary Videos with Growth &amp; Premium Packages!</span><button onClick={() => scrollTo('packages')}>Claim offer <ArrowUpRight size={14} /></button><button className="announcement-close" onClick={() => setAnnouncementVisible(false)} aria-label="Dismiss Diwali offer"><X size={14} /></button></div>}
      <header className={announcementVisible ? 'site-header with-announcement' : 'site-header'}>
        <button className="logo" onClick={() => scrollTo('home')} aria-label="Brandora home"><img src={brandoraLogo} alt="Brandora" /></button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['about', 'services', 'showcase', 'process', 'contact'].map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}</button>)}
        </nav>
        <button className="header-cta" onClick={() => scrollTo('contact')}>Start a project <ArrowUpRight size={16} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-visual" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow"><span className="eyebrow-line" /> Shoot <i>•</i> Edit <i>•</i> Grow</p>
            <h1>We don't just<br /><em>create videos.</em><br />We build brands.</h1>
            <p className="hero-copy">Transform your business into a powerful digital brand with professional video production, creative storytelling and strategic promotion.</p>
            <button className="hero-festive-callout" onClick={() => scrollTo('packages')}><span>🪔 Diwali campaign now live</span><strong>Turn festive attention into sales <ArrowUpRight size={15} /></strong></button>
            <div className="hero-actions"><button className="button gold" onClick={() => scrollTo('services')}>Explore our services <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => scrollTo('work')}>View our work <span>↘</span></button></div>
          </div>
          <div className="hero-foot"><span>Scroll to explore</span><span className="scroll-line" /><span>Est. 2024 — India</span></div>
        </section>

        <section className="intro section" id="about">
          <div className="section-kicker">01 — The brandora approach</div>
          <div className="intro-grid"><h2>Attention is<br /><em>earned.</em></h2><div><p className="lead">In a world full of noise, the brands that win are the ones that make people feel something.</p><p>Brandora is a video production and brand promotion studio for businesses with something worth saying. We combine sharp strategy, beautiful visuals and the human stories behind every business to make content that moves people — and moves the needle.</p><button className="text-button dark" onClick={() => scrollTo('process')}>How we work <ArrowUpRight size={16} /></button></div></div>
          <div className="stats"><div><strong>01</strong><span>Clearer story</span></div><div><strong>02</strong><span>Better content</span></div><div><strong>03</strong><span>Bigger impact</span></div></div>
        </section>

        <section className="services section dark-section" id="services">
          <div className="section-heading"><div><div className="section-kicker light">02 — What we do</div><h2>Make your brand<br /><em>impossible to ignore.</em></h2></div><p>From the first idea to the final frame, we create visual experiences that make your audience stop, feel and remember.</p></div>
          <div className="service-grid">{services.map((service) => { const Icon = service.icon; return <motion.article className="service-card" key={service.title} whileHover={{ y: -7 }}><div className="service-image"><img src={service.image} alt="" /><span className="service-number">{service.number}</span></div><div className="service-details"><Icon size={20} /><h3>{service.title}</h3><p>{service.copy}</p><button onClick={() => scrollTo('contact')}>Let's talk <ArrowUpRight size={15} /></button></div></motion.article>; })}</div>
        </section>

        <section className="packages section" id="packages">
          <div className="section-heading"><div><div className="section-kicker">03 — Choose your momentum</div><h2>One good idea<br /><em>can change everything.</em></h2></div><p>Simple, transparent packages designed to give your brand the consistency and quality it deserves.</p></div>
          <div className="package-grid">{packages.map((pkg) => <article className={pkg.popular ? 'package-card popular' : 'package-card'} key={pkg.name}>{pkg.popular && <div className="popular-badge">Most popular</div>}{pkg.festiveTag && <div className="festive-tag">🪔 {pkg.festiveTag}</div>}<div className="package-top"><span>Brandora / {pkg.name}</span><Zap size={18} /></div><h3>{pkg.name}</h3><p>{pkg.descriptor}</p><div className="price">{pkg.price}</div>{pkg.totalBenefit && <div className="total-benefit"><small>Festive delivery benefit</small><strong>{pkg.totalBenefit}</strong></div>}<div className="package-divider" /><ul>{pkg.items.map((item) => <li className={item.startsWith('✨') ? 'festive-item' : ''} key={item}><Check size={15} />{item}</li>)}</ul>{pkg.valueHook && <p className="value-hook">{pkg.valueHook}</p>}<button className={pkg.popular ? 'button gold full' : 'button outline full'} onClick={() => { setSelectedPackage(`${pkg.name} — ${pkg.price}`); scrollTo('contact'); }}>Get this package <ArrowUpRight size={16} /></button></article>)}</div>
        </section>

        <section className="showcase section" id="showcase">
          <div className="section-heading"><div><div className="section-kicker">04 — Work in motion</div><h2>See the<br /><em>difference.</em></h2></div><p>Real edits, real energy. Press play to explore a few of the stories we have brought to life.</p></div>
          <div className="video-grid">{showcaseVideos.map((video) => <article className="video-card" key={video.src}><div className="video-frame"><video controls preload="metadata" playsInline src={video.src}><track kind="captions" /></video><span className="video-index">0{showcaseVideos.indexOf(video) + 1}</span></div><div className="video-meta"><span>{video.category}</span><h3>{video.title}</h3></div></article>)}</div>
        </section>

        <section className="process section" id="process">
          <div className="section-kicker">06 — The process</div><div className="process-intro"><h2>Good work is<br /><em>a conversation.</em></h2><p>No jargon. No guesswork. Just a clear, collaborative process that turns your business into content people care about.</p></div>
          <div className="process-list">{process.map(([number, title, copy]) => <div className="process-row" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={19} /></div>)}</div>
        </section>

        <section className="quote-section"><Quote size={36} /><blockquote>“The best marketing doesn't feel like marketing.”</blockquote><span className="quote-brand"><img src={brandoraLogo} alt="Brandora" /></span></section>

        <section className="contact section" id="contact">
          <div className="contact-copy"><div className="section-kicker light">07 — Let's create</div><h2>Your next<br /><em>chapter starts here.</em></h2><p>Tell us a little about your business and what you're building. We’ll get back to you within one working day.</p><div className="contact-links"><a href={`tel:+${phone}`}>+91 79833 16330 <ArrowUpRight size={15} /></a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us <MessageCircle size={15} /></a></div></div>
          <form className="enquiry-form" onSubmit={submitEnquiry}>{submitted ? <div className="success-message"><div className="success-icon"><Check /></div><h3>Enquiry received.</h3><p>Thanks for reaching out. We’ll confirm your Diwali campaign benefits when our team gets in touch.</p><button type="button" className="text-button light-text" onClick={() => setSubmitted(false)}>Send another enquiry</button></div> : <><div className="festive-form-note">🪔 Diwali campaign benefits are automatically included with eligible Growth and Premium enquiries.</div><div className="form-row"><label>Full name<input name="fullName" required placeholder="Your name" /></label><label>Business name<input name="businessName" required placeholder="Your business" /></label></div><div className="form-row"><label>Phone number<input name="phone" required type="tel" placeholder="+91 00000 00000" /></label><label>Interested package<select name="package" value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} required><option value="">Select a package</option>{packages.map((pkg) => <option key={pkg.name}>{pkg.name} — {pkg.price}</option>)}</select></label></div>{selectedPackage && <p className="selected-package">Selected: <strong>{selectedPackage}</strong> <span>Festive benefits will be discussed on confirmation.</span></p>}<label>Business location<input name="location" required placeholder="City, State" /></label><label>Project requirements<textarea name="requirements" required rows="4" placeholder="Tell us what you have in mind..." /></label><button className="button gold full" type="submit">Submit enquiry <ArrowUpRight size={17} /></button></>}</form>
        </section>
      </main>

      <footer><button className="logo" onClick={() => scrollTo('home')} aria-label="Brandora home"><img src={brandoraLogo} alt="Brandora" /></button><p>Stories that move people.<br />Content that moves business.</p><div><a href={whatsappUrl} target="_blank" rel="noreferrer">Instagram</a><a href={`tel:+${phone}`}>Call us</a></div><small>© 2024 Brandora Studio. All rights reserved.</small></footer>

      <AnimatePresence>{selectedWork && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedWork(null)}><motion.div className="work-modal" initial={{ scale: .94 }} animate={{ scale: 1 }} exit={{ scale: .94 }} onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedWork(null)}><X /></button><img src={selectedWork.image} alt="" /><div><small>{selectedWork.category} / Sample direction</small><h3>{selectedWork.title}</h3><p>Sample portfolio direction — replace with your next campaign.</p></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
