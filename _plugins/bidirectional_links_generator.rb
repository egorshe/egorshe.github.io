# frozen_string_literal: true

# Generates bidirectional links and a site-wide graph between posts, projects, and pages.
# Supports [[Wiki-style]] and [[Title|Alias]] links across all content.
# Writes graph data to `_includes/notes_graph.json`.

class BidirectionalLinksGenerator < Jekyll::Generator
  def generate(site)
    # --- GRAPH CODE REMOVED ---
    # graph_nodes = []
    # graph_edges = []

    # Collect all docs we want to include
    posts    = site.collections['posts']&.docs || []
    projects = site.collections['projects']&.docs || []
    pages    = site.pages.select { |p| p.data['title'] } # only pages with titles

    all_docs = posts + projects + pages
    link_extension = site.config["use_html_extension"] ? '.html' : ''

    # --- Replace [[wiki-style links]] with HTML links ---
    all_docs.each do |current_doc|
      all_docs.each do |target_doc|
        next if target_doc == current_doc

        # Build regexes for title and filename
        filename_pattern = Regexp.escape(
          File.basename(target_doc.basename, File.extname(target_doc.basename))
        ).gsub('\_', '[ _]').gsub('\-', '[ -]').capitalize

        title_pattern = target_doc.data['title'] ? Regexp.escape(target_doc.data['title']) : nil

        new_href = "#{site.baseurl}#{target_doc.url}#{link_extension}"

        # [[Title|alias]]
        if title_pattern
          current_doc.content.gsub!(
            /\[\[(#{filename_pattern}|#{title_pattern})\|(.+?)\]\]/i,
            "<a class='internal-link' href='#{new_href}'>\\2</a>"
          )
        end

        # [[Title]]
        if title_pattern
          anchor_tag = "<a class='internal-link' href='#{new_href}'>\\1</a>"
          current_doc.content.gsub!(
            /\[\[(#{filename_pattern}|#{title_pattern})\]\]/i,
            anchor_tag
          )
        end
      end

      # Mark unresolved links
      current_doc.content.gsub!(
        /\[\[([^\]]+)\]\]/i,
        <<~HTML.delete("\n")
          <span title='There is no document that matches this link.' class='invalid-link'>
            <span class='invalid-link-brackets'>[[</span>
            \1
            <span class='invalid-link-brackets'>]]</span>
          </span>
        HTML
      )
    end

    # ----------------------------------------------------
    # --- Backlinks Generation (Keep this section) ---
    # ----------------------------------------------------
    all_docs.each do |current_doc|
      docs_linking_to_current = all_docs.select do |doc|
        doc.url != current_doc.url && doc.content.include?(current_doc.url)
      end

      # --- GRAPH CODE REMOVED ---
      # Graph node
      # graph_nodes << {
      #   id: doc_id(current_doc),
      #   path: "#{site.baseurl}#{current_doc.url}#{link_extension}",
      #   label: current_doc.data['title']
      # }

      # Add backlinks (KEEP THIS!)
      current_doc.data['backlinks'] = docs_linking_to_current

      # --- GRAPH CODE REMOVED ---
      # Graph edges
      # docs_linking_to_current.each do |linked_doc|
      #   graph_edges << {
      #     source: doc_id(linked_doc),
      #     target: doc_id(current_doc)
      #   }
      # end
    end

    # --- REMOVE THIS FINAL SECTION ---
    # File.write('_includes/notes_graph.json', JSON.dump({
    #   edges: graph_edges,
    #   nodes: graph_nodes
    # }))
  end

  private

  def doc_id(doc)
    doc.data['title'].to_s.bytes.join
  end
end
