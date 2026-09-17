"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import './login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleAuthSuccess = async (userCredential: UserCredential) => {
    const returnOrigin = searchParams.get('returnOrigin') || "*";
    
    if (window.opener) {
      const idToken = await userCredential.user.getIdToken();
      
      window.opener.postMessage(
        {
          type: "SSO_AUTH_SUCCESS",
          payload: {
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            photoURL: userCredential.user.photoURL,
            idToken,
          },
        },
        returnOrigin // Uses the query param or fallback
      );
      window.close();
    } else {
      router.push('/api/key');
    }
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleAuthSuccess(userCredential);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await handleAuthSuccess(userCredential);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await handleAuthSuccess(userCredential);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with GitHub');
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new OAuthProvider('microsoft.com');
      const userCredential = await signInWithPopup(auth, provider);
      await handleAuthSuccess(userCredential);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Microsoft');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f0f0' }}>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      {/* Floating nav icons */}
      <div className="auth-floating-icons">
        <Link href="/" title="Back to Home" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.4)',
          textDecoration: 'none', color: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        }}>
          <span className="material-icons" style={{ fontSize: '22px' }}>home</span>
        </Link>
        <Link href="/support" title="Help & Support" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.4)',
          textDecoration: 'none', color: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        }}>
          <span className="material-icons" style={{ fontSize: '22px' }}>help_outline</span>
        </Link>
      </div>

      <div className="content">
        <div className="login-card">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Image src="/eh_logo_web44.png" alt="Erickson Holding" width={160} height={38} style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
          </div>

          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to your CrypterChat Server Hub</p>

          {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}

          <div className="form-group">
            <label>Email address</label>
            <input 
              type="email" 
              autoComplete="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              autoComplete="current-password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </div>
          
          <Link href="/forgot-password" className="forgot">Forgot password?</Link>
          <button 
            className="btn-login" 
            type="button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <div className="divider"><span>or continue with</span></div>
          
          <button className="btn-social" type="button" onClick={handleGoogleSignIn} disabled={loading}>
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.7 13.2 17.9 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"></path>
              <path fill="#FBBC05" d="M10.8 28.7A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7L2.5 13.3A24 24 0 0 0 0 24c0 3.8.9 7.4 2.5 10.7l8.3-6z"></path>
              <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.1 0-11.3-3.7-13.2-9l-8.3 6C6.9 42.6 14.8 48 24 48z"></path>
            </svg> 
            Continue with Google 
          </button>
          
          <button className="btn-social" type="button" onClick={handleGithubSignIn} disabled={loading}>
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#24292E" d="M24 0C10.74 0 0 10.74 0 24c0 10.6 6.88 19.6 16.44 22.8 1.2.22 1.64-.52 1.64-1.16v-4.5c-6.68 1.45-8.08-2.73-8.08-2.73-1.09-2.77-2.66-3.51-2.66-3.51-2.18-1.49.16-1.46.16-1.46 2.41.17 3.68 2.48 3.68 2.48 2.14 3.67 5.62 2.61 6.99 2 0 0-1.2-1.25-1.2-3.1-5.32-.6-10.9-2.66-10.9-11.85 0-2.62.94-4.76 2.47-6.44-.24-.6-1.08-3.05.23-6.35 0 0 2.02-.64 6.6 2.46a22.95 22.95 0 016-.81c2.04.01 4.09.28 6 .81 4.58-3.1 6.6-2.46 6.6-2.46 1.31 3.3.48 5.75.24 6.35 1.53 1.68 2.47 3.82 2.47 6.44 0 9.21-5.59 11.24-10.93 11.83 0 0 1.25 1.25 1.25 3.32v4.94c0 .64.44 1.39 1.66 1.15C41.12 43.6 48 34.6 48 24 48 10.74 37.26 0 24 0z"></path>
            </svg>
            Continue with Github
          </button>  
          
          <button className="btn-social" type="button" onClick={handleMicrosoftSignIn} disabled={loading}>
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#f35325" d="M1 1h22v22H1z"/>
              <path fill="#81bc06" d="M25 1h22v22H25z"/>
              <path fill="#05a6f0" d="M1 25h22v22H1z"/>
              <path fill="#ffba08" d="M25 25h22v22H25z"/>
            </svg>
            Continue with Microsoft
          </button>
          
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
            Don&apos;t have an account? <Link href="/register" style={{ color: '#4C3663', fontWeight: 'bold' }}>Sign up</Link>
          </div>
        </div>
      </div>

      <footer>
        <span>&copy; 2021 - {new Date().getFullYear()} ERICKSON HOLDING LTD. All rights reserved.</span>
        <span className="sep" style={{ margin: '0 10px' }}> | </span>
        <span className="footer-links">
          <Link href="/about">About Us</Link>
          <span className="sep" style={{ margin: '0 10px' }}> | </span>
          <Link href="/contribution">Tor Contribution</Link>
          <span className="sep" style={{ margin: '0 10px' }}> | </span>
          <Link href="/status">Server Status</Link>
        </span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
