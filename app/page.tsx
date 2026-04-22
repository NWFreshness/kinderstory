'use client';

import { useState } from 'react';
import './globals.css';

interface StoryResult {
  story: string;
  imageUrl: string;
  concept: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStory = async () => {
    setLoading(true);
    setError(null);
    setStory(null);
    setImageUrl(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStory(data.story);
      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSurprise = () => {
    setPrompt('');
    generateStory();
  };

  return (
    <main className="main">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <h1 className="title">KinderStory</h1>
          </div>
          <p className="subtitle">Your very own stories, just for you!</p>
        </header>

        {/* Input Section */}
        <section className="input-section">
          <input
            type="text"
            className="text-input"
            placeholder="What do you want to hear about?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateStory()}
            disabled={loading}
          />
          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={generateStory}
              disabled={loading}
            >
              {loading ? '✨ Making magic...' : '✨ Tell me a story!'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleSurprise}
              disabled={loading}
            >
              🎲 Surprise me!
            </button>
          </div>
        </section>

        {/* Loading Animation */}
        {loading && (
          <div className="loading-section">
            <div className="book-animation">
              <span className="book">📖</span>
              <span className="book">📚</span>
              <span className="book">📕</span>
            </div>
            <p className="loading-text">Reading your story...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-section">
            <p className="error-icon">😢</p>
            <p className="error-text">{error}</p>
            <button className="btn btn-retry" onClick={generateStory}>
              Try again!
            </button>
          </div>
        )}

        {/* Story Display */}
        {story && !loading && (
          <section className="story-section">
            <div className="story-card">
              <span className="story-icon">🌟</span>
              <p className="story-text">{story}</p>
            </div>
          </section>
        )}

        {/* Image Display */}
        {imageUrl && !loading && (
          <section className="image-section">
            <div className="image-card">
              <img src={imageUrl} alt="Story illustration" className="story-image" />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>Made with 💖 for little readers</p>
        </footer>
      </div>
    </main>
  );
}
