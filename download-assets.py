from pathlib import Path
from html import unescape
from concurrent.futures import ThreadPoolExecutor
import urllib.request
import re
import json
import hashlib

ROOT = Path(__file__).parent
ASSETS = ROOT / 'dist' / 'assets'
ASSETS.mkdir(parents=True, exist_ok=True)

def read(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=45).read()

gallery = read('https://dewastretching.ru/gallery').decode('utf-8')
sources = re.findall(r'<img\b[^>]*\bsrc="([^"]+)"', gallery)
sources = [unescape(s) for s in sources]
items = {'studio-wide.webp': 'https://dewastretching.ru/s3media/dewa-media/static/homepage_20260730_114845_training_room_1920x968_1600w.webp'}
for n in [0,1,2,3,9,15,19,23,24,25,26,28,29,30,31,33,34,35,36,37]:
    items[f'gallery-{n}.webp'] = sources[n]
items.update({
    'trainer-svetlana.webp': 'https://dewastretching.ru/s3media/dewa-media/trainers/trainer_20260616_092301_photo_1_2026-06-16_12-22-39_800w.webp',
    'trainer-julia.webp': 'https://dewastretching.ru/s3media/dewa-media/trainers/trainer_20260616_090943_photo_1_2026-06-16_12-08-53_800w.webp',
    'trainer-alisa.webp': 'https://dewastretching.ru/s3media/dewa-media/trainers/trainer_20260616_101829_photo_1_2026-06-16_13-10-57_800w.webp',
})

def save(item):
    name, url = item
    if (ASSETS / name).exists():
        return name, (ASSETS / name).stat().st_size
    try:
        data = read(url)
        (ASSETS / name).write_bytes(data)
        return name, len(data)
    except Exception as error:
        return name, str(error)

with ThreadPoolExecutor(max_workers=6) as pool:
    for name, size in pool.map(save, items.items()):
        print(name, size)

font_url = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;500;600&display=swap'
req = urllib.request.Request(font_url, headers={'User-Agent': 'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36'})
css = urllib.request.urlopen(req).read().decode()
for url in sorted(set(re.findall(r'url\((https://[^)]+)\)', css))):
    ext = '.woff2' if '.woff2' in url else '.ttf'
    name = 'font-' + hashlib.sha256(url.encode()).hexdigest()[:10] + ext
    (ASSETS / name).write_bytes(read(url))
    css = css.replace(url, './' + name)
(ASSETS / 'fonts.css').write_text(css, encoding='utf-8')
(ROOT / 'asset-sources.json').write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')
sheet = '<!doctype html><meta charset="utf-8"><style>body{margin:20px;background:#edeade;font:16px sans-serif}main{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}img{width:100%;height:230px;object-fit:cover}figure{margin:0}figcaption{padding:8px}</style><main>'
for name in items:
    if (ASSETS / name).exists():
        sheet += f'<figure><img src="assets/{name}"><figcaption>{name}</figcaption></figure>'
sheet += '</main>'
(ASSETS.parent / 'asset-review.html').write_text(sheet, encoding='utf-8')
