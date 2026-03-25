from PIL import Image, ImageDraw
import os

def generate_icon(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    bg_color = (13, 17, 23, 255)
    draw.ellipse([0, 0, size - 1, size - 1], fill=bg_color)

    border_color = (88, 166, 255, 255)
    border_width = max(1, size // 14)
    margin = border_width // 2
    draw.ellipse(
        [margin, margin, size - 1 - margin, size - 1 - margin],
        outline=border_color,
        width=border_width
    )

    green = (63, 185, 80, 255)
    cross_width = max(1, size // 10)
    pad = size // 4
    cx = size // 2
    cy = size // 2

    draw.rectangle([cx - cross_width // 2, pad, cx + cross_width // 2, size - pad], fill=green)
    draw.rectangle([pad, cy - cross_width // 2, size - pad, cy + cross_width // 2], fill=green)

    return img

os.makedirs('extension/assets/icons', exist_ok=True)

for size in [16, 32, 48, 128]:
    icon = generate_icon(size)
    path = f'extension/assets/icons/icon{size}.png'
    icon.save(path, 'PNG')
    print(f'Generated {path}')

print('All icons generated successfully.')
