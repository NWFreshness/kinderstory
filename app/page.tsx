'use client';

import { useState } from 'react';
import './globals.css';
import {
  Document, Paragraph, TextRun, ImageRun, Packer, AlignmentType,
} from 'docx';
import { saveAs } from 'file-saver';

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

  const proxyImageUrl = (url: string) => `/api/proxy-image?url=${encodeURIComponent(url)}`;

  const fetchImageAsBuffer = async (url: string): Promise<{ buffer: Uint8Array; mimeType: string }> => {
    const proxyUrl = proxyImageUrl(url);
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error(`Proxy failed: ${res.status}`);
    const blob = await res.blob();
    const buffer = new Uint8Array(await blob.arrayBuffer());
    return { buffer, mimeType: blob.type };
  };

  const exportDocx = async () => {
    if (!story || !imageUrl) return;

    try {
      const { buffer, mimeType } = await fetchImageAsBuffer(imageUrl);

      const imageType = mimeType === 'image/png' ? 'png' :
                        mimeType === 'image/jpeg' || mimeType === 'image/jpg' ? 'jpg' :
                        'png';

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: 'KinderStory',
              heading: 'Heading1',
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: story,
                  size: 24,
                }),
              ],
              spacing: { after: 400, line: 360 },
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: buffer,
                  transformation: { width: 500, height: 500 },
                  type: imageType,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'kinderstory.docx');
    } catch (err) {
      alert('Failed to export DOCX. Please try again.');
      console.error('DOCX export error:', err);
    }
  };

  return (
    <main className="main">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">KinderStory</h1>
          <p className="subtitle">Tales for Little Readers</p>
        </header>

        {/* Cover Page — shown when no story exists */}
        {!story && !loading && !error && (
          <section className="cover-page">
            <div className="cover-illustration">📖</div>
            <div className="input-section">
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
            </div>
          </section>
        )}

        {/* Loading Animation */}
        {loading && (
          <div className="loading-section">
            <div className="book-loader">
              📖
              <span className="sparkle sparkle-1">✨</span>
              <span className="sparkle sparkle-2">✨</span>
              <span className="sparkle sparkle-3">✨</span>
            </div>
            <p className="loading-text">Creating your story...</p>
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

        {/* Open Book Spread — Story + Image */}
        {story && !loading && (
          <div className="book-spread">
            <div className="book-page-left">
              <h2 className="page-title">The Story</h2>
              <p className="story-text">{story}</p>
            </div>
            <div className="book-spine" />
            <div className="book-page-right">
              <h2 className="page-title">The Picture</h2>
              {imageUrl ? (
                <div className="story-image-wrapper">
                  <img
                    src={imageUrl}
                    alt="Story illustration"
                    className="story-image"
                  />
                </div>
              ) : (
                <div className="story-image-wrapper">
                  <p style={{ color: 'var(--ink-light)', fontStyle: 'italic' }}>
                    Illustration loading...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Export Button */}
        {story && imageUrl && !loading && (
          <section className="export-section">
            <p className="export-label">Save your story</p>
            <div className="export-button-group">
              <button className="btn btn-export-docx" onClick={exportDocx}>
                📄 Download .docx
              </button>
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
