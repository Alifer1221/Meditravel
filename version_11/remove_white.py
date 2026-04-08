import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def remove_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Consider white/very light gray as background
        if item[0] >= 220 and item[1] >= 220 and item[2] >= 220:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_bg(r"C:\Users\cfjr1\OneDrive\Desktop\pp\public\Logo.png", r"C:\Users\cfjr1\OneDrive\Desktop\pp\public\Logo.png")
