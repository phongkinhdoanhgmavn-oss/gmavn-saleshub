import re

path = r'src/data/knowledge.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the item with id: 6
pattern = r'\s*{\s*id:\s*6,.*?title:\s*"Chính sách & Học phí".*?\]\s*},'
new_content = re.sub(pattern, '', content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("ID 6 removed successfully.")
