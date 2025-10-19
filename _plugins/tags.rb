module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      # 1. Collect and Normalize Tags (Case-Insensitive)
      normalized_tags = Hash.new { |hash, key| hash[key] = [] }

      site.posts.docs.each do |post|
        # Skip posts that don't have tags defined
        next unless post.data['tags']

        # Ensure tags is an array for safe iteration
        tags = Array(post.data['tags'])

        tags.each do |tag|
          # Use downcase for the key to ensure case-insensitivity (e.g., 'Test' and 'test' map to 'test')
          normalized_tag_key = tag.to_s.downcase

          # Append the post object to the list for this normalized tag
          normalized_tags[normalized_tag_key] << post
        end
      end

      # 2. Store the normalized tags for use in blog.html and other templates
      site.data['normalized_tags'] = normalized_tags

      # 3. Create a sorted array of tag names for easy iteration in Liquid
      #    This avoids issues with Liquid's keys filter
      sorted_tag_names = normalized_tags.keys.sort
      site.data['sorted_tag_names'] = sorted_tag_names

      # 4. Generate Tag Pages
      #    Iterate over the keys (the normalized tag names)
      normalized_tags.keys.each do |tag|
        # Pass the normalized tag name (e.g., 'test') to TagPage
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      # The directory will be based on the normalized, slugified tag
      # e.g., /tag/test/
      @dir  = File.join('tag', Utils.slugify(tag))
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      # The page data will use the normalized tag (e.g., "test")
      self.data['tag'] = tag
      self.data['title'] = "Tag: #{tag.capitalize}" # Capitalize for a cleaner page title
      # Posts are automatically available via site.data.normalized_tags in the TagPage layout.
    end
  end
end
