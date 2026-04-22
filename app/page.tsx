'use client';

import { useState, useRef, useEffect } from 'react';
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
  const printableRef = useRef<HTMLDivElement>(null);

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

  const fetchImageAsBuffer = async (url: string): Promise<{ buffer: Uint8Array; mimeType: string }> => {
    const res = await fetch(url);
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

  const exportPdf = async () => {
    if (!printableRef.current || !imageUrl) return;

    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: [0.5, 0.5] as [number, number],
      filename: 'kinderstory.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
      jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
    };

    // Pre-load image as data URL so html2canvas doesn't fight CORS
    let dataUrl = imageUrl;
    try {
      const imgRes = await fetch(imageUrl);
      const imgBlob = await imgRes.blob();
      dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imgBlob);
      });
    } catch {
      // fallback to original URL if fetch fails
    }

    // Temporarily inject the data URL into the printable image
    const imgEl = printableRef.current.querySelector('img');
    const originalSrc = imgEl?.getAttribute('src') || '';
    if (imgEl) imgEl.src = dataUrl;

    // Briefly make visible for html2canvas, then restore
    const el = printableRef.current;
    const wasHidden = el.style.visibility === 'hidden';
    el.style.visibility = 'visible';
    el.style.opacity = '0';

    try {
      await html2pdf().set(opt).from(el).save();
    } catch (err) {
      alert('Failed to export PDF. Please try again.');
      console.error('PDF export error:', err);
    } finally {
      el.style.visibility = wasHidden ? 'hidden' : '';
      el.style.opacity = '';
      if (imgEl) imgEl.src = originalSrc;
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

        {/* Export Buttons */}
        {story && imageUrl && !loading && (
          <section className="export-section">
            <p className="export-label">Save your story</p>
            <div className="export-button-group">
              <button className="btn btn-export-docx" onClick={exportDocx}>
                📄 Download .docx
              </button>
              <button className="btn btn-export-pdf" onClick={exportPdf}>
                📝 Download .pdf
              </button>
            </div>
          </section>
        )}

        {/* Hidden printable area for PDF */}
        {story && imageUrl && (
          <div ref={printableRef} className="printable-area">
            <h1 className="printable-title">KinderStory</h1>
            <p className="printable-story">{story}</p>
            <img
              src={imageUrl}
              alt="Story illustration"
              className="printable-image"
            />
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>Made with 💖 for little readers</p>
        </footer>
      </div>
    </main>
  );
}
