import sys
import io
import json
from itertools import chain
from fontTools.ttLib import TTFont
from fontTools.unicode import Unicode
ttf = TTFont(sys.argv[1], 0, allowVID=0, ignoreDecompileErrors=True, fontNumber=-1)
chars = chain.from_iterable([y + (Unicode[y[0]],) for y in x.cmap.items()] for x in ttf["cmap"].tables)
result = []
for i in list(chars): 
	x = {}
	x["c"] = i[0]
	x["n"] = i[1]
	result.append(x)
ttf.close()
print(result);