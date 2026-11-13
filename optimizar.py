"""
Reduce y convierte las fotos de la carpeta "img" a .webp para que carguen rápido en el celular.
 - Máximo 1400 px por lado, calidad 78 (se ve igual, pesa 10 veces menos).
 - Respeta la orientación de las fotos del celular.
 - Mantiene los nombres (iquique-1.1.jpg -> iquique-1.1.webp).

Cómo usarlo:
 1) Deja este archivo al lado de la carpeta "img".
 2) Instala Pillow una sola vez:   py -m pip install pillow     (en Mac: python3 -m pip install pillow)
 3) Ejecútalo:                      py optimizar-fotos.py         (en Mac: python3 optimizar-fotos.py)
 4) Las fotos listas quedan en la carpeta "img-optimizadas". Reemplaza el contenido de "img" por ellas.
"""
from pathlib import Path
from PIL import Image, ImageOps

try:  # opcional: para fotos .heic del iPhone  ->  py -m pip install pillow-heif
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIC = True
except Exception:
    HEIC = False

ORIGEN, SALIDA = Path("img"), Path("img-optimizadas")
EXTS = {".jpg", ".jpeg", ".png", ".webp"} | ({".heic", ".heif"} if HEIC else set())
SALIDA.mkdir(exist_ok=True)

total_antes = total_despues = 0
for f in sorted(ORIGEN.iterdir()):
    if f.suffix.lower() not in EXTS:
        continue
    im = ImageOps.exif_transpose(Image.open(f))
    im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    im.thumbnail((1400, 1400))
    destino = SALIDA / (f.stem + ".webp")
    im.save(destino, "WEBP", quality=78, method=6)
    a, d = f.stat().st_size // 1024, destino.stat().st_size // 1024
    total_antes += a; total_despues += d
    print(f"{f.name:32} {a:6} KB  ->  {destino.name:32} {d:5} KB")

print(f"\nListo: {total_antes} KB -> {total_despues} KB")
if not HEIC:
    print("Nota: si tienes fotos .heic, instala también:  py -m pip install pillow-heif")