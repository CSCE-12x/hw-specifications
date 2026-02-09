// Code for traps. Minify / obfuscate before publishing to web!

// Put a `.trap-hotswap_printonly` span next to each `.trap-hotswap` to preserve formatting on print.
document.addEventListener("DOMContentLoaded", function () {
    const traps = Array.from(document.querySelectorAll('span.trap-hotswap'));
    traps.forEach((el, i) => {
        const trapText = el.dataset.replacement ?? "";
        const visText = el.innerHTML ?? "";

        // Build one copy of the original node, and one node that is just for printing.
        const hotswapNormal = document.createElement('span');
        hotswapNormal.className = 'trap-hotswap';
        hotswapNormal.textContent = visText;
        hotswapNormal.dataset.replacement = trapText;

        const hotswapPrintOnly = document.createElement('span');
        hotswapPrintOnly.className = 'trap-hotswap_printonly';
        hotswapPrintOnly.dataset.replacement = trapText;

        // If the original had an id, move it to the first span (avoid duplicate IDs)
        if (el.id) { hotswapNormal.id = el.id; }

        // Replace the original with the two spans
        const frag = document.createDocumentFragment();
        frag.appendChild(hotswapNormal);
        frag.appendChild(hotswapPrintOnly);
        el.replaceWith(frag);
    });
});

// Hide trapped text from screen readers
document.addEventListener("DOMContentLoaded", function () {

    // Hide trapped text from screen readers
    const elementsWithClass = document.querySelectorAll(".trap-invis");

    elementsWithClass.forEach((element) => {
        element.setAttribute("aria-hidden", "true");
    });
});

// Handle copy event for hotswap traps
document.addEventListener("copy", function (e) {
    const sel = window.getSelection?.();
    if (!sel || sel.isCollapsed) return;

    // Grab exactly what the user selected
    const range = sel.getRangeAt(0);
    const frag = range.cloneContents(); // DocumentFragment containing only the selection

    // If any part of the selection includes .trap-hotswap spans,
    // replace their selected content with whatever is in the
    // `data-replacement` attribute.
    const fakeBits = frag.querySelectorAll?.(".trap-hotswap") || [];
    if (fakeBits.length === 0) return; // nothing to change; let default copy proceed

    fakeBits.forEach((el) => {
        // Replace only the selected slice inside the span (cloneContents already sliced it)
        el.textContent = el.dataset.replacement;
    });

    // Serialize the modified fragment to HTML and plain text
    const tmp = document.createElement("div");
    tmp.appendChild(frag);

    const html = tmp.innerHTML;
    const text = tmp.textContent;

    // Override clipboard with our adjusted selection
    if (e.clipboardData) {
        e.preventDefault();
        e.clipboardData.setData("text/html", html);
        e.clipboardData.setData("text/plain", text);
    }
});

