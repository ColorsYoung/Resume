# AI-Powered Cryptocurrency Trading Bot

**Role:** Software Engineer / Developer  
**Project:** Bitkub & Binance AI Trading Bot with Local Ollama  

## Project Overview
Developed an automated cryptocurrency trading bot using Local LLMs (Ollama) for real-time market analysis and trade execution. The system integrates with exchange APIs to execute trades based on AI-generated insights.

## Key Features & System Architecture
- **AI Decision Engine (`ai_engine`):** Integrated Local Ollama (e.g., Llama 3.1) to process market data and generate trading signals.
- **Market Data & Technical Analysis (`market_engine`):** Built a data processing pipeline using `pandas` and `pandas_ta` to calculate technical indicators (RSI, EMA, MACD).
- **Exchange API Integrations:** 
  - **Bitkub API v3 (`bitkub_api`):** Implemented direct communication with Bitkub's API, including secure payload signing using SHA-256.
  - **Binance API (`binance_api`):** Integrated Binance exchange support utilizing `ccxt`.
- **Execution & Risk Management (`execution_engine`):** Developed an execution system to process live orders, manage wallet balances, and enforce trading limits, including a "Dry Run" mode for testing.
- **Notification System (`notifier_engine`):** Developed a notification module for trade execution and system status alerts.
- **Security & Configuration:** Managed API credentials securely using `python-dotenv` and isolated the application in virtual environments.

## Technology Stack
- **Programming Language:** Python 3.10+
- **Artificial Intelligence:** Local LLM via Ollama (Llama 3.1)
- **Data Engineering & Analysis:** Pandas, Pandas-TA
- **API & Networking:** REST APIs, Requests, CCXT (CryptoCurrency eXchange Trading Library)
- **Security & Cryptography:** SHA-256 Hashing, HMAC
- **Environment Management:** Python-dotenv, Virtualenv (venv)
- **Architecture Pattern:** Modular Engine Design (Separation of Concerns for AI, Market Data, API, and Execution)
