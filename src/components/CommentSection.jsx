import React, { useState, useEffect } from 'react';
import { MessageCircle, User, Send, Calendar, Heart, Reply } from 'lucide-react';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [likedComments, setLikedComments] = useState({});

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${postId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [postId]);

  const submitComment = () => {
    if (!name.trim() || !comment.trim()) {
      alert('Please enter both name and comment');
      return;
    }

    const newComment = {
      id: Date.now(),
      name: name.trim(),
      text: comment.trim(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    setName('');
    setComment('');
  };

  const handleLike = (commentId) => {
    if (likedComments[commentId]) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: (comment.likes || 0) + 1 };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setLikedComments({ ...likedComments, [commentId]: true });
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
  };

  return (
    <div style={{ marginTop: '60px', paddingTop: '40px' }}>
      
      {/* Comments Header */}
      <div className="live-status-panel" style={{ marginBottom: '30px' }}>
        <div className="status-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MessageCircle size={18} style={{ color: '#00ffaa' }} />
          <span>COMMENTS SECTION</span>
          <span style={{ 
            background: 'rgba(0, 255, 170, 0.2)', 
            padding: '2px 8px', 
            borderRadius: '20px', 
            fontSize: '11px',
            color: '#00ffaa'
          }}>
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      </div>

      {/* Comment Form - Terminal Style */}
      <div className="terminal" style={{ marginBottom: '40px' }}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="terminal-title">leave-a-comment.sh</div>
        </div>
        <div className="terminal-body" style={{ padding: '24px' }}>
          <div className="terminal-line" style={{ marginBottom: '16px' }}>
            <span className="term-command">$ write_comment --user</span>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 38px',
                  background: '#030308',
                  border: '1px solid #3a3a4a',
                  borderRadius: '8px',
                  color: '#d0ffd0',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00ffaa'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a4a'}
              />
            </div>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                background: '#030308',
                border: '1px solid #3a3a4a',
                borderRadius: '8px',
                color: '#d0ffd0',
                fontFamily: "'Fira Code', monospace",
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00ffaa'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a4a'}
            />
          </div>
          
          <button
            onClick={submitComment}
            className="trigger-btn"
            style={{
              padding: '10px 24px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            <Send size={14} /> Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="java-backend-showcase" style={{ padding: '0' }}>
        <div className="code-tabs" style={{ marginBottom: '0' }}>
          <div className="code-tab active" style={{ fontSize: '12px' }}>📝 ALL COMMENTS</div>
          <div className="code-tab" style={{ fontSize: '12px' }}>⭐ LATEST</div>
        </div>
        
        <div style={{ padding: '24px' }}>
          {comments.length === 0 ? (
            <div className="terminal" style={{ background: 'transparent', border: '1px dashed #3a3a4a' }}>
              <div className="terminal-body" style={{ textAlign: 'center', padding: '40px' }}>
                <div><span className="term-command">$</span> No comments yet</div>
                <div><span className="term-string">"Be the first to share your thoughts!"</span></div>
                <div className="cursor"></div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {comments.map((comment, index) => (
                <div 
                  key={comment.id} 
                  className="project-card" 
                  style={{ 
                    padding: '20px', 
                    background: 'rgba(10, 10, 20, 0.6)',
                    backdropFilter: 'blur(8px)',
                    animation: `fadeIn 0.3s ease ${index * 0.1}s both`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00ffaa, #80ffff)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: '16px'
                      }}>
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{comment.name}</div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                          <span style={{ fontSize: '10px', color: '#666', fontFamily: "'Fira Code', monospace", display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={10} /> {comment.date}
                          </span>
                          <span style={{ fontSize: '10px', color: '#666', fontFamily: "'Fira Code', monospace" }}>
                            at {comment.time || 'recent'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleLike(comment.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <Heart 
                        size={14} 
                        style={{ 
                          color: likedComments[comment.id] ? '#ff4444' : '#888',
                          fill: likedComments[comment.id] ? '#ff4444' : 'none'
                        }} 
                      />
                      <span style={{ fontSize: '11px', color: likedComments[comment.id] ? '#ff4444' : '#888' }}>
                        {comment.likes || 0}
                      </span>
                    </button>
                  </div>
                  
                  <p style={{ 
                    color: '#b0b0c0', 
                    fontSize: '13px', 
                    lineHeight: '1.6',
                    marginLeft: '52px',
                    marginBottom: '12px'
                  }}>
                    {comment.text}
                  </p>
                  
                  <div style={{ marginLeft: '52px' }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#666',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#00ffaa'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      <Reply size={12} /> Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}