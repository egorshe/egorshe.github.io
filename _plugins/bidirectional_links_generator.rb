# frozen_string_literal: true

# Generates bidirectional links and a graph between posts and projects.
# Supports [[wiki-style]] and [[Title|alias]] links.
# Produces an includes file `_includes/notes_graph.json`.

class BidirectionalLinksGenerator < Jekyll::Generator
  def generate(site)
    graph_nodes = []
    graph_edges = []

    # Collect documents from posts and projects
    posts = site.collections['posts']&.docs || []
    projects = site.collections['projects']&.docs || []
    all_docs = posts + projects + site.pages

    link_extension = site.config["use_html_extension"] ? '.html' : ''

    # Convert [[wiki-links]] into HTML <a> tags
    all_docs.each do |current_doc|
      all_docs.each do |potential_target|
        # Get both filename-based and title-based regex patterns
        filename_pattern = Regexp.escape(
          File.basename(potential_target.basename, File.extname(potential_target.basename))
        ).gsub('\_', '[ _]').gsub('\-', '[ -]').capitalize

        title_pattern = potential_target.data['title'] ? Regexp.escape(potential_target.data['title']) : nil

        new_href = "#{site.baseurl}#{potential_target.url}#{link_extension}"
        anchor_tag = "<a class='internal-link' href='#{new_href}'>\\1</a>"

        # [[Title|alias]]
        current_doc.content.gsub!(/\[\[(#{filename_pattern}|#{title_pattern})\|(.+?)\]\]/i, "<a class='internal-link' href='#{new_href}'>\\2</a>") if title_pattern
        # [[Title]]
        current_doc.content.gsub!(/\[\[(#{filename_pattern}|#{title_pattern})\]\]/i, anchor_tag) if title_pattern
      end

      # Grey out links that don’t match anything
      current_doc.content.gsub!(
        /\[\[([^\]]+)\]\]/i,
        <<~HTML.delete("\n")
          <span title='There is no document that matches this link.' class='invalid-link'>
            <span class='invalid-link-brackets'>[[</span>
            \\1
            <span class='invalid-link-brackets'>]]</span>
          </span>
        HTML
      )
    end

    # Identify backlinks and create graph data
    all_docs.each do |current_doc|
      docs_linking_to_current = all_docs.select do |doc|
        doc.url != current_doc.url && doc.content.include?(current_doc.url)
      end

      # Graph node
      graph_nodes << {
        id: doc_id_from_doc(current_doc),
        path: "#{site.baseurl}#{current_doc.url}#{link_extension}",
        label: current_doc.data['title']
      }

      # Store backlinks
      current_doc.data['backlinks'] = docs_linking_to_current

      # Graph edges
      docs_linking_to_current.each do |linked_doc|
        graph_edges << {
          source: doc_id_from_doc(linked_doc),
          target: doc_id_from_doc(current_doc)
        }
      end
    end

    # Write graph JSON
    File.write('_includes/notes_graph.json', JSON.dump({
      edges: graph_edges,
      nodes: graph_nodes
    }))
  end

  private

  def doc_id_from_doc(doc)
    doc.data['title'].to_s.bytes.join
  end
end
