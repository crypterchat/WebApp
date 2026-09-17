import os

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content.replace('src="/logo.png"', 'src="/crypterchat.svg"')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Replaced logo in {filepath}")

for root, _, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            replace_in_file(os.path.join(root, file))

