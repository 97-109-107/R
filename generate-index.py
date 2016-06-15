#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv
import html
import codecs
import os.path

heading = """
<head>
<style type="text/css">
.tile{
    margin: 3px;
    width: 30%;
    float: left;
    height: 300px;
    background-color: #eee;
}
img{
    width: 100%
}
.meta{
    padding: 4px;
    width: 100%;
}
.pic{
    width: 100%;
    height: 260px;
    overflow-y: hidden;
}
</style>
<meta charset="UTF-8"> 
</head>
<div>
Na podstawie: <a href="http://wilkowski.org/notka/1261">Ekspertymenty z historycznym Webem: badanie dostępności domen polskich czasopism z lat .90</a><br>
Źródła: <a href="https://github.com/mw-/R">https://github.com/mw-/R</a> i <a href="https://github.com/97-109-107/historyczny_web">https://github.com/97-109-107/historyczny_web</a>
</div>
"""
def getFile(p):
    path = "./output/"+ p +"-overview.png"
    if os.path.isfile(path):
        p = html.escape(p)
        path = "./output/"+ p +"-overview.png"
        return path
    else:
        return "https://placeholdit.imgix.net/~text?txtsize=33&txt=404&w=350&h=250"

with codecs.open('index.html', 'w', 'utf8') as outfile:
    with open('./hosty_wynik.csv', 'r') as csvfile:
        f = csv.reader(csvfile)
        next(f, None)  # skip the headers
        outfile.write(heading)
        outfile.write("<body>")
        for row in f:
            s = '<div class="tile"><div class="pic"><img src="{}"></div><div class="meta">{}<br><a href={}>{}</a></div></div>\n'
            s = s.format(getFile(row[0]),row[0], row[1], row[1])
            outfile.write(s)

        outfile.write("</table></body>")
        outfile.close
