#!/usr/bin/env ruby

require 'fileutils'

# --- Configuration ---
# Matches ![[filename.ext]] with optional {alt="..." caption="..."}
# Supports .jpeg, .jpg, .png, .webp, .gif, .tiff, etc.
OBSIDIAN_REGEX = /!\[\[([^\]]+)\.(jpe?g|png|webp|gif|tiff)\]\](?:\{alt="(.*?)"\s+caption="(.*?)"\})?/mi

# --- Main Logic ---

unless ARGV[0]
  puts "Usage: ruby convert_obsidian_images.rb <path/to/markdown/file>"
  exit 1
end

input_file = ARGV[0]

# 1. Read the content of the file
content = File.read(input_file)

# 2. Extract slug (folder name) from filename
filename_slug = File.basename(input_file, '.*')

# 3. Perform substitution
new_content = content.gsub(OBSIDIAN_REGEX) do
  basename  = Regexp.last_match(1)
  extension = Regexp.last_match(2)
  alt_text  = Regexp.last_match(3) || "put alt text here"
  caption   = Regexp.last_match(4) || "put caption here"

  image_filename = "#{basename}.#{extension}"

  # If the captured filename already includes a path starting with assets/img, use it directly
  if basename.start_with?("assets/img")
    image_path = "/" + image_filename
  else
    image_path = "/assets/img/#{filename_slug}/#{image_filename}"
  end

  <<~HTML
    <figure style="margin: 0;">
      <img class="img-fluid" src="#{image_path}" alt="#{alt_text}" style="display: block; margin-bottom: 0.5em;">
      <figcaption class="small" style="margin: 0 0 1.5em 0;">#{caption}</figcaption>
    </figure>
  HTML
end

# 4. Overwrite file if changes occurred
if new_content != content
  File.write(input_file, new_content)
  puts "✅ Successfully converted image links in #{input_file}"
else
  puts "ℹ️ No matching image links found in #{input_file}"
end
