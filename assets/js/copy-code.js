document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("div.highlight").forEach(function (block) {
        // Avoid double-adding if script runs more than once
        if (block.querySelector(".copy-code-btn")) return;

        const btn = document.createElement("button");
        btn.className = "copy-code-btn";
        btn.textContent = "Copy";
        btn.setAttribute("aria-label", "Copy code to clipboard");
        btn.setAttribute("type", "button");

        btn.addEventListener("click", function () {
            const code = block.querySelector("code");
            if (!code) return;

            navigator.clipboard.writeText(code.innerText).then(
                function () {
                    btn.textContent = "Copied!";
                    btn.classList.add("copied");
                    setTimeout(function () {
                        btn.textContent = "Copy";
                        btn.classList.remove("copied");
                    }, 1500);
                },
                function () {
                    btn.textContent = "Failed";
                    setTimeout(function () {
                        btn.textContent = "Copy";
                    }, 1500);
                },
            );
        });

        block.appendChild(btn);
    });
});