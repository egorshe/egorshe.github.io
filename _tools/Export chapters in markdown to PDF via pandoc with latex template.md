---
layout: tool-entry
title: "Export chapters in markdown to PDF via pandoc with latex template"
date: "2026-06-20"
---
# Universal Thesis/Dissertation Template — Guide

A Pandoc + XeLaTeX pipeline for compiling Markdown chapters into a formatted PDF/A. Can be reconfigured for any university, program, or degree type by editing `metadata.yaml` only — no LaTeX knowledge required for normal use.

## Download

> (in Firefox, right-click and 'Save Link as')

- [thesis-template.latex](/assets/downloads/pandoc-template/thesis-template.latex)
- [metadata.yaml](/assets/downloads/pandoc-template/metadata.yaml)
- [extract-roles.lua](/assets/downloads/pandoc-template/extract-roles.lua)
- [build.sh](/assets/downloads/pandoc-template/build.sh)

All the files (.latex, .lua, .yaml, .sh) can be edited in any text editor, i.e. "open with...". If you write your papers in Markdown (with Obsidian, iA Writer, or whatever) to have full control over the layout, formatting, and portability — you already know how to do this.


## 0. Installation (one-time setup)

This may look like a high-end, senior-programmer job, but it isn't. If you get stuck on the installation, prompt any AI with the error from your terminal output — it will guide you through it. You need a few things: Pandoc itself, a TeX distribution providing `xelatex`, and a few specific LaTeX packages the template depends on. To export your Zotero library in `.bib` format, get the Better BibTeX plugin from the [Zotero Better BibTeX website](https://retorque.re/zotero-better-bibtex/).

### macOS

```bash
brew install pandoc
brew install --cask basictex
```

BasicTeX is a small install (~100-300MB) and is sufficient for this
template — consistent with the lean package set used on Linux (no need
for the full ~5GB MacTeX distribution).
 
After installing, restart your terminal (or run
`eval "$(/usr/libexec/path_helper)"`) so `xelatex` is found on your `PATH`.
Then install the packages this template needs:
```bash
sudo tlmgr update --self
sudo tlmgr install fontspec geometry setspace titlesec tocloft titletoc fancyhdr graphicx caption xcolor csquotes
```
If a build ever reports a missing `.sty` file beyond this list, install
just that package with `sudo tlmgr install <name>`.


[QUICK BUT BULKY]
> If you'd rather not deal with `tlmgr` at all, the full distribution works too and includes everything up front:


```bash
brew install --cask mactex        # ~5GB, no further package installs needed
```


