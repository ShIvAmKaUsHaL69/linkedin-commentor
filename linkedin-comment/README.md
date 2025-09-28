# 🚀 LinkedIn Comment Generator

An intelligent Chrome extension that generates AI-powered comments for LinkedIn posts, helping you engage meaningfully with your network.

## ✨ Features

- **🤖 AI-Powered Comments**: Generate intelligent, contextual comments using advanced AI
- **🎨 Modern UI**: Clean, LinkedIn-inspired design with smooth animations
- **🎯 Multiple Tones**: Choose from Professional, Friendly, Supportive, Inquisitive, Cheerful, or Funny tones
- **📋 Easy Copy**: One-click copy to clipboard with visual feedback
- **💬 Auto-Post**: Automatically post comments directly to LinkedIn posts
- **🔄 Regenerate**: Generate multiple variations until you find the perfect comment
- **💡 Hint System**: Add custom hints to guide comment generation
- **🚀 Fast & Lightweight**: Minimal performance impact on LinkedIn

## 🖼️ Screenshots



### Extension Popup
The popup interface allows you to generate comments from any LinkedIn page:
- Clean, modern design with LinkedIn's color scheme
- Real-time post content preview
- Multiple generation options

![LinkedIn Comment Generator Screenshot](/screenshots/popup.png)

### In-Page Comment Panel
Generate comments directly on LinkedIn posts:
- Appears as a floating panel next to posts
- Context-aware comment generation
- Seamless integration with LinkedIn's UI

![LinkedIn Comment Generator Screenshot](/screenshots/option.png)

## 🛠️ Installation

### Method 1: Chrome Web Store (Recommended)
*Coming soon - extension will be available on the Chrome Web Store*

### Method 2: Manual Installation (Developer Mode)

1. **Download the Extension**
   ```bash
   git clone https://github.com/ShIvAmKaUsHaL69/linkedin-commentor.git
   ```

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder
   - The extension icon should appear in your toolbar

4. **Configure API (Required)**
   - The extension uses Shiv AI for comment generation
   - Make sure your API endpoint is configured in `background.js`

## 🚀 Usage

### Quick Start

1. **Navigate to LinkedIn**
   - Open LinkedIn in your browser
   - Go to your feed or any post

2. **Generate Comments (Two Ways)**

   **Option A: Using the Popup**
   - Click the extension icon in your toolbar
   - The popup will show the current post content
   - Click "Generate Comment" to create an AI comment
   - Use "Copy" to copy to clipboard or "Post Comment" to auto-post

   **Option B: Using In-Page Buttons**
   - Look for the blue "AI Comment" button next to Like/Comment/Share
   - Click it to open the comment generation panel
   - Generate, customize, and post your comment

### Advanced Features

**🎨 Tone Selection**
Choose from different comment tones:
- **Professional 💼**: Formal, business-appropriate
- **Supportive 🤝**: Encouraging and positive  
- **Friendly 😊**: Casual and approachable
- **Inquisitive ❓**: Asks thoughtful questions
- **Cheerful 🎉**: Upbeat and enthusiastic
- **Funny 😂**: Light-hearted and humorous

**💡 Custom Hints**
Add hints to guide the AI:
```
"Focus on the business impact"
"Ask about their experience"
"Mention industry trends"
```

**🔄 Regeneration**
Not happy with the first result? Click "Regenerate" to get different variations while keeping the same tone and hints.

## ⚙️ Configuration

### Customization

**Debug Mode**
Enable debug mode for troubleshooting:
- Press `Ctrl+Shift+D` on any LinkedIn page
- View detailed logs in the browser console

**UI Customization**
Modify the extension's appearance by editing the CSS in:
- `popup.html` - Popup window styles
- `content.js` - In-page UI styles

## 🏗️ Architecture

### File Structure
```
linkedin-comment/
├── manifest.json          # Extension configuration
├── popup.html             # Popup window UI
├── popup.js               # Popup logic
├── content.js             # LinkedIn page integration
├── background.js          # API calls and background tasks
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
└── README.md             # This file
```

### Core Components

**Content Script** (`content.js`)
- Integrates with LinkedIn's UI
- Detects posts and adds "AI Comment" buttons
- Handles comment insertion and posting
- Manages the floating comment generation panel

**Popup Script** (`popup.js`)
- Manages the extension popup interface
- Communicates with the content script
- Handles comment generation from the toolbar

**Background Script** (`background.js`)
- Makes API calls to the AI service
- Handles cross-origin requests
- Manages extension settings

## 🔧 Development

### Prerequisites
- Chrome browser with Developer Mode enabled
- Basic knowledge of JavaScript, HTML, CSS
- Access to an AI API service (Shiv AI)

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/linkedin-comment-generator.git
   cd linkedin-comment-generator
   ```

2. **Make Changes**
   - Edit files as needed
   - Test changes by reloading the extension in Chrome

3. **Reload Extension**
   - Go to `chrome://extensions/`
   - Click the refresh icon on your extension
   - Test your changes on LinkedIn

### Adding New Features

**New Comment Tones**
Add new tones in `content.js`:
```javascript
const tones = [
    { value: 'custom', label: 'Custom Tone 🎯' },
    // ... existing tones
];
```

**New AI Models**
Configure additional AI models in `content.js`:
```javascript
const AI_MODELS = {
    MODELS: [
        { value: 'new-model', label: 'New AI Model 🤖', apiName: 'new-model' },
        // ... existing models
    ]
};
```

## 🐛 Troubleshooting

### Common Issues

**Extension Not Working**
- Ensure you're on a LinkedIn page (`*.linkedin.com`)
- Check that the extension is enabled in Chrome
- Try refreshing the LinkedIn page

**Comments Not Generating**
- Verify your API configuration in `background.js`
- Check the browser console for error messages
- Ensure you have internet connectivity

**Auto-Post Not Working**
- Make sure you're logged into LinkedIn
- Try manually clicking the comment button first
- Check if LinkedIn's UI has changed (may need extension update)

**Debug Mode**
Enable debug mode by pressing `Ctrl+Shift+D` on LinkedIn:
- View detailed logs in the browser console
- See visual feedback for button detection
- Monitor API calls and responses

### Getting Help

1. **Check the Console**
   - Open Developer Tools (F12)
   - Look for error messages in the Console tab

2. **Enable Debug Mode**
   - Press `Ctrl+Shift+D` on LinkedIn
   - Watch for visual feedback and console logs

3. **Report Issues**
   - Include your Chrome version
   - Describe the steps to reproduce the issue
   - Share any console error messages

## 📝 Changelog

### Version 1.0.0
- ✨ Initial release
- 🤖 AI-powered comment generation
- 🎨 Modern LinkedIn-inspired UI
- 📋 Copy to clipboard functionality
- 💬 Auto-post comments
- 🎯 Multiple tone options
- 🔄 Comment regeneration
- 💡 Custom hint system

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Your Changes**
4. **Test Thoroughly**
5. **Submit a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test on multiple LinkedIn pages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LinkedIn** for providing an amazing platform for professional networking
- **Shiv AI** for powering the intelligent comment generation
- **Chrome Extensions API** for making browser integration possible
- **Open Source Community** for inspiration and best practices

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ShIvAmKaUsHaL69/linkedin-commentor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ShIvAmKaUsHaL69/linkedin-commentor/discussions)
- **Email**: shivamkaushal181@gmail.com

---

Made with ❤️ by Shivam for the LinkedIn community. Happy networking! 🌟
