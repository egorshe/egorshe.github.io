<%*
// --- TEMPLATER PUBLISH SCRIPT WITH ALWAYS-CREATED DATE-PREFIXED IMAGE FOLDER ---

const DEBUG = true; // set to false to disable debug messages

// 1️⃣ Get the active file
const file = app.workspace.getActiveFile();
if (!file) {
    new Notice("Templater Error: No active file found. Open a file first.", 5000);
    return;
}

// 2️⃣ Date and current title
const date = tp.date.now("YYYY-MM-DD");
let currentTitle = file.basename; // filename without extension

// 3️⃣ Rename note if it doesn't already start with date
let newName; // store final name for folder use
let formattedTitle;
if (!currentTitle.match(/^\d{4}-\d{2}-\d{2}-/)) {
    formattedTitle = currentTitle.replace(/ /g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    newName = `${date}-${formattedTitle}`; // Templater adds .md automatically
    await tp.file.rename(newName);

    if (DEBUG) {
        new Notice(`DEBUG: File renamed to ${newName}`, 5000);
        console.log(`DEBUG: File renamed to ${newName}`);
    }
} else {
    newName = currentTitle;
    // extract formatted title after the date prefix
    formattedTitle = currentTitle.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

// 4️⃣ Create corresponding image folder (vault-relative) ALWAYS
const imgFolderPath = `assets/img/${newName}`;
if (DEBUG) console.log(`DEBUG: Intended folder path: ${imgFolderPath}`);

try {
    if (!await app.vault.adapter.exists(imgFolderPath)) {
        await app.vault.adapter.mkdir(imgFolderPath);
        await app.vault.adapter.write(`${imgFolderPath}/README.md`, `# Images for ${newName}`);
        new Notice(`✅ Folder created: ${imgFolderPath}`, 5000);
    } else {
        new Notice(`ℹ️ Folder already exists: ${imgFolderPath}`, 3000);
    }
} catch (err) {
    new Notice(`❌ Failed to create folder: ${err}`, 10000);
    console.error("Failed to create folder:", err);
}

// 5️⃣ Update frontmatter
let content = await app.vault.read(file);

// Remove draft line if it exists
const regexDraft = /^draft:\s*true\s*(\r?\n)/m;
if (content.match(regexDraft)) content = content.replace(regexDraft, '');

// Add or update date field
const regexDate = /^date:/m;
if (!content.match(regexDate)) {
    content = content.replace(/---\n/, `---\ndate: ${tp.date.now("YYYY-MM-DD")}\n`);
} else {
    content = content.replace(regexDate, `date: ${tp.date.now("YYYY-MM-DD")}`);
}

// Write back changes
await app.vault.modify(file, content);

if (DEBUG) new Notice("DEBUG: Script finished", 3000);
_%>
