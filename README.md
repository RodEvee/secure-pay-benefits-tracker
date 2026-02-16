# 💼 Secure Pay & Benefits Tracker

A privacy-first, highly accurate employee time-tracking and compensation calculator with biometric simulation and local encryption.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.4-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff.svg)

## ✨ Features

- 🔐 **Biometric Authentication Simulation** - Face recognition simulation for secure access
- ⏱️ **Time Tracking** - Clock in/out with precise time recording
- 💰 **Salary Calculator** - Automatic calculation with overtime support
- 📊 **Benefits Tracking** - Health, dental, vision, and 401(k) management
- 📈 **Weekly Pay Summary** - Detailed breakdown of gross pay, deductions, and net pay
- 📅 **History & Reports** - View and export historical time entries
- 🔒 **Local Encryption** - All data stored securely in browser
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🌙 **Modern UI** - Clean interface with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/secure-pay-benefits-tracker.git
   cd secure-pay-benefits-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   
   The app includes a `.env.local` file for Gemini API integration. If you plan to use AI features:
   ```bash
   # Edit .env.local and add your Gemini API key
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
secure-pay-benefits-tracker/
├── components/           # React components
│   ├── Auth.tsx         # Authentication component
│   ├── Dashboard.tsx    # Main dashboard
│   ├── History.tsx      # Time entry history
│   ├── Settings.tsx     # User settings
│   ├── TimeModal.tsx    # Time entry modal
│   ├── ExportModal.tsx  # Data export modal
│   └── Layout.tsx       # App layout wrapper
├── services/            # Business logic
│   ├── storageService.ts   # Local storage management
│   └── calcService.ts      # Salary calculations
├── App.tsx              # Main app component
├── types.ts             # TypeScript type definitions
├── index.tsx            # App entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## 🎯 Usage

### First Time Setup

1. **Authentication**: On first launch, you'll see a biometric authentication simulation screen
2. **Grant camera permission** (simulated - no actual camera access)
3. **Complete authentication** to access the dashboard

### Recording Time

1. Click **"Clock In"** to start tracking time
2. Click **"Clock Out"** when finished
3. View your weekly summary with automatic calculations

### Managing Settings

1. Navigate to **Settings** tab
2. Configure:
   - Hourly rate
   - Overtime threshold and multiplier
   - Health insurance (employee & employer contributions)
   - Dental and vision insurance
   - 401(k) contributions (fixed amount or percentage)
   - Security settings (biometric, 2FA)

### Viewing History

1. Go to **History** tab
2. Filter by date range
3. Export data to CSV or JSON

## 🛠️ Technology Stack

- **React 19.2.4** - UI framework
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icon library
- **LocalStorage API** - Data persistence

## 🔒 Privacy & Security

- ✅ **100% client-side** - No data sent to external servers
- ✅ **Local storage encryption** - Data encrypted in browser
- ✅ **No tracking** - Zero analytics or user tracking
- ✅ **Open source** - Fully transparent code

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you discover any bugs, please create an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 💡 Feature Requests

Have an idea? Open an issue with the `enhancement` label!

## 📞 Support

For support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide
- Powered by Vite

---

**Note**: This is a demo application for educational purposes. For production use with real financial data, additional security measures and backend integration would be recommended.
