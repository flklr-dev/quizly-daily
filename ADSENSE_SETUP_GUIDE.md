# 🎯 Google AdSense Setup Guide for Quizly Daily

## 📋 **Step-by-Step Instructions**

### **Step 1: Access Google AdSense**
1. Go to [adsense.google.com](https://adsense.google.com)
2. Sign in with your Google account
3. Select your Quizly Daily site

### **Step 2: Create Ad Units**

You need to create **5 different ad units**:

#### **A. Sidebar Ad Units (2 needed)**
1. Click **"Ads"** in the left sidebar
2. Click **"By ad unit"** tab
3. Click **"Create new ad unit"**
4. **Name**: `Quizly Sidebar Left`
5. **Format**: Display ads
6. **Size**: Responsive or 160x600 (vertical)
7. Click **"Create"**
8. **Copy the Ad unit ID** (e.g., `ca-pub-4442939390084208/1234567890`)
9. **Repeat** for `Quizly Sidebar Right`

#### **B. Completion Ad Units (3 needed)**
1. Create `Quizly Random Quiz Completion`
2. Create `Quizly Daily Challenge Completion`
3. Create `Quizly Daily Challenge Completed`
4. **Format**: Display ads, Responsive
5. **Copy Ad unit IDs** for each

### **Step 3: Extract Ad Slot IDs**

From each Ad unit ID, extract the **last part** (after the slash):

**Example**: 
- Full ID: `ca-pub-4442939390084208/1234567890`
- **Ad Slot ID**: `1234567890` ← This is what you need

### **Step 4: Replace Placeholder Ad Slots**

Replace these placeholders in your code with your real ad slot IDs:

#### **File: src/App.jsx**
```javascript
// Replace these:
adSlot="YOUR_LEFT_SIDEBAR_AD_SLOT_ID"
adSlot="YOUR_RIGHT_SIDEBAR_AD_SLOT_ID"

// With your real ad slot IDs (e.g.):
adSlot="1234567890"
adSlot="0987654321"
```

#### **File: src/pages/RandomQuiz.jsx**
```javascript
// Replace this:
adSlot="YOUR_RANDOM_QUIZ_COMPLETION_AD_SLOT_ID"

// With your real ad slot ID (e.g.):
adSlot="5555555555"
```

#### **File: src/pages/DailyChallenge.jsx**
```javascript
// Replace these:
adSlot="YOUR_DAILY_CHALLENGE_COMPLETION_AD_SLOT_ID"
adSlot="YOUR_DAILY_CHALLENGE_COMPLETED_AD_SLOT_ID"

// With your real ad slot IDs (e.g.):
adSlot="6666666666"
adSlot="7777777777"
```

### **Step 5: Test Your Implementation**

1. **Deploy your site** to a live domain
2. **Wait 24-48 hours** for AdSense to crawl your site
3. **Check AdSense dashboard** for:
   - Ad unit status (should show "Active")
   - Impressions and clicks
   - Revenue data

### **Step 6: Monitor Performance**

- **Check AdSense dashboard** regularly
- **Monitor ad placement** on your site
- **Optimize** based on performance data

## 🚨 **Important Notes**

1. **Live Domain Required**: AdSense only works on live websites, not localhost
2. **Approval Process**: New sites may take 1-2 weeks for AdSense approval
3. **Ad Blockers**: Some users may have ad blockers enabled
4. **Mobile Experience**: Ads are hidden on mobile for better UX
5. **Revenue**: It may take time to start earning significant revenue

## 📱 **Ad Placement Summary**

- **Desktop (>1200px)**: Sidebar ads + completion ads
- **Tablet (768px-1200px)**: Completion ads only
- **Mobile (<480px)**: No ads (clean mobile experience)

## 🔧 **Troubleshooting**

If ads don't appear:
1. Check if your site is live and accessible
2. Verify ad unit IDs are correct
3. Wait 24-48 hours for AdSense to start serving ads
4. Check browser console for errors
5. Ensure your site complies with AdSense policies

## 💰 **Revenue Optimization Tips**

1. **A/B test** different ad placements
2. **Monitor** which ad units perform best
3. **Optimize** content for better engagement
4. **Consider** adding more ad units if performance is good
5. **Follow** AdSense policies strictly

---

**Need Help?** Check the [Google AdSense Help Center](https://support.google.com/adsense) for detailed documentation. 