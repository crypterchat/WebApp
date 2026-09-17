import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The exact string with the dot
    old_logo_dot = '<span className="logo-p1">P</span><span className="logo-g">G</span><span className="logo-p2">P</span><span className="logo-j">J</span><span className="logo-s">S</span><span className="logo-dot">.</span>'
    new_logo_dot = '<img src="/logo.png" alt="CrypterChat" style={{ height: "30px", width: "auto" }} />'
    
    # The exact string without the dot
    old_logo_nodot = '<span className="logo-p1">P</span><span className="logo-g">G</span><span className="logo-p2">P</span><span className="logo-j">J</span><span className="logo-s">S</span>'
    new_logo_nodot = '<img src="/logo.png" alt="CrypterChat" style={{ height: "40px", width: "auto" }} />'
    
    # replace
    if old_logo_dot in content or old_logo_nodot in content:
        content = content.replace(old_logo_dot, new_logo_dot)
        content = content.replace(old_logo_nodot, new_logo_nodot)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Replaced logo in {filepath}")

for root, _, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            replace_in_file(os.path.join(root, file))

