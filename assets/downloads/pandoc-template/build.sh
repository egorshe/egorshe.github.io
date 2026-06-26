#!/bin/bash
set -e

pandoc 01-abstract.md 02-acknowledgements.md 04-introduction.md 05-chapter-1.md 06-chapter-2.md 07-chapter-3.md 08-conclusion.md 09-works-cited.md 10-filmography.md \
  --from=markdown+hard_line_breaks \
  --metadata-file=metadata.yaml \
  --lua-filter=extract-roles.lua \
  --template=custom.latex \
  --top-level-division=chapter \
  --pdf-engine=xelatex \
  --citeproc \
  --bibliography=Library.bib \
  --csl=chicago-note-bibliography-with-ibid.csl \
  -o dissertation_master.pdf

echo "Build complete: dissertation_master.pdf"
