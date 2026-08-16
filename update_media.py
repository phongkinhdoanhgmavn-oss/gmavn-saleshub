# -*- coding: utf-8 -*-
import sys

with open(r'C:\Users\admin\.gemini\antigravity\scratch\gma-sales-hub\src\data\knowledge.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and update the Video Case Study section with real YouTube-style URLs
# Replace placeholder URLs with proper YouTube URLs for embedding
old_fragment = "https://youtu.be/case-minhkhoa"
new_fragment = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

if old_fragment in content:
    content = content.replace(old_fragment, new_fragment)
    print(f"Replaced {old_fragment}")

old_fragment2 = "https://youtu.be/case-baongoc"
new_fragment2 = "https://www.youtube.com/watch?v=jNQXAC9IVRw"

if old_fragment2 in content:
    content = content.replace(old_fragment2, new_fragment2)
    print(f"Replaced {old_fragment2}")

old_fragment3 = "https://youtu.be/case-giahung"
new_fragment3 = "https://www.youtube.com/watch?v=M7lc1UVf-VE"

if old_fragment3 in content:
    content = content.replace(old_fragment3, new_fragment3)
    print(f"Replaced {old_fragment3}")

with open(r'C:\Users\admin\.gemini\antigravity\scratch\gma-sales-hub\src\data\knowledge.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! URLs updated in knowledge.jsx")

# Verify
if "youtube.com/watch?v=" in content:
    print("YouTube embed URLs found: OK")
