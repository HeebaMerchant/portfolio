import React, { useState, useEffect } from 'react';
import './EmailPhishingDetection.css';
import BackButton from './BackButton';
import ProjectNavBar from './ProjectNavBar';

const EmailPhishingDetection = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollY, setScrollY] = useState(0);
  const [selectedModel, setSelectedModel] = useState('rf');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define navigation links for this project
  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'results', label: 'Results' }
  ];

  const models = {
    nb: { name: 'Naive Bayes', accuracy: '98.51%', f1: '0.98', auc: '0.99' },
    rf: { name: 'Random Forest', accuracy: '99.13%', f1: '0.99', auc: '0.99' },
    svm: { name: 'SVM', accuracy: '96.97%', f1: '0.97', auc: '0.96' }
  };

  const features = [
    { icon: '📧', name: 'Email Processing', description: 'TF-IDF vectorization and text preprocessing' },
    { icon: '🔗', name: 'URL Analysis', description: 'Extract and analyze suspicious URLs' },
    { icon: '🏷️', name: 'HTML Detection', description: 'Parse HTML tags and suspicious patterns' },
    { icon: '🔍', name: 'Keyword Extraction', description: 'Identify phishing keywords and patterns' }
  ];

  return (
    <div className="epd-container">
      <BackButton />
      
      {/* Navigation */}
      <ProjectNavBar 
        title="Phishing Detection ML"
        links={navLinks}
        theme="epd"
      />

      {/* Hero Section */}
      <section className="hero-section" id="overview">
        <div className="hero-bg-animation">
          <div className="cyber-grid"></div>
          <div className="floating-element email-1">@</div>
          <div className="floating-element email-2">✉️</div>
          <div className="floating-element shield">🛡️</div>
          <div className="floating-element warning">⚠️</div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>ML Group 51 Project</span>
          </div>
          <h1 className="hero-title">
            <span className="title-main">Email Phishing</span>
            <span className="title-gradient">Detection System</span>
          </h1>
          <p className="hero-description">
            Machine learning-powered solution detecting phishing emails with 99%+ accuracy
            using advanced NLP techniques and multiple classification models.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">$52B</div>
              <div className="stat-label">Lost to Phishing (2021-2023)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">10,000</div>
              <div className="stat-label">Emails Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99.13%</div>
              <div className="stat-label">Best Accuracy</div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#solution" className="btn-primary">
              <span>View Solution</span>
              <span className="btn-icon">→</span>
            </a>
            <a href="https://github.com/yourusername/phishing-detection" className="btn-secondary">
              <span>GitHub</span>
              <span className="btn-icon">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="problem-section">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-label">The Challenge</span>
            <h2 className="section-title">Cybersecurity Threat</h2>
          </div>
          
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">💰</div>
              <h3>Financial Loss</h3>
              <p>Over $52 billion lost globally to phishing attacks between 2021-2023</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🎯</div>
              <h3>Identity Theft</h3>
              <p>Phishing leads to credential theft, fraud, and personal data exposure</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">📈</div>
              <h3>Growing Threat</h3>
              <p>Attacks becoming more sophisticated and harder to detect manually</p>
            </div>
          </div>
          
          <div className="problem-statement">
            <h3>Problem Statement</h3>
            <p>
              Phishing emails pose a significant threat to cybersecurity, leading to identity theft, 
              financial fraud, and data breaches. We need an automated solution that can accurately 
              distinguish phishing attempts from legitimate emails to protect users.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="solution-section">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Our Approach</span>
            <h2 className="section-title">ML-Powered Solution</h2>
          </div>
          
          <div className="pipeline-visualization">
            <div className="pipeline-step">
              <div className="step-number">1</div>
              <h4>Data Preprocessing</h4>
              <ul>
                <li>Lowercase conversion</li>
                <li>URL removal & extraction</li>
                <li>Stopword elimination</li>
                <li>Stemming & word simplification</li>
                <li>Noise removal (punctuation)</li>
                <li>Batch processing (1,000 emails)</li>
              </ul>
            </div>
            
            <div className="pipeline-arrow">→</div>
            
            <div className="pipeline-step">
              <div className="step-number">2</div>
              <h4>Feature Engineering</h4>
              <ul>
                <li>TF-IDF vectorization</li>
                <li>Email length calculation</li>
                <li>URL count analysis</li>
                <li>Suspicious keyword detection</li>
                <li>HTML tag counting</li>
                <li>Capitalized word frequency</li>
              </ul>
            </div>
            
            <div className="pipeline-arrow">→</div>
            
            <div className="pipeline-step">
              <div className="step-number">3</div>
              <h4>Model Training</h4>
              <ul>
                <li>Naive Bayes (ComplementNB)</li>
                <li>Random Forest (100 trees)</li>
                <li>Linear SVM (gradient descent)</li>
                <li>80/20 train-test split</li>
                <li>Random state: 42</li>
                <li>Memory optimization</li>
              </ul>
            </div>
          </div>
          
          <div className="model-details-expanded">
            <h3>Model Architecture Details</h3>
            <div className="architecture-grid">
              <div className="architecture-card">
                <h4>ComplementNB</h4>
                <p>Specialized for imbalanced datasets, learns from complement class distributions</p>
                <ul>
                  <li>Computes log-probabilities from word counts</li>
                  <li>Inverts non-phishing distributions</li>
                  <li>Applies smoothing to prevent zero probabilities</li>
                  <li>Reduces bias toward majority class</li>
                </ul>
              </div>
              <div className="architecture-card">
                <h4>Random Forest</h4>
                <p>Ensemble learning with 100 decision trees for non-linear relationships</p>
                <ul>
                  <li>Random feature subset at each node</li>
                  <li>Bootstrap sampling for diversity</li>
                  <li>Feature importance scores tracked</li>
                  <li>Handles mixed data types effectively</li>
                </ul>
              </div>
              <div className="architecture-card">
                <h4>Linear SVM</h4>
                <p>Maximum margin classifier with gradient descent optimization</p>
                <ul>
                  <li>Hinge loss function for updates</li>
                  <li>Lambda regularization parameter</li>
                  <li>Transforms labels to -1 and +1</li>
                  <li>Sigmoid for confidence scores</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="features-showcase">
            <h3>Key Features Extracted</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.name}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="models-section">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Machine Learning</span>
            <h2 className="section-title">Model Performance</h2>
          </div>
          
          <div className="models-selector">
            {Object.entries(models).map(([key, model]) => (
              <button
                key={key}
                className={`model-tab ${selectedModel === key ? 'active' : ''}`}
                onClick={() => setSelectedModel(key)}
              >
                {model.name}
              </button>
            ))}
          </div>
          
          <div className="model-details">
            <div className="model-metrics">
              <div className="metric-card">
                <div className="metric-value">{models[selectedModel].accuracy}</div>
                <div className="metric-label">Accuracy</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{models[selectedModel].f1}</div>
                <div className="metric-label">F1 Score</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{models[selectedModel].auc}</div>
                <div className="metric-label">ROC-AUC</div>
              </div>
            </div>
            
            <div className="model-description">
              {selectedModel === 'nb' && (
                <>
                  <h4>Complement Naive Bayes</h4>
                  <p>Specialized for imbalanced datasets, learns from complement class distributions.
                  Reduces bias toward legitimate emails and improves minority class detection.</p>
                </>
              )}
              {selectedModel === 'rf' && (
                <>
                  <h4>Random Forest</h4>
                  <p>Ensemble of 100 decision trees capturing non-linear relationships.
                  Best overall performance with lowest false positives and negatives.</p>
                </>
              )}
              {selectedModel === 'svm' && (
                <>
                  <h4>Support Vector Machine</h4>
                  <p>Linear SVM with gradient descent optimization. Finds maximum margin hyperplane
                  for class separation. Low false positives but higher false negatives.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="results-section">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Performance</span>
            <h2 className="section-title">Results & Analysis</h2>
          </div>
          
          <div className="metrics-overview">
            <h3>Evaluation Metrics</h3>
            <div className="metrics-grid">
            <div className="metric-explanation">
                <h4>Accuracy</h4>
                <p>Percentage of correctly classified emails. Target: ≥95%</p>
            </div>
            <div className="metric-explanation">
                <h4>F1-Score</h4>
                <p>Harmonic mean of precision and recall. Target: {'>'} 0.90</p>
            </div>
            <div className="metric-explanation">
                <h4>ROC-AUC</h4>
                <p>Class separation ability across thresholds. Target: ≥95%</p>
              </div>
              <div className="metric-explanation">
                <h4>Average Precision</h4>
                <p>Area under precision-recall curve. Critical for imbalanced data</p>
              </div>
            </div>
          </div>
          
          <div className="results-visualization">
            <div className="chart-container">
              <h3>Model Comparison</h3>
              <div className="comparison-bars">
                <div className="bar-group">
                  <div className="bar-label">Naive Bayes</div>
                  <div className="bar-wrapper">
                    <div className="bar nb-bar" style={{width: '98.51%'}}>98.51%</div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">Random Forest</div>
                  <div className="bar-wrapper">
                    <div className="bar rf-bar" style={{width: '99.13%'}}>99.13%</div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">SVM</div>
                  <div className="bar-wrapper">
                    <div className="bar svm-bar" style={{width: '96.97%'}}>96.97%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="key-findings">
              <h3>Key Findings</h3>
              <ul>
                <li>Random Forest achieved highest accuracy (99.13%) and F1-score (0.99)</li>
                <li>Naive Bayes and Random Forest both achieved 0.99 ROC-AUC</li>
                <li>All models achieved high average precision (NB/RF: 0.99, SVM: 0.92)</li>
                <li>SVM showed cautious behavior with low false positives but high false negatives</li>
                <li>Random Forest had lowest combined false positives and negatives</li>
                <li>NB and RF excel at non-linear data; SVM limited to linear separation</li>
              </ul>
            </div>
          </div>
          
          <div className="confusion-matrix-analysis">
            <h3>Confusion Matrix Analysis</h3>
            <div className="matrix-cards">
              <div className="matrix-card">
                <h4>Random Forest</h4>
                <p>Best overall: Minimal false positives and negatives</p>
                <div className="matrix-stats">
                  <span>FP: Very Low</span>
                  <span>FN: Very Low</span>
                </div>
              </div>
              <div className="matrix-card">
                <h4>Naive Bayes</h4>
                <p>Balanced performance with slight FP increase</p>
                <div className="matrix-stats">
                  <span>FP: Low</span>
                  <span>FN: Low</span>
                </div>
              </div>
              <div className="matrix-card">
                <h4>SVM</h4>
                <p>Conservative: Minimizes FP at cost of high FN</p>
                <div className="matrix-stats">
                  <span>FP: Very Low</span>
                  <span>FN: High</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dataset-info">
            <h3>Dataset Statistics</h3>
            <div className="dataset-grid">
              <div className="dataset-card">
                <div className="dataset-number">10,000</div>
                <div className="dataset-label">Total Emails</div>
              </div>
              <div className="dataset-card">
                <div className="dataset-number">50/50</div>
                <div className="dataset-label">Class Balance</div>
              </div>
              <div className="dataset-card">
                <div className="dataset-number">1,000</div>
                <div className="dataset-label">Batch Size</div>
              </div>
              <div className="dataset-card">
                <div className="dataset-number">5</div>
                <div className="dataset-label">Numerical Features</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-label">ML Group 51</span>
            <h2 className="section-title">Project Team</h2>
          </div>
          
          <div className="team-grid">
            <div className="team-member highlight">
              <div className="member-avatar">HM</div>
              <h4>Heeba Merchant</h4>
              <p>Technical Content & Model Implementation</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">C</div>
              <h4>Colin</h4>
              <p>Technical Content & Preprocessing</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">CA</div>
              <h4>Caty</h4>
              <p>Introduction & Problem Statement</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">A</div>
              <h4>Alex</h4>
              <p>Results & Analysis</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">D</div>
              <h4>Daniel</h4>
              <p>Results & Future Improvements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Work Section */}
      <section className="future-section">
        <div className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Next Steps</span>
            <h2 className="section-title">Future Improvements</h2>
          </div>
          
          <div className="future-cards">
            <div className="future-card">
              <div className="future-icon">🎯</div>
              <h3>Class Balancing</h3>
              <p>Implement SMOTE or class weights to improve SVM recall performance and handle false negatives</p>
            </div>
            <div className="future-card">
              <div className="future-icon">⚡</div>
              <h3>Kernel Methods</h3>
              <p>Test RBF and polynomial kernels for SVM to capture non-linear relationships in data</p>
            </div>
            <div className="future-card">
              <div className="future-icon">🔄</div>
              <h3>Real-time Testing</h3>
              <p>Deploy models on real-world imbalanced datasets to validate performance</p>
            </div>
            <div className="future-card">
              <div className="future-icon">🚀</div>
              <h3>Production API</h3>
              <p>Create deployable email security filter with REST API for integration</p>
            </div>
            <div className="future-card">
              <div className="future-icon">🧠</div>
              <h3>Deep Learning</h3>
              <p>Explore LSTM/Transformer models for better context understanding</p>
            </div>
            <div className="future-card">
              <div className="future-icon">📊</div>
              <h3>Feature Enhancement</h3>
              <p>Add sender reputation, attachment analysis, and header anomaly detection</p>
            </div>
            <div className="future-card">
              <div className="future-icon">🔍</div>
              <h3>Ensemble Methods</h3>
              <p>Combine top models using voting or stacking for improved robustness</p>
            </div>
            <div className="future-card">
              <div className="future-icon">⏱️</div>
              <h3>Real-time Processing</h3>
              <p>Optimize for sub-second classification of incoming emails</p>
            </div>
          </div>
          
          <div className="implementation-timeline">
            <h3>Implementation Roadmap</h3>
            <div className="roadmap-items">
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 1</div>
                <h4>Research & Optimization</h4>
                <ul className="roadmap-list">
                  <li>Implement SMOTE for better class balance</li>
                  <li>Test RBF kernel for SVM to improve recall</li>
                  <li>Optimize Random Forest hyperparameters</li>
                  <li>Benchmark against 20k imbalanced dataset</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 2</div>
                <h4>Feature Engineering</h4>
                <ul className="roadmap-list">
                  <li>Add sender reputation analysis module</li>
                  <li>Implement attachment scanning & risk assessment</li>
                  <li>Develop header anomaly detection algorithm</li>
                  <li>Create contextual keyword analysis with BERT</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 3</div>
                <h4>API Development</h4>
                <ul className="roadmap-list">
                  <li>Build Flask/FastAPI REST service with JWT auth</li>
                  <li>Implement model pipeline with scikit-learn</li>
                  <li>Add real-time preprocessing microservice</li>
                  <li>Set up Docker containers for deployment</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 4</div>
                <h4>Integration</h4>
                <ul className="roadmap-list">
                  <li>Develop Outlook/Gmail add-ins for direct scanning</li>
                  <li>Create browser extension for webmail protection</li>
                  <li>Build SMTP proxy for server-side filtering</li>
                  <li>Implement logging and analytics dashboard</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-phase">Phase 5</div>
                <h4>Deployment & Monitoring</h4>
                <ul className="roadmap-list">
                  <li>Deploy to AWS/GCP with auto-scaling</li>
                  <li>Set up CI/CD pipeline with GitHub Actions</li>
                  <li>Implement A/B testing framework for model updates</li>
                  <li>Create feedback loop for continuous improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="epd-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h4>Email Phishing Detection System</h4>
            <p>ML Group 51 Project • January - May 2025</p>
            <p>Kaggle Phishing Email Dataset • 10,000 labeled emails</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/yourusername/phishing-detection">GitHub</a>
            <a href="#overview">Documentation</a>
            <a href="#results">Results</a>
            <a href="https://kaggle.com/dataset">Dataset</a>
          </div>
          <div className="footer-acknowledgments">
            <p>Special thanks to our advisors and the ML research community</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmailPhishingDetection;