import os, re, subprocess, glob
from PIL import Image, ImageDraw, ImageOps

SRC = os.environ.get("SRC", "icons")
ICONS = sorted(glob.glob(SRC + "/*.svg"))
os.makedirs(".render", exist_ok=True)
SIZES = [16, 24, 48]

for f in ICONS:
    s = open(f).read().replace('stroke="currentColor"', 'stroke="#101010"')
    tmp = ".render/" + os.path.basename(f)
    open(tmp, "w").write(s)
    for z in SIZES:
        subprocess.run(["npx", "--yes", "@resvg/resvg-js-cli", "--fit-width", str(z), tmp,
                        f".render/{os.path.basename(f)[:-4]}-{z}.png"],
                       check=True, capture_output=True)

CELL, PAD, LBL = 96, 16, 150
rows = len(ICONS)
W = LBL + PAD + len(SIZES) * (CELL + PAD) + PAD + 3 * (max(SIZES) + PAD)
H = PAD + rows * (CELL + PAD)

def sheet(bg, fg, invert):
    img = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(img)
    for r, f in enumerate(ICONS):
        name = os.path.basename(f)[:-4]
        y = PAD + r * (CELL + PAD)
        d.text((PAD, y + CELL // 2 - 6), name, fill=fg)
        x = LBL + PAD
        for z in SIZES:
            p = Image.open(f".render/{name}-{z}.png").convert("RGBA")
            if invert:
                rgb = ImageOps.invert(p.convert("RGB"))
                p = Image.merge("RGBA", (*rgb.split(), p.split()[3]))
            big = p.resize((CELL, CELL), Image.NEAREST)   # perbesar piksel apa adanya
            img.paste(big, (x, y), big)
            d.text((x, y + CELL + 1), f"{z}px", fill=fg)
            x += CELL + PAD
        x += PAD
        for z in SIZES:                                    # ukuran asli
            p = Image.open(f".render/{name}-{z}.png").convert("RGBA")
            if invert:
                rgb = ImageOps.invert(p.convert("RGB"))
                p = Image.merge("RGBA", (*rgb.split(), p.split()[3]))
            img.paste(p, (x, y + (CELL - z) // 2), p)
            x += z + PAD
    return img

sheet((255, 255, 255), (60, 60, 60), False).save(os.environ.get("OUT","review")+"-light.png")
sheet((17, 17, 17), (200, 200, 200), True).save(os.environ.get("OUT","review")+"-dark.png")
print("ok", W, H)
