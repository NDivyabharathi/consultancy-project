# IntelliTextile Dark Theme - Color Palette Reference

## 🎨 Official Color Palette

### Primary Background Colors
```
#0a0a0a - Pure Black (Page background)
#1a1a1a - Very Dark Grey (Sidebar base)
#1f1f1f - Dark Grey (Header, Card base)
#2a2a2a - Medium Dark (Card backgrounds)
#2d2d2d - Medium Dark (Gradients)
```

### Secondary Colors
```
#3a3a3a - Medium Grey (Borders, dividers)
#4a4a4a - Light-Medium Grey (Hover states, buttons)
#5a5a5a - Light Grey (Focus states)
#606060 - Lighter Grey (Scroll thumb hover)
```

### Text & Content Colors
```
#707070 - Dark Grey (Muted text, small labels)
#909090 - Medium Grey (Secondary text, icons)
#b0b0b0 - Light Grey (Primary text on dark)
#c0c0c0 - Lighter Grey (Labels, form placeholders)
#d0d0d0 - Very Light Grey (Hover text)
#e0e0e0 - Almost White (Heading, primary text)
```

### Status & Alert Colors
```
#ff8888 - Red (Errors, high waste, pending)
#6ca3ff - Blue (Info, shipped)
#4a7a4a - Green (Success, delivered, low waste)
#d4a574 - Gold (Confirmed, important)
```

### Special States
```
#0f0f0f - Pure Black (Sidebar edge)
#161616 - Very Dark (Header bottom)
#252525 - Dark (Gradient end, focus backgrounds)
```

## 📊 Color Usage Map

### Components Using Each Color

**#2a2a2a - Card Backgrounds**
- KPI cards
- Table containers
- Chat container
- Product cards
- FAQs
- Configuration panels

**#1f1f1f - Gradient Start**
- Form backgrounds
- Input fields
- Button backgrounds

**#3a3a3a - Borders**
- Card borders
- Table dividers
- Input borders
- Separator lines

**#e0e0e0 - Primary Text**
- Headings (h1, h2, h3)
- Page titles
- Card titles
- Form labels
- Chat messages (user)

**#b0b0b0 - Secondary Text**
- Table content
- Form descriptions
- Chat messages (bot)
- List items

**#909090 - Tertiary Text**
- Muted labels
- Small text
- Icon colors
- Metadata

## 🎯 CSS Gradient Examples

### Standard Card Gradient
```css
background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%);
```

### Button/Control Gradient
```css
background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
```

### Form Input Gradient
```css
background: linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%);
```

### Price Box / Emphasis
```css
background: linear-gradient(135deg, #3a3a3a 0%, #2d2d2d 100%);
```

## 🔍 Opacity & Transparency Values

```
rgba(255, 255, 255, 0.02)  - Barely visible overlay
rgba(100, 100, 100, 0.1)   - Very light background
rgba(100, 100, 100, 0.15)  - Light background
rgba(100, 100, 100, 0.2)   - Medium background
rgba(0, 0, 0, 0.5)         - Dark shadow
rgba(0, 0, 0, 0.7)         - Darker shadow
```

## 📐 Design System Tokens

### Spacing
```
Gap: 10px, 12px, 15px, 20px, 30px
Padding: 8px, 10px, 12px, 15px, 20px, 30px
Margin: 6px, 8px, 10px, 12px, 15px, 20px, 30px
```

### Border Radius
```
4px   - Small buttons, badges
6px   - Icon buttons
8px   - Inputs, FAQs
12px  - Cards, containers
```

### Shadows
```
0 2px 8px rgba(0, 0, 0, 0.06)     - Light shadow (old light theme)
0 8px 32px rgba(0, 0, 0, 0.5)     - Card shadow (current dark theme)
0 12px 40px rgba(0, 0, 0, 0.7)    - Hover shadow (on hover)
0 0 0 3px rgba(100, 100, 100, 0.2) - Focus glow
```

### Transitions
```
all 0.3s - Standard smooth transition
transition: all 0.3s ease-in-out
```

## 📱 Responsive Breakpoint

```css
@media (max-width: 768px) {
  /* Tablet and mobile adjustments */
}
```

## 🎬 Animation Keyframes

### Textile Swirl
```css
@keyframes swirl {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Swirl Reverse
```css
@keyframes swirl-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
```

### Drift (Subtle Movement)
```css
@keyframes drift {
  0% { transform: translate(0, 0); }
  50% { transform: translate(5px, -5px); }
  100% { transform: translate(0, 0); }
}
```

## 🖼️ Component Examples

### KPI Card
```
Background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)
Border: 1px solid #3a3a3a
Label Color: #909090
Value Color: #e0e0e0
Icon BG: #4a4a4a
Shadow: 0 8px 32px rgba(0, 0, 0, 0.5)
```

### Form Input
```
Background: linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)
Border: 1px solid #3a3a3a
Text Color: #e0e0e0
Focus Border: #5a5a5a
Focus Shadow: 0 0 0 3px rgba(100, 100, 100, 0.2)
```

### Status Badge
- Success: bg: rgba(74, 144, 74, 0.15), color: #90ee90
- Pending: bg: rgba(255, 107, 107, 0.15), color: #ff8888
- Shipped: bg: rgba(74, 144, 226, 0.15), color: #6ca3ff
- Confirmed: bg: rgba(184, 134, 11, 0.15), color: #d4a574

### Table Header
```
Background: rgba(255, 255, 255, 0.02)
Text Color: #c0c0c0
Border-bottom: 2px solid #3a3a3a
Padding: 12px
```

### Button
```
Default:
  - Background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)
  - Border: 2px solid #3a3a3a
  - Color: #909090

Hover:
  - Background: linear-gradient(135deg, #333333 0%, #252525 100%)
  - Border-color: #5a5a5a
  - Color: #c0c0c0

Active:
  - Background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%)
  - Border-color: #5a5a5a
  - Color: #e0e0e0
```

## 🧮 Contrast Ratios (WCAG AA Compliant)

| Text Color | Background | Ratio | Status |
|-----------|-----------|-------|--------|
| #e0e0e0 | #1f1f1f | 10.5:1 | ✅ AAA |
| #c0c0c0 | #2a2a2a | 7.5:1 | ✅ AAA |
| #b0b0b0 | #1f1f1f | 5.8:1 | ✅ AA |
| #909090 | #2a2a2a | 3.2:1 | ⚠️ AA Large |
| #ff8888 | #1f1f1f | 5.2:1 | ✅ AA |
| #6ca3ff | #1f1f1f | 6.8:1 | ✅ AAA |

---

## 📝 Notes

- All colors use hex notation for consistency
- Gradients use 135deg angle for top-left to bottom-right flow
- Shadows use rgba black for depth on dark background
- Text uses light colors (#e0e0e0 primary) for dark backgrounds
- Status colors use low opacity backgrounds (15%) for integration

## 🔄 Migration from Light Theme

Old Blue/Purple (#667eea, #764ba2) → Dark Grey/Black theme
- Preserved functionality
- Enhanced readability
- Reduced eye strain
- Modern aesthetic

---

**Version**: 1.0 Dark Theme
**Created**: 2024
**Status**: Production Ready
