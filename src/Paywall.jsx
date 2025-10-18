import { useState, useContext } from 'react'
import { AuthContext } from './AuthContext'

export function Paywall({ onUpgrade }) {
  return (
    <div className="paywall-overlay" style={{
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div className="paywall-box" style={{
        background: 'rgba(15, 20, 25, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(96, 165, 250, 0.1)',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <h2>Upgrade to Unlock</h2>
        <p>You've used all your free applications this month.</p>
        <p className="paywall-subtext">Upgrade to unlimited access.</p>
        
        <div className="pricing-options">
          <div className="price-card" style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h3>Pay Per Use</h3>
            <div className="price">$2.99</div>
            <p className="price-desc">Per application package</p>
            <button onClick={() => onUpgrade('pay-per-use')} className="upgrade-btn">
              Get Started
            </button>
          </div>
          <div className="price-card featured" style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(15, 20, 25, 0.9)'
          }}>
            <div className="badge">BEST VALUE</div>
            <h3>Monthly Subscription</h3>
            <div className="price">$4.99<span className="period">/month</span></div>
            <p className="price-desc">Unlimited applications</p>
            <button onClick={() => onUpgrade('subscription')} className="upgrade-btn featured-btn">
              Subscribe Now
            </button>
          </div>
        </div>
        <p className="paywall-footer">Cancel anytime. No credit card required to try free.</p>
      </div>
    </div>
  )
}
