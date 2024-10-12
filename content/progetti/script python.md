+++
title = 'Script Python'
slug = 'script-python'
date = 2024-10-12T19:20:41+02:00
draft = false
math = true
hideBackToTop = true
+++

# 1

Script python per convertire una cartella di immagini in un file .pdf in formato A5

Uso da linea di comando:

> python convert_to_pdf.py "C:\percorso\alla\cartella\immagini" "output.pdf"

Dipendenze: **Pillow**; **img2pdf**

```python
import os
import img2pdf
import argparse
from PIL import Image  # Pillow is needed to open images and check sizes

# Configura argparse per prendere il percorso della cartella dalla linea di comando
parser = argparse.ArgumentParser(description='Converti immagini in PDF in formato A5')
parser.add_argument('image_folder', type=str, help='Percorso della cartella contenente le immagini')
parser.add_argument('output_pdf', type=str, nargs='?', default='output.pdf', help='Nome del file PDF di output (default: output.pdf)')
args = parser.parse_args()

# Ottieni il percorso della cartella e del file PDF dall'input dell'utente
image_folder = args.image_folder
output_pdf = args.output_pdf

# Definisci il formato A5 in punti (1 punto = 1/72 di pollice)
# Per cambiare formato in A4 o altri scrivere i mm di riferimento nelle ()
a5_size = (img2pdf.mm_to_pt(148), img2pdf.mm_to_pt(210))

# Lista per contenere i percorsi completi delle immagini
image_files = []

# Filtra le immagini nella cartella (supporta jpg, png, ecc.)
for file_name in os.listdir(image_folder):
    if file_name.endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif')):
        image_files.append(os.path.join(image_folder, file_name))

# Converti le immagini in PDF con il formato A5
with open(output_pdf, 'wb') as f:
    f.write(img2pdf.convert(image_files, layout_fun=img2pdf.get_layout_fun(a5_size)))

print(f"Conversione completata! Il PDF è stato salvato come: {output_pdf}")
```

