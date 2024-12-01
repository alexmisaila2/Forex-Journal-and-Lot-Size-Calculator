# Forex Trading Journal Application 📊

A professional-grade application to help you track, analyze, and enhance your forex trading performance. Built with React and Tailwind CSS, this application offers a clean, intuitive UI and all the essential features to maintain a complete trading journal.

---

## Key Features

### 📈 Statistics Dashboard
- **Total P/L**: Displays profit/loss with color-coded indicators.
- **Win Rate**: Shows the success rate in percentage.
- **Total Trades**: Keeps count of all recorded trades.
- **Rules Followed**: Tracks adherence to your trading rules.

### 🔄 Trade Management
- **Add New Trades**: Log trades with an easy-to-use modal form.
- **Edit/Delete Trades**: Update or remove entries with confirmation prompts.
- **Persistent Storage**: Uses `localStorage` to save your data between sessions.

### 🔍 Advanced Filtering
- **Filter by Month & Result**: Narrow down trades by date or outcome (Won/Lost).
- **Dynamic Updates**: View changes in real-time.

### 📄 Pagination
- **10 Trades per Page**: Controls the number of visible trades with easy navigation.

---

## Trade Details at a Glance

- **Date & Market**: Log details for quick reference.
- **Setup**: Choose between SA1, Fibs, etc.
- **Profit/Loss**: Color-coded for easy distinction.
- **Rules Followed**: Shows compliance.
- **Notes**: Optional field for extra insights.

---

## Responsive Design 🌐

Designed to work seamlessly across devices, ensuring a consistent experience whether on desktop or mobile.

---

## Enhanced with Persistent Storage & Lot Calculator

For added functionality:

1. **Persistent Storage with IndexedDB**: Keeps your trading data secure in the browser’s IndexedDB.
2. **Forex Lot Calculator**:
   - **Capital-Based** and **Risk-Based Calculations**
   - Real-time updates with a professional interface

### Key Enhancements
- Improved error handling
- Optimized for performance
- Enhanced type safety and user experience

---

## Quick Start 🚀

Follow these steps to run the application locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/forex-trading-journal.git

# Install dependencies
npm install

# Start the development server
npm run dev
