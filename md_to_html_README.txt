+----------------------------+
| Markdown to HTML Converter |
+----------------------------+

This script converts Markdown files to HTML files. All conversion code is
contained within `md_to_html.sh`. It takes in the title you want your webpage to
have, the path to your source MD file, the path to the JS file you want to link,
and the path to the CSS file you want to link. If you want to link more than one
CSS file, use `@import ...;` statements.

Usage:
 - ./md_to_html.sh <input_file> [site_title [js_file [css_file]]]
    - Creates `index.html`
 - NOTE: be in the folder that you want the homework to live in when you run this. Otherwise it might mess up the relative paths.

Example:
 - The command I used to make HW Formula 1 (from /hw-formula-1/):
   $ ../md_to_html.sh formula_1.md
 - Created /hw-formula-1/index.html

Embedding traps:
 - Embed a hotswap trap with <trap type="hotswap" replacement="[replacement]">[visible text]</trap>
 - Embed an invisible trap with <trap type="invis">[invisible text]</trap>
 - View the traps by printing the document or copying trapped text.

Dependencies:
 - pandoc
 - perl

Cool features
 - LaTeX math
 - Syntax highlighting
 - The sky is the limit...