### Windows
1. Install [Pandoc](https://pandoc.org/installing.html) (installer or `winget install --id JohnMacFarlane.Pandoc`)
2. Install [MiKTeX](https://miktex.org/download) or [TeX Live](https://tug.org/texlive/) (MiKTeX auto-installs missing packages on first build, which is convenient for this workflow)

### Linux (Debian/Ubuntu)
```bash
sudo apt install pandoc texlive texlive-xetex texlive-latex-extra texlive-fonts-extra
```
This combination (the `texlive` "decent selection" metapackage plus `texlive-xetex`, `texlive-latex-extra`, and `texlive-fonts-extra`) has been confirmed to build this template with no missing-package errors. You do not need `texlive-full`, and you do not need `biber`/`texlive-bibtex-extra` since this pipeline uses Pandoc's `--citeproc` rather than `biblatex`.


### Required LaTeX packages
If you installed a **full** TeX distribution (MacTeX, TeX Live full, or
MiKTeX with auto-install enabled), all of these are already present. If
you used a minimal/basic install, make sure these are available — install
via `tlmgr install <package>` (TeX Live/MacTeX) or let MiKTeX prompt you:

| Package | Used for |
|---|---|
| `fontspec` | Custom font selection via `mainfont` |
| `geometry` | Page margins |
| `setspace` | Line spacing (1.5/double-spacing) |
| `titlesec` | Chapter/section heading formatting |
| `tocloft` or `titletoc` | Table of contents styling |
| `fancyhdr` | Headers/footers, page numbering |
| `graphicx` | Figures/images |
| `caption` | Figure/table caption formatting and numbering |
| `xcolor` | Any colored text/rules in the template |
| `csquotes` | Smart quotation marks |
| `biblatex` *(only if your template/build uses it instead of citeproc)* | Bibliography formatting |

>

**Note on bibliography backend:** this pipeline uses Pandoc's built-in
`--citeproc` with a `.csl` style file (e.g. Chicago notes-bibliography),
**not** `biblatex`/`biber`. You do not need to install or configure
`biblatex` or `biber` unless you deliberately switch the build to use
LaTeX-native bibliography processing instead of citeproc — the two
approaches aren't used together. If a previous version of your setup
referenced a "biblatex plugin," it's safe to ignore as long as
`--citeproc` is in your `build.sh`.

### Verify your install
```bash
pandoc --version
xelatex --version
```
Both should report version info with no errors. If `xelatex` isn't found,
your TeX distribution's `bin` folder likely isn't on your `PATH` — restart
your terminal/shell after install, or check the distribution's setup docs.

---

## 1. Quick start

1. Put your chapter files, `metadata.yaml`, `universal-thesis-template.latex`,
   `extract-roles.lua`, your `.bib` file, and a CSL style file in the same folder.
2. Edit `metadata.yaml` (see field reference below).
3. Edit the `FILES` line in `build.sh` to match your actual chapter filenames, in order.
4. Run:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```

	You need to run `chmod +x build.sh` once to make the script executable. When you have your full list of files and flags, run just `./build.sh` to test new edits, rebuilding the PDF, etc.

5. Output: `dissertation_master.pdf`


---

## 2. File map

`universal-thesis-template.latex` — LaTeX template controlling layout, title page, signature page, headings, spacing. Edit for structural/design changes.

`metadata.yaml` — All your personal, institutional, and formatting variables. This is the main file you edit.

`extract-roles.lua` — Pulls front-matter sections (abstract, acknowledgements, etc.) out of your Markdown into the right place in the template. Do not edit unless adding a new front-matter role.

`Library.bib` — Your bibliography (BibTeX/Zotero export). Keep updated. 

`*.csl` — Citation style file (e.g. Chicago notes-bibliography). Swap for your required citation style.

`build.sh` — The pandoc command, wrapped in a script. Edit the `FILES` line for your chapter list, or use the full pandoc command with flags directly.

`NN-*.md` — Your actual content, one file per chapter/section, numbered for ordering. This is your writing.

---

## 3. Metadata field reference

Edit these in `metadata.yaml`. Defaults shown are placeholders — replace them.

### Document basics

| Field | Example | Notes |
|---|---|---|
| `mainfont` | `"Times New Roman"` | Any fontspec-compatible font installed on your system |
| `title` | `"Global Poetic Documentary"` | |
| `subtitle` | `"the Aesthetic of Disappearance"` | Optional |
| `subtitle-same-line` | `true` / `false` | `true`: "Title: Subtitle" on one line; `false`: stacked |
| `author` | `"Brian Smith"` | |
| `dedication` | multi-line block | Optional; omit the front-matter chapter if blank |

### Institution & degree (the part that makes this "universal")

| Field | Example | Notes |
|---|---|---|
| `universityname` | `"Concordia University"` | Appears on title page and signature page |
| `universitylocation` | `"Montréal, Québec, Canada"` | Appears under university name on title page |
| `schoolname` | `"School of Graduate Studies"` | Appears on signature page header |
| `documenttype` | `"Thesis"` or `"Dissertation"` | Capitalized form, used as "A Thesis" |
| `documenttypelc` | `"thesis"` or `"dissertation"` | Lowercase, used mid-sentence ("the thesis prepared") |
| `degreename` | `"Doctor of Philosophy"` | Or `"Master of Arts"`, `"Master of Fine Arts"`, etc. |
| `specialization` | `"Film and Moving Image Studies"` | Appears in parentheses after degree name |
| `department` | `"Mel Hoppenheim School of Cinema"` | |
| `department-inline` | `true` / `false` | `true`: "A Thesis in [Dept]"; `false`: "A Thesis In the Department Of [Dept]" — pick whichever matches your institution's convention |

### Dates and copyright

| Field | Example |
|---|---|
| `submissionmonth` | `"August"` |
| `submissionyear` | `"2026"` |
| `dateofdefence` | `"08/15/2026"` |
| `copyrightyear` | `"2026"` |

### Signature/approval page

| Field | Notes |
|---|---|
| `chairname` | Committee chair |
| `externalexaminer` | External examiner |
| `examinerone`, `examinertwo`, `examinerthree` | Committee members |
| `supervisor` | Thesis/dissertation supervisor |
| `gradprogramdirector` | Graduate program director |
| `deanname`, `facultyname` | Dean and their faculty |

If your institution's committee structure has fewer or more roles than this
(e.g. two examiners instead of three, no external examiner), either leave
unused fields blank in `metadata.yaml` or remove the corresponding row
from the `tabular` block in the `.latex` file — see Section 5.

### Layout

| Field | Notes |
|---|---|
| `toc` | `true`/`false` — table of contents |
| `toc-depth` | `1` = chapters only, `2` = + sections, etc. |
| `lof` | List of figures |
| `lot` | List of tables (add to your build if used) |
| `biblio-spacing` | Bibliography line spacing |

---

## 4. Front matter via Lua roles

Front-matter sections (abstract, acknowledgements, dedication, summary,
contributions) are written as **fenced divs** in their own Markdown files,
and the Lua filter moves their content into the right place in the
template automatically:

```markdown
::: abstract
Your abstract text here, under 250 words...
:::
```

```markdown
::: acknowledgements
Thank you to my supervisor...
:::
```

Supported role names (must match exactly): `abstract`, `acknowledgements`,
`summary`, `contributions`, `dedication`.

If a role's div is absent, that section is simply skipped in the output —
you don't need to delete anything from `metadata.yaml`.

To add a new role (e.g. a "preface"):
1. Add it to the `roles` table in `extract-roles.lua`.
2. Add a corresponding `$if(preface)$ \chapter*{Preface} $preface$ $endif$`
   block in `universal-thesis-template.latex` in the front-matter section.

---

## 5. Customization points in the `.latex` file

These are the safe, intentional places to make structural changes if
`metadata.yaml` alone doesn't cover your institution's requirements:

- **Heading styles** — `\titleformat{\chapter}`, `\section}`, `\subsection}` blocks (centered/underlined/numbering conventions)
- **Page numbering style** — the `fancyhdr` block (currently bottom-right page numbers, no header rule)
- **Signature table** — the `tabular` block inside `\makeproposalpage`; add/remove rows for your committee structure
- **Margins** — `\usepackage[margin=1in]{geometry}`
- **Line spacing** — `\setstretch{1.5}` (currently 1.5; many schools require double-spacing — change to `2`)
- **TOC depth styling** — the `\titlecontents` blocks
- **PDF/a title and author metadata** — To fix the title and author so your name and actual thesis title appear correctly in the metadata, edit "% --- METADATA ---" section in the template.

Everything else (institution name, degree, dates, names) should be handled
through `metadata.yaml` — if you find yourself editing the `.latex` file
to change a name or date, that's a sign it should become a metadata
variable instead.

---

## 6. Multiple institutions / reuse across programs

If you (or others) will reuse this template across different universities
or degree programs, keep a `presets/` folder with one short YAML file per
institution containing only the institution-specific overrides:

```yaml
# presets/mcgill-ma.yaml
universityname: "McGill University"
universitylocation: "Montréal, Québec, Canada"
schoolname: "Graduate and Postdoctoral Studies"
documenttype: "Thesis"
documenttypelc: "thesis"
degreename: "Master of Arts"
```

Pandoc merges multiple `--metadata-file` flags left-to-right, with later
files overriding earlier ones, so you can layer a preset on top of your
personal metadata:

```bash
pandoc ... --metadata-file=metadata.yaml --metadata-file=presets/mcgill-ma.yaml ...
```

This way the base `metadata.yaml` holds your personal/content fields
(title, author, chapters) and the preset holds only the institutional
boilerplate.

---

## 7. Troubleshooting

| Symptom | Likely cause |
|---|---|
| `Lonely \item` error | Malformed `CSLReferences` environment — check the `\AtBeginDocument` block wasn't altered |
| Filmography/list indentation looks wrong | `parskip.sty` overriding list spacing — use scoped raw LaTeX in the source `.md` rather than editing global spacing |
| Heading spacing off after edits | Check `\titlespacing*` values per heading level |
| Build fails citing missing font | `mainfont` value isn't installed/found by `fontspec` — check spelling or install the font |
| Wrong wording on title/signature page | Check `documenttype` vs `documenttypelc`, and `degreename`/`specialization` combination |


