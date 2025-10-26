<%*
const fs = require("fs");
const path = require("path");

// ========================================
// 0️⃣ VALIDATION
// ========================================
const file = app.workspace.getActiveFile();
if (!file) {
    new Notice("❌ No active file found.", 5000);
    return;
}

const vaultPath = app.vault.adapter.basePath;
const date = tp.date.now("YYYY-MM-DD");
let currentTitle = file.basename;

// ========================================
// 1️⃣ RENAME NOTE (if not already dated)
// ========================================
let newName;
if (!/^\d{4}-\d{2}-\d{2}-/.test(currentTitle)) {
    const formattedTitle = currentTitle
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w\-]/g, '')        // Remove special chars except hyphens
        .replace(/-+/g, '-')            // Collapse multiple hyphens
        .replace(/^-|-$/g, '');         // Trim leading/trailing hyphens
    
    newName = `${date}-${formattedTitle}`;
    
    try {
        await tp.file.rename(newName);  // Don't add .md - Templater handles it
        new Notice(`✅ Renamed to: ${newName}`);
    } catch (err) {
        new Notice(`❌ Rename failed: ${err.message}`, 5000);
        return;
    }
} else {
    newName = currentTitle;
}

// ========================================
// 2️⃣ CREATE IMAGE FOLDER
// ========================================
const imgFolderPath = path.join(vaultPath, "assets", "img", newName);
const imgFolderRelative = `assets/img/${newName}`;

try {
    if (!fs.existsSync(imgFolderPath)) {
        fs.mkdirSync(imgFolderPath, { recursive: true });
        new Notice(`📁 Created: ${imgFolderRelative}`);
    }
} catch (err) {
    new Notice(`❌ Folder creation failed: ${err.message}`, 5000);
    return;
}

// ========================================
// 3️⃣ READ AND PROCESS CONTENT
// ========================================
let content = await app.vault.read(file);

// Match: ![[00_meta/attachments/image.jpg]]{alt="..." caption="..."}
// Captures the FULL path including extension in one group
const imageRegex = /!\[\[([^\]]+\.(?:jpe?g|png|webp|gif|tiff))\]\](?:\{alt="([^"]*?)"\s+caption="([^"]*?)"\})?/gi;
const matches = [...content.matchAll(imageRegex)];

let movedCount = 0;
let failedMoves = [];

// ========================================
// 4️⃣ MOVE IMAGES & UPDATE LINKS
// ========================================
for (const match of matches) {
    const [fullMatch, imgPath, alt, caption] = match;
    
    // Only process images from attachments folder
    if (!imgPath.startsWith("00_meta/attachments/")) {
        continue;
    }
    
    // Extract filename WITH extension
    const fileName = imgPath.split('/').pop();
    const srcFile = tp.file.find_tfile(imgPath);
    
    if (!srcFile) {
        failedMoves.push(`⚠️ Not found: ${imgPath}`);
        continue;
    }
    
    const destPathRelative = path.join(imgFolderRelative, fileName).replace(/\\/g, '/');
    
    // Move file using Obsidian API (handles links automatically)
    try {
        await app.vault.rename(srcFile, destPathRelative);
        movedCount++;
    } catch (err) {
        failedMoves.push(`⚠️ Move failed for ${fileName}: ${err.message}`);
        continue;
    }
    
    // ========================================
    // 5️⃣ REPLACE WITH HTML FIGURE
    // ========================================
    const altText = alt || "Image description";
    const captionText = caption || "Image caption";
    const imageWebPath = `/assets/img/${newName}/${fileName}`;
    
    const htmlFigure = `<figure style="margin: 0;">
  <img class="img-fluid" src="${imageWebPath}" alt="${altText}" style="display: block; margin-bottom: 0.5em;">
  <figcaption class="small" style="margin: 0 0 1.5em 0;">${captionText}</figcaption>
</figure>`;
    
    content = content.replace(fullMatch, htmlFigure);
}

// ========================================
// 6️⃣ UPDATE FRONTMATTER
// ========================================
// Remove draft: true
content = content.replace(/^draft:\s*true\s*\r?\n/m, '');

// Ensure date field exists and is current
if (/^date:\s*.+$/m.test(content)) {
    // Update existing date
    content = content.replace(/^date:\s*.+$/m, `date: ${date}`);
} else {
    // Add date after opening ---
    content = content.replace(/^---\s*\n/, `---\ndate: ${date}\n`);
}

// ========================================
// 7️⃣ SAVE UPDATED NOTE
// ========================================
await app.vault.modify(file, content);

// ========================================
// 8️⃣ FINAL REPORT
// ========================================
if (failedMoves.length > 0) {
    console.warn("Failed moves:", failedMoves);
    new Notice(`⚠️ Moved ${movedCount} images. ${failedMoves.length} failed (check console).`, 7000);
} else {
    new Notice(`✅ Successfully migrated ${movedCount} image(s)!`, 5000);
}
%>