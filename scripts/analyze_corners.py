from PIL import Image
img = Image.open("public/images/catalog/Goldcard.png")
w, h = img.size
pixels = img.load()

# Print some pixel colors from the top edge, bottom edge, left edge, right edge
print("Top-left:", pixels[0, 0])
print("Top-right:", pixels[w-1, 0])
print("Bottom-left:", pixels[0, h-1])
print("Bottom-right:", pixels[w-1, h-1])
print("Center:", pixels[w//2, h//2])

# Let's count color frequencies in the border to see if it's a solid background
border_colors = []
for x in range(w):
    border_colors.append(pixels[x, 0])
    border_colors.append(pixels[x, h-1])
for y in range(h):
    border_colors.append(pixels[0, y])
    border_colors.append(pixels[w-1, y])

from collections import Counter
most_common = Counter(border_colors).most_common(10)
print("Most common border colors:", most_common)
