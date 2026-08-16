import os
import glob

files = glob.glob('src/**/*.ts', recursive=True) + glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.js', recursive=True) + glob.glob('src/**/*.jsx', recursive=True)

for f in files:
    path = os.path.join('.', f)
    if not os.path.isfile(path): continue
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if '"/static/dist/images/' in content or "'/static/dist/images/" in content:
        content = content.replace('"/static/dist/images/', '"/images/')
        content = content.replace("'/static/dist/images/", "'/images/")
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)

print('Reversed image paths!')
