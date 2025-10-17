import { useState, useContext } from 'react'
import { AuthContext } from './AuthContext'

export function Paywall({ onUpgrade }) {
  return (
    <div className="paywall-overlay">
      <div className="paywall-box">
        <h2>Upgrade to Unlock</h2>
        <p>You've used all your free applications this month.</p>
        <p className="paywall-subtext">Upgrade to unlimited access.</p>
        
        <div className="pricing-options">
          <div className="price-card">
            <h3>Pay Per Use</h3>
            <div className="price">$2.99</div>
            <p className="price-desc">Per application package</p>
            <button onClick={() => onUpgrade('pay-per-use')} className="upgrade-btn">
              Get Started
            </button>
          </div>

          <div className="price-card featured">
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
